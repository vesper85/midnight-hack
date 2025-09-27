// Simple standalone TestToken deployment
import { createLogger } from './logger-utils.js';
import { runTestToken } from './testtoken-cli.js';
import { StandaloneConfig } from './config.js';
import { loadEnvironmentConfig } from './env-config.js';

const envConfig = loadEnvironmentConfig();
const config = new StandaloneConfig();

// Configure with environment variables
config.indexer = envConfig.indexerUrl;
config.indexerWS = envConfig.indexerWS;
config.node = envConfig.nodeUrl;
config.proofServer = envConfig.proofServerUrl;

const logger = await createLogger('./logs/simple-standalone-testtoken');

logger.info('🚀 Starting TestToken on Standalone Environment...');
logger.info(`📡 Indexer: ${config.indexer}`);
logger.info(`🌐 Node: ${config.node}`);
logger.info(`🔐 Proof Server: ${config.proofServer}`);

await runTestToken(config, logger);
