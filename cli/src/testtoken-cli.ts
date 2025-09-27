// This file is part of midnightntwrk/example-counter.
// Copyright (C) 2025 Midnight Foundation
// SPDX-License-Identifier: Apache-2.0

import { stdin as input, stdout as output } from 'node:process';
import { createInterface, type Interface } from 'node:readline/promises';
import { type Logger } from 'pino';
import { type Config } from './config';
import * as api from './api';
import * as testTokenApi from './testtoken-api';
import { ShieldedAddress } from '@midnight-ntwrk/wallet-sdk-address-format';


let logger: Logger;

const DEPLOY_OR_JOIN_QUESTION = `
You can do one of the following:
  1. Deploy a new TestToken contract
  2. Join an existing TestToken contract  
  3. Exit
Which would you like to do? `;

const MAIN_LOOP_QUESTION = `
You can do one of the following:
  1. Mint tokens (owner only)
  2. Use faucet (get 1000 tokens)
  3. Burn tokens (owner only)
  4. Display token state
  5. Exit
Which would you like to do? `;

const deployOrJoin = async (providers: any, rli: Interface): Promise<any> => {
  while (true) {
    const choice = await rli.question(DEPLOY_OR_JOIN_QUESTION);
    switch (choice) {
      case '1': {
        const tokenNameInput = await rli.question('Enter token name (as number, e.g., 1234): ');
        const tokenSymbolInput = await rli.question('Enter token symbol (as number, e.g., 5678): ');
        const initialSupplyInput = await rli.question('Enter initial supply (e.g., 1000000): ');
        
        const tokenName = parseInt(tokenNameInput, 10);
        const tokenSymbol = parseInt(tokenSymbolInput, 10);
        
        if (isNaN(tokenName)) {
          logger.error(`Invalid token name: "${tokenNameInput}". Please enter a valid number.`);
          continue;
        }
        
        if (isNaN(tokenSymbol)) {
          logger.error(`Invalid token symbol: "${tokenSymbolInput}". Please enter a valid number.`);
          continue;
        }
        
        let initialSupply: bigint;
        try {
          initialSupply = BigInt(initialSupplyInput);
        } catch (error) {
          logger.error(`Invalid initial supply: "${initialSupplyInput}". Please enter a valid number.`);
          continue;
        }
        
        return await testTokenApi.deployTestToken(
          providers.wallet,
          providers.config,
          tokenName,
          tokenSymbol,
          initialSupply
        );
      }
      case '2': {
        const contractAddress = await rli.question('What is the contract address (in hex)? ');
        // For simplicity, we'll just return a mock object with the address
        return { deployTxData: { public: { contractAddress } } };
      }
      case '3':
        logger.info('Exiting...');
        return null;
      default:
        logger.error(`Invalid choice: ${choice}`);
    }
  }
};

const mainLoop = async (providers: any, rli: Interface): Promise<void> => {
  const testTokenContract = await deployOrJoin(providers, rli);
  if (testTokenContract === null) {
    return;
  }
  
  while (true) {
    const choice = await rli.question(MAIN_LOOP_QUESTION);
    switch (choice) {
      case '1': {
        const amount = BigInt(await rli.question('Enter amount to mint: '));
        if (testTokenContract.mintWithLogging) {
          await testTokenContract.mintWithLogging(amount);
        } else if (testTokenContract.callTx?.mint) {
          logger.info(`Minting ${amount} tokens...`);
          const txResult = await testTokenContract.callTx.mint(amount);
          logger.info(`✅ Mint successful!`);
          logger.info(`🔗 Transaction Hash: ${txResult.public.txId}`);
          logger.info('original txHash', (ShieldedAddress as any).fromBech32m(txResult.public.txId));
          logger.info(`📦 Block Height: ${txResult.public.blockHeight}`);
          logger.info(`💰 Minted ${amount} tokens successfully!`);
        } else {
          logger.error('Cannot mint - not connected to deployed contract');
        }
        break;
      }
      case '2': {
        if (testTokenContract.faucetWithLogging) {
          await testTokenContract.faucetWithLogging();
        } else if (testTokenContract.callTx?.faucet) {
          logger.info('Using faucet to get 1000 tokens...');
          const txResult = await testTokenContract.callTx.faucet();
          logger.info(`✅ Faucet successful!`);
          logger.info(`🔗 Transaction Hash: ${txResult.public.txId}`);
          logger.info('original txHash', (ShieldedAddress as any).fromBech32m(txResult.public.txId));
          logger.info(`📦 Block Height: ${txResult.public.blockHeight}`);
          logger.info(`💰 Received 1000 tokens from faucet!`);
        } else {
          logger.error('Cannot use faucet - not connected to deployed contract');
        }
        break;
      }
      case '3': {
        const amount = BigInt(await rli.question('Enter amount to burn: '));
        if (testTokenContract.burnWithLogging) {
          await testTokenContract.burnWithLogging(amount);
        } else if (testTokenContract.callTx?.burn) {
          logger.info(`Burning ${amount} tokens...`);
          const txResult = await testTokenContract.callTx.burn(amount);
          logger.info(`✅ Burn successful!`);
          logger.info(`🔗 Transaction Hash: ${txResult.public.txId}`);
          logger.info('original txHash', (ShieldedAddress as any).fromBech32m(txResult.public.txId));
          logger.info(`📦 Block Height: ${txResult.public.blockHeight}`);
          logger.info(`🔥 Burned ${amount} tokens successfully!`);
        } else {
          logger.error('Cannot burn - not connected to deployed contract');
        }
        break;
      }
      case '4': {
        await testTokenApi.getTestTokenState(providers, testTokenContract.deployTxData.public.contractAddress);
        break;
      }
      case '5':
        logger.info('Exiting...');
        return;
      default:
        logger.error(`Invalid choice: ${choice}`);
    }
  }
};

const WALLET_LOOP_QUESTION = `
You can do one of the following:
  1. Build a fresh wallet
  2. Use existing seed: 82db031802d34216bb6b82136f27f8271a61b07b84ff0c7e34bba26477c991b7
  3. Enter custom seed
  4. Exit
Which would you like to do? `;

/**
 * This seed gives access to tokens minted in the genesis block of a local development node - only
 * used in standalone networks to build a wallet with initial funds.
 */
const GENESIS_MINT_WALLET_SEED = '0000000000000000000000000000000000000000000000000000000000000001';

const buildWallet = async (config: Config, rli: Interface): Promise<any> => {
  // For standalone config, automatically use the genesis wallet with pre-funded tokens
  if (config instanceof (await import('./config.js')).StandaloneConfig) {
    logger.info('🏦 Using genesis wallet with pre-funded tokens for standalone environment');
    return await api.buildWalletAndWaitForFunds(config, GENESIS_MINT_WALLET_SEED, '');
  }
  
  // For testnet, show wallet options
  while (true) {
    const choice = await rli.question(WALLET_LOOP_QUESTION);
    switch (choice) {
      case '1':
        return await api.buildFreshWallet(config);
      case '2':
        const existingSeed = "82db031802d34216bb6b82136f27f8271a61b07b84ff0c7e34bba26477c991b7";
        return await api.buildWalletAndWaitForFunds(config, existingSeed, '');
      case '3':
        const customSeed = await rli.question('Enter your wallet seed: ');
        return await api.buildWalletAndWaitForFunds(config, customSeed, '');
      case '4':
        logger.info('Exiting...');
        return null;
      default:
        logger.error(`Invalid choice: ${choice}`);
    }
  }
};

export const runTestToken = async (config: Config, _logger: Logger, dockerEnv?: any): Promise<void> => {
  logger = _logger;
  api.setLogger(_logger);
  testTokenApi.setLogger(_logger);
  testTokenApi.setIndexerConfig({ indexer: config.indexer, indexerWS: config.indexerWS });
  
  const rli = createInterface({ input, output, terminal: true });
  
  let env: any;
  try {
    // Handle Docker environment if provided
    if (dockerEnv !== undefined) {
      env = await dockerEnv.up();
      logger.info('✅ Docker containers started successfully');
      logger.info('🔗 Local blockchain node running');
      logger.info('📊 Indexer running'); 
      logger.info('🔒 Proof server running');
      
      // Map container ports for StandaloneConfig
      if (config instanceof (await import('./config.js')).StandaloneConfig) {
        const indexerContainer = env.getContainer('counter-indexer');
        const nodeContainer = env.getContainer('counter-node');
        const proofServerContainer = env.getContainer('counter-proof-server');
        
        config.indexer = `http://127.0.0.1:${indexerContainer.getFirstMappedPort()}/api/v1/graphql`;
        config.indexerWS = `ws://127.0.0.1:${indexerContainer.getFirstMappedPort()}/api/v1/graphql/ws`;
        config.node = `http://127.0.0.1:${nodeContainer.getFirstMappedPort()}`;
        config.proofServer = `http://127.0.0.1:${proofServerContainer.getFirstMappedPort()}`;
        
        logger.info(`📡 Indexer: ${config.indexer}`);
        logger.info(`🌐 Node: ${config.node}`);
        logger.info(`🔐 Proof Server: ${config.proofServer}`);
      }
    }
    
    // Build wallet with options
    const wallet = await buildWallet(config, rli);
    if (wallet === null) {
      return;
    }
    const apiProviders = await api.configureProviders(wallet, config);
    
    const providers = {
      ...apiProviders,
      wallet,
      config
    };
    
    await mainLoop(providers, rli);
  } catch (e) {
    if (e instanceof Error) {
      logger.error(`Found error '${e.message}'`);
      logger.info('Exiting...');
      logger.debug(`${e.stack}`);
    } else {
      throw e;
    }
  } finally {
    try {
      rli.close();
      rli.removeAllListeners();
    } catch (e) {
      logger.error(`Error closing readline interface: ${e}`);
    } finally {
      try {
        if (env !== undefined) {
          logger.info('🛑 Shutting down Docker containers...');
          await env.down();
          logger.info('✅ Docker environment shut down');
          logger.info('Goodbye');
        }
      } catch (e) {
        logger.error(`Error shutting down docker environment: ${e}`);
      }
    }
  }
};
