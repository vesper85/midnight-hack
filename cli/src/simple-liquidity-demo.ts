// Simple Liquidity Pool Demo - Based on working simple-standalone-testtoken.ts
import { createLogger } from './logger-utils.js';
import { StandaloneConfig } from './config.js';
import { deployTestToken } from './testtoken-api.js';
import { deployZkId } from './zkid-demo-api.js';
import { 
  deployLiquidityPool, 
  initializeLiquidityPool,
  setLogger as setLiquidityLogger
} from './liquidity-api.js';
import { setLogger as setTestTokenLogger } from './testtoken-api.js';
import { setLogger as setZkIdLogger } from './zkid-demo-api.js';
import * as api from './api.js';

const config = new StandaloneConfig();

// Override with the actual Docker container ports
config.indexer = 'http://127.0.0.1:55002/api/v1/graphql';
config.indexerWS = 'ws://127.0.0.1:55002/api/v1/graphql/ws';
config.node = 'http://127.0.0.1:55001';
config.proofServer = 'http://127.0.0.1:55000';

const logger = await createLogger('./logs/simple-liquidity-demo');

// Set loggers for all APIs
setLiquidityLogger(logger);
setTestTokenLogger(logger);
setZkIdLogger(logger);
api.setLogger(logger);

logger.info('🚀 Starting Simple Liquidity Pool Demo...');
logger.info(`📡 Indexer: ${config.indexer}`);
logger.info(`🌐 Node: ${config.node}`);
logger.info(`🔐 Proof Server: ${config.proofServer}`);

/**
 * This seed gives access to tokens minted in the genesis block of a local development node - only
 * used in standalone networks to build a wallet with initial funds.
 */
const GENESIS_MINT_WALLET_SEED = '0000000000000000000000000000000000000000000000000000000000000001';

// Build wallet with pre-funded tokens
logger.info('🔑 Setting up wallet...');
logger.info('🏦 Using genesis wallet with pre-funded tokens for standalone environment');
const wallet = await api.buildWalletAndWaitForFunds(config, GENESIS_MINT_WALLET_SEED, '');

logger.info('🚀 Deploying all contracts...');

try {
  // Deploy TestToken
  logger.info('1/3 Deploying TestToken...');
  const testToken = await deployTestToken(
    wallet,
    config,
    1234, // token name
    5678, // token symbol
    BigInt(10000000) // initial supply
  );
  
  // Deploy ZkId
  logger.info('2/3 Deploying ZkId...');
  const zkId = await deployZkId(wallet, config);
  
  // Deploy LiquidityPool
  logger.info('3/3 Deploying LiquidityPool...');
  const liquidityPool = await deployLiquidityPool(
    wallet,
    config,
    testToken.deployTxData.public.contractAddress
  );
  
  // Initialize LiquidityPool
  logger.info('🔧 Initializing LiquidityPool...');
  await initializeLiquidityPool(
    liquidityPool,
    testToken.deployTxData.public.contractAddress
  );
  
  logger.info('✅ All contracts deployed and initialized successfully!');
  logger.info('📄 Contract Addresses:');
  logger.info(`   TestToken: ${testToken.deployTxData.public.contractAddress}`);
  logger.info(`   ZkId: ${zkId.deployTxData.public.contractAddress}`);
  logger.info(`   LiquidityPool: ${liquidityPool.deployTxData.public.contractAddress}`);
  
  logger.info('🎉 Liquidity Pool Demo Setup Complete!');
  logger.info('💡 You can now interact with the contracts using the CLI APIs');
  
} catch (error) {
  logger.error('❌ Failed to deploy contracts:', error as any);
  logger.error('Stack trace:', (error as Error).stack as any);
  process.exit(1);
}
