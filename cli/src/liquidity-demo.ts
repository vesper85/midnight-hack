// Liquidity Pool Demo - Deploy and interact with contracts
import { createLogger } from './logger-utils.js';
import { StandaloneConfig } from './config.js';
import { createInterface } from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
// Remove this import - we'll define buildWallet locally
import { deployTestToken } from './testtoken-api.js';
import { deployZkId } from './zkid-demo-api.js';
import { 
  deployLiquidityPool, 
  initializeLiquidityPool,
  provideLiquidity,
  stakeCollateral,
  borrowFromPool,
  repayLoan,
  getBorrowerPosition,
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

const logger = await createLogger('./logs/liquidity-demo');

// Set loggers for all APIs
setLiquidityLogger(logger);
setTestTokenLogger(logger);
setZkIdLogger(logger);
api.setLogger(logger);

/**
 * This seed gives access to tokens minted in the genesis block of a local development node - only
 * used in standalone networks to build a wallet with initial funds.
 */
const GENESIS_MINT_WALLET_SEED = '0000000000000000000000000000000000000000000000000000000000000001';

const buildWallet = async (config: any, rli: any): Promise<any> => {
  // For standalone config, automatically use the genesis wallet with pre-funded tokens
  logger.info('🏦 Using genesis wallet with pre-funded tokens for standalone environment');
  return await api.buildWalletAndWaitForFunds(config, GENESIS_MINT_WALLET_SEED, '');
};

logger.info('🚀 Starting Liquidity Pool Demo...');
logger.info(`📡 Indexer: ${config.indexer}`);
logger.info(`🌐 Node: ${config.node}`);
logger.info(`🔐 Proof Server: ${config.proofServer}`);

const rli = createInterface({ input, output, terminal: true });

// Build wallet
logger.info('🔑 Setting up wallet...');
const wallet = await buildWallet(config, rli);
if (wallet === null) {
  logger.error('Failed to build wallet');
  process.exit(1);
}

const apiProviders = await api.configureProviders(wallet, config);
const providers = {
  ...apiProviders,
  wallet,
  config
};

logger.info('📋 Liquidity Pool Demo Menu:');
logger.info('1. Deploy all contracts (TestToken, ZkId, LiquidityPool)');
logger.info('2. Provide liquidity');
logger.info('3. Stake collateral and borrow');
logger.info('4. Repay loan');
logger.info('5. Check borrower position');
logger.info('6. Exit');

let deployedContracts: {
  testToken?: any;
  zkId?: any;
  liquidityPool?: any;
} = {};

async function handleUserChoice() {
  while (true) {
    const choice = await new Promise<string>((resolve) => {
      rli.question('\nWhat would you like to do? ', resolve);
    });

    switch (choice) {
      case '1':
        await deployAllContracts();
        break;
      case '2':
        await handleProvideLiquidity();
        break;
      case '3':
        await handleStakeAndBorrow();
        break;
      case '4':
        await handleRepayLoan();
        break;
      case '5':
        await handleCheckPosition();
        break;
      case '6':
        logger.info('👋 Goodbye!');
        rli.close();
        return;
      default:
        logger.error(`Invalid choice: ${choice}`);
    }
  }
}

async function deployAllContracts() {
  try {
    logger.info('🚀 Deploying all contracts...');
    
    // Deploy TestToken
    logger.info('1/3 Deploying TestToken...');
    deployedContracts.testToken = await deployTestToken(
      wallet,
      config,
      1234, // token name
      5678, // token symbol
      BigInt(10000000) // initial supply
    );
    
    // Deploy ZkId
    logger.info('2/3 Deploying ZkId...');
    deployedContracts.zkId = await deployZkId(wallet, config);
    
    // Deploy LiquidityPool
    logger.info('3/3 Deploying LiquidityPool...');
    deployedContracts.liquidityPool = await deployLiquidityPool(
      wallet,
      config,
      deployedContracts.testToken.deployTxData.public.contractAddress
    );
    
    // Initialize LiquidityPool
    logger.info('🔧 Initializing LiquidityPool...');
    await initializeLiquidityPool(
      deployedContracts.liquidityPool,
      deployedContracts.testToken.deployTxData.public.contractAddress
    );
    
    logger.info('✅ All contracts deployed and initialized successfully!');
    logger.info(`📄 TestToken: ${deployedContracts.testToken.deployTxData.public.contractAddress}`);
    logger.info(`🆔 ZkId: ${deployedContracts.zkId.deployTxData.public.contractAddress}`);
    logger.info(`💰 LiquidityPool: ${deployedContracts.liquidityPool.deployTxData.public.contractAddress}`);
    
  } catch (error) {
    logger.error('❌ Failed to deploy contracts:', error as any);
  }
}

async function handleProvideLiquidity() {
  if (!deployedContracts.liquidityPool) {
    logger.error('❌ LiquidityPool not deployed. Deploy contracts first.');
    return;
  }
  
  const amount = await new Promise<string>((resolve) => {
    rli.question('Enter liquidity amount to provide: ', resolve);
  });
  
  try {
    await provideLiquidity(deployedContracts.liquidityPool, BigInt(amount));
  } catch (error) {
    logger.error('❌ Failed to provide liquidity:', error as any);
  }
}

async function handleStakeAndBorrow() {
  if (!deployedContracts.liquidityPool || !deployedContracts.zkId) {
    logger.error('❌ Contracts not deployed. Deploy contracts first.');
    return;
  }
  
  const collateralAmount = await new Promise<string>((resolve) => {
    rli.question('Enter collateral amount to stake: ', resolve);
  });
  
  const borrowAmount = await new Promise<string>((resolve) => {
    rli.question('Enter amount to borrow: ', resolve);
  });
  
  try {
    // Stake collateral
    await stakeCollateral(
      deployedContracts.liquidityPool, 
      BigInt(collateralAmount),
      deployedContracts.zkId.deployTxData.public.contractAddress
    );
    
    // Borrow from pool
    await borrowFromPool(deployedContracts.liquidityPool, BigInt(borrowAmount));
    
  } catch (error) {
    logger.error('❌ Failed to stake and borrow:', error as any);
  }
}

async function handleRepayLoan() {
  if (!deployedContracts.liquidityPool) {
    logger.error('❌ LiquidityPool not deployed. Deploy contracts first.');
    return;
  }
  
  const principal = await new Promise<string>((resolve) => {
    rli.question('Enter principal amount to repay: ', resolve);
  });
  
  const interest = await new Promise<string>((resolve) => {
    rli.question('Enter interest amount: ', resolve);
  });
  
  try {
    await repayLoan(deployedContracts.liquidityPool, BigInt(principal), BigInt(interest));
  } catch (error) {
    logger.error('❌ Failed to repay loan:', error as any);
  }
}

async function handleCheckPosition() {
  if (!deployedContracts.liquidityPool) {
    logger.error('❌ LiquidityPool not deployed. Deploy contracts first.');
    return;
  }
  
  try {
    await getBorrowerPosition(deployedContracts.liquidityPool);
  } catch (error) {
    logger.error('❌ Failed to check position:', error as any);
  }
}

// Start the demo
await handleUserChoice();
