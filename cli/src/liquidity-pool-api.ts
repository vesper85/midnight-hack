// LiquidityPool contract API
import { LiquidityPool } from '@midnight-ntwrk/contract';
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

let logger: Logger;

export type LiquidityPoolContract = LiquidityPool.Contract<unknown, {}>;

export type DeployedLiquidityPoolContract = {
  deployTxData: {
    public: {
      contractAddress: string;
      txId: string;
      blockHeight: number;
    };
  };
  callTx: {
    initialize: (testTokenAddr: { bytes: Uint8Array }, zkIdAddr: { bytes: Uint8Array }) => Promise<any>;
    provideLiquidity: (amount: bigint) => Promise<any>;
    stakeCollateral: (amount: bigint, borrowerZkIdAddr: string) => Promise<any>;
    borrowFromPool: (amount: bigint) => Promise<any>;
    repayLoan: (principal: bigint, interest: bigint) => Promise<any>;
    claimRewards: () => Promise<any>;
    withdrawCollateral: (amount: bigint) => Promise<any>;
    liquidatePosition: (liquidationAmount: bigint) => Promise<any>;
    getBorrowerPosition: () => Promise<any>;
    getLiquidityProvider: () => Promise<any>;
    getPoolState: () => Promise<any>;
    calculateHealthFactor: () => Promise<any>;
    updateInterestRates: () => Promise<any>;
    pausePool: () => Promise<any>;
    unpausePool: () => Promise<any>;
  };
};

export const deployLiquidityPool = async (
  wallet: Wallet & Resource,
  config: Config,
  testTokenAddress: string,
  zkIdAddress: string = "0x0000000000000000000000000000000000000000000000000000000000000000" // Default placeholder
): Promise<DeployedLiquidityPoolContract> => {
  logger.info('Deploying LiquidityPool contract...');
  
  const walletAndMidnightProvider = await createWalletAndMidnightProvider(wallet);
  
  const liquidityPoolZkConfigPath = path.resolve('../contracts/src/managed/LiquidityPool');
  
  const providers = {
    privateStateProvider: levelPrivateStateProvider<never>({
      privateStateStoreName: 'liquiditypool-private-state',
    }),
    publicDataProvider: indexerPublicDataProvider(config.indexer, config.indexerWS),
    zkConfigProvider: new NodeZkConfigProvider<'initialize' | 'provideLiquidity' | 'stakeCollateral' | 'borrowFromPool' | 'repayLoan' | 'claimRewards' | 'withdrawCollateral' | 'liquidatePosition' | 'getBorrowerPosition' | 'getLiquidityProvider' | 'getPoolState' | 'calculateHealthFactor' | 'updateInterestRates' | 'pausePool' | 'unpausePool'>(liquidityPoolZkConfigPath),
    proofProvider: httpClientProofProvider(config.proofServer),
    walletProvider: walletAndMidnightProvider,
    midnightProvider: walletAndMidnightProvider,
  };

  const liquidityPoolContract = new LiquidityPool.Contract({});
  
  const deployedContract = await deployContract(providers, {
    contract: liquidityPoolContract,
    privateStateId: 'liquidityPoolPrivateState',
    initialPrivateState: {},
  });

  logger.info('✅ LiquidityPool deployment successful!');
  logger.info(`📄 Pool Contract Address: ${deployedContract.deployTxData.public.contractAddress}`);
  logger.info(`🔗 Pool Deploy TX: ${deployedContract.deployTxData.public.txId}`);
  logger.info(`📦 Block Height: ${deployedContract.deployTxData.public.blockHeight}`);
  
  // Initialize the pool with the TestToken contract address
  logger.info('Initializing LiquidityPool...');
  logger.info(`🪙 TestToken Address: ${testTokenAddress}`);
  logger.info(`🆔 ZkId Address: ${zkIdAddress}`);
  
  // Convert string addresses to the required format
  const testTokenAddrBytes = { bytes: new Uint8Array(Buffer.from(testTokenAddress.replace('0x', ''), 'hex')) };
  const zkIdAddrBytes = { bytes: new Uint8Array(Buffer.from(zkIdAddress.replace('0x', ''), 'hex')) };
  
  const initTxResult = await deployedContract.callTx.initialize(testTokenAddrBytes, zkIdAddrBytes);
  logger.info('✅ LiquidityPool initialization successful!');
  logger.info(`🔗 Init TX: ${initTxResult.public.txId}`);
  logger.info(`📦 Block Height: ${initTxResult.public.blockHeight}`);
  
  return deployedContract as any as DeployedLiquidityPoolContract;
};

export const setLogger = (_logger: Logger) => {
  logger = _logger;
};
