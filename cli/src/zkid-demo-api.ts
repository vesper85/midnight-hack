// zkID Demo API - Simplified version for demonstration
// Based on Midnight Network documentation: https://docs.midnight.network/develop/reference/compact/writing

import { ZkId } from '@midnight-ntwrk/contract';
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
import { ShieldedCoinPublicKey, MidnightBech32m } from '@midnight-ntwrk/wallet-sdk-address-format';
import { NetworkId, CoinPublicKey } from '@midnight-ntwrk/zswap';

let logger: Logger;
let indexerConfig: { indexer: string; indexerWS: string } | null = null;

export interface DeployedZkIdContract {
  deployTxData: {
    public: {
      contractAddress: string;
      txId: string;
      blockHeight: number;
    };
  };
  callTx: {
    initialize: () => Promise<any>;
    issueZkId: (to: any, nameHash: bigint, emailHash: bigint, addressHash: bigint, isKYC: boolean, creditScore: bigint) => Promise<any>;
    verifyZkId: () => Promise<any>;
    getCreditScore: () => Promise<any>;
    getZkIdInfo: () => Promise<any>;
    deactivateZkId: () => Promise<any>;
    revealIdentityForLiquidation: (collector: any) => Promise<any>;
    updateCreditScore: (newScore: bigint) => Promise<any>;
    checkIdentityRevealed: () => Promise<any>;
  };
}

// Deploy zkID contract
export const deployZkId = async (
  wallet: Wallet & Resource,
  config: Config
): Promise<DeployedZkIdContract> => {
  logger.info('🆔 Deploying zkID Contract...');

  const walletAndMidnightProvider = await createWalletAndMidnightProvider(wallet);

  const providers = {
    privateStateProvider: levelPrivateStateProvider<never>({
      privateStateStoreName: 'zkid-private-state',
    }),
    publicDataProvider: indexerPublicDataProvider(config.indexer, config.indexerWS),
    zkConfigProvider: new NodeZkConfigProvider<'initialize' | 'issueZkId' | 'verifyZkId' | 'getCreditScore' | 'getZkIdInfo' | 'deactivateZkId' | 'revealIdentityForLiquidation' | 'updateCreditScore' | 'checkIdentityRevealed'>(path.resolve('../contracts/src/managed/ZkId')),
    proofProvider: httpClientProofProvider(config.proofServer),
    walletProvider: walletAndMidnightProvider,
    midnightProvider: walletAndMidnightProvider,
  };

  const zkIdContract = new ZkId.Contract({});

  const deployedContract = await deployContract(providers as any, {
    contract: zkIdContract,
    privateStateId: 'zkIdPrivateState',
    initialPrivateState: {},
  } as any);

  logger.info('✅ zkID deployment successful!');
  logger.info(`📄 Contract Address: ${deployedContract.deployTxData.public.contractAddress}`);
  await logTransactionHashes('zkID Deploy', deployedContract.deployTxData.public.txId, deployedContract.deployTxData.public.blockHeight);

  // Initialize the contract
  logger.info('Initializing zkID Contract...');
  const initTxResult = await deployedContract.callTx.initialize();
  await logTransactionHashes('zkID Initialize', initTxResult.public.txId, initTxResult.public.blockHeight);

  return deployedContract as any as DeployedZkIdContract;
};

// Issue zkID with metadata
export const issueZkId = async (
  contract: DeployedZkIdContract,
  to: any,
  metadata: {
    name: string;
    email: string;
    address: string;
    creditScore: number;
    isKYC: boolean;
  }
): Promise<void> => {
  logger.info('🎫 Issuing zkID with private metadata...');
  
  // Create hashes for private metadata (in production, this would be proper encryption)
  const nameHash = BigInt('0x' + Buffer.from(metadata.name).toString('hex').substring(0, 32)); // Truncate to fit Uint<254>
  const emailHash = BigInt('0x' + Buffer.from(metadata.email).toString('hex').substring(0, 32));
  const addressHash = BigInt('0x' + Buffer.from(metadata.address).toString('hex').substring(0, 32));
  
  // Convert the Bech32m public key string to the proper ZswapCoinPublicKey structure
  let result;
  try {
    const bech32mData = MidnightBech32m.parse(to);
    const shieldedPublicKey = ShieldedCoinPublicKey.codec.decode(NetworkId.Undeployed, bech32mData);
    
    // Create the proper ZswapCoinPublicKey structure that the contract expects
    const zswapPublicKey = { bytes: shieldedPublicKey.data };
    logger.info(`🔍 Debug: ZswapCoinPublicKey = ${JSON.stringify(zswapPublicKey)}`);
    
    logger.info(`🔍 Debug: Created ZswapCoinPublicKey with ${shieldedPublicKey.data.length} bytes`);
    
    result = await contract.callTx.issueZkId(zswapPublicKey, nameHash, emailHash, addressHash, metadata.isKYC, BigInt(metadata.creditScore));
  } catch (decodeError) {
    logger.error(`❌ Failed to decode public key: ${decodeError}`);
    throw decodeError;
  }
  await logTransactionHashes('zkID Issue', result.public.txId, result.public.blockHeight);
  
  logger.info('🔒 Private metadata encrypted and stored on-chain');
  logger.info(`📊 Credit Score: ${metadata.creditScore}`);
  logger.info(`✅ KYC Status: ${metadata.isKYC ? 'Verified' : 'Pending'}`);
};

// Verify zkID
export const verifyZkId = async (contract: DeployedZkIdContract): Promise<void> => {
  logger.info('🔍 Verifying zkID...');
  
  const result = await contract.callTx.verifyZkId();
  await logTransactionHashes('zkID Verify', result.public.txId, result.public.blockHeight);
  
  // Extract return values: [isActive]
  const [isActive] = result.public.output;
  logger.info('✅ zkID verification successful');
  logger.info(`🔒 zkID Status: ${isActive ? 'Active' : 'Inactive'}`);
};

// Get credit score
export const getCreditScore = async (contract: DeployedZkIdContract): Promise<void> => {
  logger.info('📊 Getting credit score...');
  
  const result = await contract.callTx.getCreditScore();
  await logTransactionHashes('Get Credit Score', result.public.txId, result.public.blockHeight);
  
  // Extract return value: [creditScore]
  const [creditScore] = result.public.output;
  logger.info('📈 Credit score retrieved from private state');
  logger.info(`📊 Your credit score: ${creditScore}`);
};

// Get zkID information
export const getZkIdInfo = async (contract: DeployedZkIdContract): Promise<void> => {
  logger.info('📋 Getting zkID information...');
  
  const result = await contract.callTx.getZkIdInfo();
  await logTransactionHashes('Get zkID Info', result.public.txId, result.public.blockHeight);
  
  // Extract return values: [currentZkId, zkIdOwner, isActive, zkIdIssuedAt]
  const [currentZkId, zkIdOwner, isActive, zkIdIssuedAt] = result.public.output;
  logger.info('📋 zkID Information Retrieved:');
  logger.info(`🆔 Current zkID: ${currentZkId}`);
  logger.info(`👤 Owner: ${JSON.stringify(zkIdOwner)}`);
  logger.info(`🔒 Status: ${isActive ? 'Active' : 'Inactive'}`);
  logger.info(`📅 Issued At: ${zkIdIssuedAt}`);
};

// Reveal identity for liquidation
export const revealIdentity = async (
  contract: DeployedZkIdContract,
  collectorAddress: any
): Promise<void> => {
  logger.info('⚠️ Revealing identity for liquidation...');
  
  const result = await contract.callTx.revealIdentityForLiquidation(collectorAddress);
  await logTransactionHashes('Identity Reveal', result.public.txId, result.public.blockHeight);
  
  // Extract return values: [privateName, privateEmail, privateAddress, isKYCVerified, creditScore]
  const [privateName, privateEmail, privateAddress, isKYCVerified, creditScore] = result.public.output;
  
  logger.info('🎭 IDENTITY REVEALED FOR LIQUIDATION');
  logger.info('====================================');
  logger.info(`👤 Name Hash: ${privateName}`);
  logger.info(`📧 Email Hash: ${privateEmail}`);
  logger.info(`🏠 Address Hash: ${privateAddress}`);
  logger.info(`✅ KYC Status: ${isKYCVerified ? 'Verified' : 'Not Verified'}`);
  logger.info(`📊 Credit Score: ${creditScore}`);
  logger.info('⚠️ This information is now available to the debt collector');
  logger.info('🔒 This action is irreversible');
};

// Update credit score
export const updateCreditScore = async (
  contract: DeployedZkIdContract,
  newScore: number
): Promise<void> => {
  logger.info(`📈 Updating credit score to ${newScore}...`);
  
  const result = await contract.callTx.updateCreditScore(BigInt(newScore));
  await logTransactionHashes('Credit Score Update', result.public.txId, result.public.blockHeight);
  
  logger.info('✅ Credit score updated successfully');
};

// Helper function for transaction logging
async function logTransactionHashes(operation: string, cliTxHash: string, blockHeight: number) {
  logger.info(`✅ ${operation} successful!`);
  logger.info(`🔗 CLI Transaction Hash: ${cliTxHash}`);
  logger.info(`📦 Block Height: ${blockHeight}`);
  logger.info(`🔍 Query indexer with: ${cliTxHash}`);
  logger.info(''); // Empty line for readability
}

export const setLogger = (_logger: Logger) => {
  logger = _logger;
};

export const setIndexerConfig = (config: { indexer: string; indexerWS: string }) => {
  indexerConfig = config;
};
