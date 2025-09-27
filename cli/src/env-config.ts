import { readFileSync } from 'fs';
import { join } from 'path';

interface EnvironmentConfig {
  indexerUrl: string;
  indexerWS: string;
  nodeUrl: string;
  proofServerUrl: string;
  logLevel: string;
  nodeEnv: string;
}

/**
 * Load environment variables from config.env file and process.env
 * with validation and fallbacks
 */
function loadEnvironmentConfig(): EnvironmentConfig {
  try {
    // Try to load from config.env file
    const envFilePath = join(process.cwd(), 'config.env');
    const envFileContent = readFileSync(envFilePath, 'utf-8');
    
    // Parse the env file content
    const envVars: Record<string, string> = {};
    envFileContent.split('\n').forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, ...valueParts] = trimmedLine.split('=');
        if (key && valueParts.length > 0) {
          envVars[key.trim()] = valueParts.join('=').trim();
        }
      }
    });

    // Merge with process.env (process.env takes precedence)
    const getEnvValue = (key: string, fallback?: string): string => {
      return process.env[key] || envVars[key] || fallback || '';
    };

    return {
      indexerUrl: getEnvValue('INDEXER_URL', 'http://127.0.0.1:8088/api/v1/graphql'),
      indexerWS: getEnvValue('INDEXER_WS_URL', 'ws://127.0.0.1:8088/api/v1/graphql/ws'),
      nodeUrl: getEnvValue('NODE_URL', 'http://127.0.0.1:9944'),
      proofServerUrl: getEnvValue('PROOF_SERVER_URL', 'http://127.0.0.1:6300'),
      logLevel: getEnvValue('LOG_LEVEL', 'info'),
      nodeEnv: getEnvValue('NODE_ENV', 'development'),
    };
  } catch (error) {
    console.warn('Could not load config.env file, using defaults and process.env only');
    
    // Fallback to process.env only with defaults
    return {
      indexerUrl: process.env.INDEXER_URL || 'http://127.0.0.1:8088/api/v1/graphql',
      indexerWS: process.env.INDEXER_WS_URL || 'ws://127.0.0.1:8088/api/v1/graphql/ws',
      nodeUrl: process.env.NODE_URL || 'http://127.0.0.1:9944',
      proofServerUrl: process.env.PROOF_SERVER_URL || 'http://127.0.0.1:6300',
      logLevel: process.env.LOG_LEVEL || 'info',
      nodeEnv: process.env.NODE_ENV || 'development',
    };
  }
}

export { loadEnvironmentConfig, type EnvironmentConfig };
