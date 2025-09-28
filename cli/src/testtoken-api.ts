// This file is part of midnightntwrk/example-counter.
// Copyright (C) 2025 Midnight Foundation
// SPDX-License-Identifier: Apache-2.0

import { TestToken } from '@midnight-ntwrk/contract';
import { deployContract } from '@midnight-ntwrk/midnight-js-contracts';
import { type Logger } from 'pino';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import { createWalletAndMidnightProvider } from './api';
import { type Wallet } from '@midnight-ntwrk/wallet-api';
import { type Resource } from '@midnight-ntwrk/wallet';
import { type Config } from './config';
import path from 'node:path';
import http from 'node:http';
import { ShieldedAddress } from '@midnight-ntwrk/wallet-sdk-address-format';

let logger: Logger;
let indexerConfig: { indexer: string; indexerWS: string } | null = null;

export type TestTokenContract = TestToken.Contract<unknown, {}>;

export type DeployedTestTokenContract = {
  deployTxData: {
    public: {
      contractAddress: string;
      txId: string;
      blockHeight: number;
    };
  };
  callTx: {
    mint: (amount: bigint) => Promise<any>;
    faucet: () => Promise<any>;
    burn: (amount: bigint) => Promise<any>;
  };
  // Enhanced methods with logging
  mintWithLogging: (amount: bigint) => Promise<any>;
  faucetWithLogging: () => Promise<any>;
  burnWithLogging: (amount: bigint) => Promise<any>;
};

export const deployTestToken = async (
  wallet: Wallet & Resource,
  config: Config,
  tokenName: number,
  tokenSymbol: number,
  initialSupply: bigint
): Promise<DeployedTestTokenContract> => {
  logger.info('Deploying TestToken contract...');
  
  const walletAndMidnightProvider = await createWalletAndMidnightProvider(wallet);
  
  const testTokenZkConfigPath = path.resolve('../contracts/src/managed/TestToken');
  
  const providers = {
    privateStateProvider: levelPrivateStateProvider<never>({
      privateStateStoreName: 'testtoken-private-state',
    }),
    publicDataProvider: indexerPublicDataProvider(config.indexer, config.indexerWS),
    zkConfigProvider: new NodeZkConfigProvider<'initialize' | 'mint' | 'faucet' | 'burn'>(testTokenZkConfigPath),
    proofProvider: httpClientProofProvider(config.proofServer),
    walletProvider: walletAndMidnightProvider,
    midnightProvider: walletAndMidnightProvider,
  };

  const testTokenContract = new TestToken.Contract({});
  
  const deployedContract = await deployContract(providers, {
    contract: testTokenContract,
    privateStateId: 'testTokenPrivateState',
    initialPrivateState: {},
  });

  logger.info('✅ TestToken deployment successful!');
  logger.info(`📄 Contract Address: ${deployedContract.deployTxData.public.contractAddress}`);
  await logTransactionHashes('Deploy', deployedContract.deployTxData.public.txId, deployedContract.deployTxData.public.blockHeight);
  
  // Initialize the token
  logger.info('Initializing TestToken...');
  const initTxResult = await deployedContract.callTx.initialize(BigInt(tokenName), BigInt(tokenSymbol), initialSupply);
  await logTransactionHashes('Initialize', initTxResult.public.txId, initTxResult.public.blockHeight);
  
  // Add enhanced logging methods
  const enhancedContract = deployedContract as any as DeployedTestTokenContract;
  
  enhancedContract.mintWithLogging = async (amount: bigint) => {
    logger.info(`Minting ${amount} tokens...`);
    const txResult = await deployedContract.callTx.mint(amount);
    await logTransactionHashes('Mint', txResult.public.txId, txResult.public.blockHeight);
    logger.info(`💰 Minted ${amount} tokens successfully!`);
    return txResult;
  };
  
  enhancedContract.faucetWithLogging = async () => {
    logger.info('Using faucet to get 1000 tokens...');
    const txResult = await deployedContract.callTx.faucet();
    await logTransactionHashes('Faucet', txResult.public.txId, txResult.public.blockHeight);
    logger.info(`💰 Received 1000 tokens from faucet!`);
    return txResult;
  };
  
  enhancedContract.burnWithLogging = async (amount: bigint) => {
    logger.info(`Burning ${amount} tokens...`);
    const txResult = await deployedContract.callTx.burn(amount);
    await logTransactionHashes('Burn', txResult.public.txId, txResult.public.blockHeight);
    logger.info(`🔥 Burned ${amount} tokens successfully!`);
    return txResult;
  };
  
  return enhancedContract;
};

export const getTestTokenState = async (
  providers: any,
  contractAddress: string,
): Promise<any> => {
  logger.info('Checking TestToken ledger state...');
  const state = await providers.publicDataProvider
    .queryContractState(contractAddress)
    .then((contractState: any) => (contractState != null ? TestToken.ledger(contractState.data) : null));
  logger.info(`TestToken state:`, state);
  return state;
};

// Function to query GraphQL indexer
async function queryIndexer(query: string): Promise<any> {
  if (!indexerConfig) {
    return null;
  }

  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ query });
    const url = new URL(indexerConfig!.indexer);
    
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(responseData));
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// Function to find blockchain hash by CLI transaction hash
async function findBlockchainHash(cliTxHash: string): Promise<string | null> {
  try {
    const txHash = (ShieldedAddress as any).fromBech32m(cliTxHash);
    console.log(`🔍 Querying indexer with: ${txHash}`);
    // Query recent blocks to find the transaction
    for (let height = 1; height <= 100; height += 5) {
      const query = `{
        block(offset: { height: ${height} }) {
          height
          transactions {
            hash
            identifiers
          }
        }
      }`;
      
      const result = await queryIndexer(query);
      if (result?.data?.block?.transactions) {
        for (const tx of result.data.block.transactions) {
          if (tx.identifiers && tx.identifiers.includes(txHash)) {
            return tx.hash;
          }
        }
      }
    }
    return null;
  } catch (error) {
    logger.warn(`Failed to find blockchain hash for ${cliTxHash}: ${error instanceof Error ? error.message : String(error)}`);
    return null;
  }
}

// Enhanced logging function that shows both CLI and blockchain hashes
async function logTransactionHashes(operation: string, cliTxHash: string, blockHeight: number) {
  logger.info(`✅ ${operation} successful!`);
  logger.info(`🔗 CLI Transaction Hash: ${cliTxHash}`);
  logger.info(`📦 Block Height: ${blockHeight}`);
  logger.info(`🔍 Query indexer with: ${cliTxHash}`);
  
  // Try to find the blockchain hash
  const blockchainHash = await findBlockchainHash(cliTxHash);
  if (blockchainHash) {
    logger.info(`⛓️  Blockchain Hash: ${blockchainHash}`);
    logger.info(`🔍 Query indexer with: ${blockchainHash}`);
    logger.info(`🔍 Query by CLI hash: identifiers contains "${cliTxHash}"`);
  }
  
  logger.info(''); // Empty line for readability
}

export const setLogger = (_logger: Logger) => {
  logger = _logger;
};

export const setIndexerConfig = (config: { indexer: string; indexerWS: string }) => {
  indexerConfig = config;
};
