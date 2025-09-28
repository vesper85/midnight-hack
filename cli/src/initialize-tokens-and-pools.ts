// Script to initialize test tokens and their corresponding liquidity pools
import { createLogger } from './logger-utils.js';
import { StandaloneConfig } from './config.js';
import { loadEnvironmentConfig } from './env-config.js';
import { buildFreshWallet, buildWalletAndWaitForFunds } from './api.js';
import { deployTestToken, setLogger as setTestTokenLogger, setIndexerConfig } from './testtoken-api.js';
import { deployLiquidityPool, setLogger as setPoolLogger } from './liquidity-pool-api.js';

// Configuration for tokens to create
const TOKEN_CONFIGS = [
  {
    name: 'USDC Token',
    nameNum: 1001,
    symbolNum: 2001, 
    initialSupply: 1000000n,
  },
  {
    name: 'WETH Token',
    nameNum: 1002,
    symbolNum: 2002,
    initialSupply: 500000n,
  },
  {
    name: 'WBTC Token', 
    nameNum: 1003,
    symbolNum: 2003,
    initialSupply: 100000n,
  }
];

async function initializeTokensAndPools() {
  const envConfig = loadEnvironmentConfig();
  const config = new StandaloneConfig();

  // Configure with environment variables
  config.indexer = envConfig.indexerUrl;
  config.indexerWS = envConfig.indexerWS;
  config.node = envConfig.nodeUrl;
  config.proofServer = envConfig.proofServerUrl;

  const logger = await createLogger('./logs/initialize-tokens-and-pools');
  
  // Set loggers for all modules BEFORE using any functions that depend on them
  const { setLogger: setApiLogger } = await import('./api.js');
  setApiLogger(logger);
  setTestTokenLogger(logger);
  setPoolLogger(logger);
  setIndexerConfig({ indexer: config.indexer, indexerWS: config.indexerWS });

  logger.info('🚀 Starting Token and Pool Initialization...');
  logger.info(`📡 Indexer: ${config.indexer}`);
  logger.info(`🌐 Node: ${config.node}`);
  logger.info(`🔐 Proof Server: ${config.proofServer}`);
  logger.info(`🪙 Tokens to create: ${TOKEN_CONFIGS.length}`);

  try {
    // Build wallet with genesis seed that has funds in standalone environment
    logger.info('🔑 Building wallet and waiting for funds...');
    logger.info('🏦 Using genesis wallet with pre-funded tokens for standalone environment');
    const wallet = await buildWalletAndWaitForFunds(
      config,
      process.env.WALLET_SEED || '0000000000000000000000000000000000000000000000000000000000000001',
      'token-pool-init'
    );
    logger.info('✅ Wallet built and funds received!');

    const deployedContracts = [];

    // Deploy tokens and pools
    for (let i = 0; i < TOKEN_CONFIGS.length; i++) {
      const tokenConfig = TOKEN_CONFIGS[i];
      
      logger.info(`\n==================== TOKEN ${i + 1}/${TOKEN_CONFIGS.length} ====================`);
      logger.info(`🪙 Creating ${tokenConfig.name}...`);
      logger.info(`📝 Name: ${tokenConfig.nameNum}, Symbol: ${tokenConfig.symbolNum}`);
      logger.info(`💰 Initial Supply: ${tokenConfig.initialSupply}`);

      try {
        // Deploy TestToken
        const testTokenContract = await deployTestToken(
          wallet,
          config,
          tokenConfig.nameNum,
          tokenConfig.symbolNum,
          tokenConfig.initialSupply
        );

        logger.info(`✅ ${tokenConfig.name} deployed successfully!`);
        logger.info(`📄 Token Address: ${testTokenContract.deployTxData.public.contractAddress}`);

        // Deploy corresponding LiquidityPool using the compiled contract
        logger.info(`🏊 Creating liquidity pool for ${tokenConfig.name}...`);
        
        const liquidityPoolContract = await deployLiquidityPool(
          wallet,
          config,
          testTokenContract.deployTxData.public.contractAddress
        );

        logger.info(`✅ Liquidity pool for ${tokenConfig.name} created successfully!`);
        logger.info(`🏊 Pool Address: ${liquidityPoolContract.deployTxData.public.contractAddress}`);

        deployedContracts.push({
          tokenName: tokenConfig.name,
          tokenAddress: testTokenContract.deployTxData.public.contractAddress,
          poolAddress: liquidityPoolContract.deployTxData.public.contractAddress,
          tokenContract: testTokenContract,
          poolContract: liquidityPoolContract
        });

        logger.info(`📊 ${tokenConfig.name} ecosystem created successfully!`);

      } catch (error) {
        logger.error(`❌ Failed to create ${tokenConfig.name}: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
      }
    }

    // Summary
    logger.info('\n🎉 ===================== SUMMARY =====================');
    logger.info(`✅ Successfully created ${deployedContracts.length} token ecosystems!`);
    
    deployedContracts.forEach((contract, index) => {
      logger.info(`\n${index + 1}. ${contract.tokenName}:`);
      logger.info(`   🪙 Token:  ${contract.tokenAddress}`);
      logger.info(`   🏊 Pool:   ${contract.poolAddress}`);
    });

    logger.info('\n🔧 You can now interact with these tokens and pools using the CLI!');
    logger.info('💡 Use the contract addresses above to join existing contracts.');
    
    // Close wallet
    await wallet.close();

  } catch (error) {
    logger.error(`❌ Failed to initialize tokens and pools: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}

// Run the initialization
initializeTokensAndPools().catch((error) => {
  console.error('Error during initialization:', error);
  process.exit(1);
});
