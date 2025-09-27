// Simple standalone TestToken deployment
import { createLogger } from './logger-utils.js';
import { runTestToken } from './testtoken-cli.js';
import { StandaloneConfig } from './config.js';

const config = new StandaloneConfig();

// Override with the actual container ports
config.indexer = 'http://127.0.0.1:55006/api/v1/graphql';
config.indexerWS = 'ws://127.0.0.1:55006/api/v1/graphql/ws';
config.node = 'http://127.0.0.1:50964';
config.proofServer = 'http://127.0.0.1:50963';

const logger = await createLogger('./logs/simple-standalone-testtoken');

logger.info('🚀 Starting TestToken on Standalone Environment...');
logger.info(`📡 Indexer: ${config.indexer}`);
logger.info(`🌐 Node: ${config.node}`);
logger.info(`🔐 Proof Server: ${config.proofServer}`);

await runTestToken(config, logger);
