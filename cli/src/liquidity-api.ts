import { ZkId, LiquidityPool, TestToken } from '@midnight-ntwrk/contract';
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

export type DeployedLiquidityPoolContract = {
  deployTxData: {
    public: {
      contractAddress: string;
      txId: string;
      blockHeight: number;
    };
  };
  callTx: {
    initialize: (testTokenAddr: any) => Promise<any>;
    provideLiquidity: (amount: bigint) => Promise<any>;
    stakeCollateral: (amount: bigint, borrowerZkIdAddr: any) => Promise<any>;
    borrowFromPool: (amount: bigint) => Promise<any>;
    repayLoan: (principal: bigint, interest: bigint) => Promise<any>;
    claimRewards: () => Promise<any>;
    withdrawCollateral: (amount: bigint) => Promise<any>;
    liquidatePosition: (liquidationAmount: bigint) => Promise<any>;
    getBorrowerPosition: () => Promise<any>;
  };
};


export const deployLiquidityPool = async (
  wallet: Wallet & Resource,
  config: Config,
  testTokenAddr: string
): Promise<DeployedLiquidityPoolContract> => {
  logger.info('💰 Deploying Liquidity Pool Contract...');

  const walletAndMidnightProvider = await createWalletAndMidnightProvider(wallet);

  const providers = {
    privateStateProvider: levelPrivateStateProvider<never>({
      privateStateStoreName: 'liquidity-pool-private-state',
    }),
    publicDataProvider: indexerPublicDataProvider(config.indexer, config.indexerWS),
    zkConfigProvider: new NodeZkConfigProvider<'initialize' | 'provideLiquidity' | 'stakeCollateral' | 'borrowFromPool' | 'repayLoan' | 'claimRewards' | 'withdrawCollateral' | 'liquidatePosition' | 'getBorrowerPosition'>(path.resolve('../contracts/src/managed/LiquidityPool')),
    proofProvider: httpClientProofProvider(config.proofServer),
    walletProvider: walletAndMidnightProvider,
    midnightProvider: walletAndMidnightProvider,
  };

  const liquidityPoolContract = new LiquidityPool.Contract({});

  const deployedContract = await deployContract(providers as any, {
    contract: liquidityPoolContract,
    privateStateId: 'liquidity-pool-private-state',
    initialPrivateState: {},
  } as any);

  logger.info('✅ Liquidity Pool deployment successful!');
  logger.info(`📄 Contract Address: ${deployedContract.deployTxData.public.contractAddress}`);
  await logTransactionHashes('Liquidity Pool Deploy', deployedContract.deployTxData.public.txId, deployedContract.deployTxData.public.blockHeight);

  return deployedContract as any as DeployedLiquidityPoolContract;
};

// Initialize the liquidity pool
export const initializeLiquidityPool = async (
  contract: DeployedLiquidityPoolContract,
  testTokenAddr: any
): Promise<void> => {
  logger.info('🔧 Initializing Liquidity Pool...');
  
  const result = await contract.callTx.initialize(testTokenAddr);
  await logTransactionHashes('Liquidity Pool Initialize', result.public.txId, result.public.blockHeight);
};

// Provide liquidity to the pool
export const provideLiquidity = async (
  contract: DeployedLiquidityPoolContract,
  amount: bigint
): Promise<void> => {
  logger.info(`💧 Providing liquidity: ${amount} tokens...`);
  
  const result = await contract.callTx.provideLiquidity(amount);
  await logTransactionHashes('Provide Liquidity', result.public.txId, result.public.blockHeight);
  
  logger.info('✅ Liquidity provided successfully');
};

// Stake collateral for borrowing
export const stakeCollateral = async (
  contract: DeployedLiquidityPoolContract,
  amount: bigint,
  zkIdAddr: any
): Promise<void> => {
  logger.info(`🏦 Staking collateral: ${amount} tokens...`);
  
  const result = await contract.callTx.stakeCollateral(amount, zkIdAddr);
  await logTransactionHashes('Stake Collateral', result.public.txId, result.public.blockHeight);
  
  logger.info('✅ Collateral staked successfully');
};

// Borrow from the pool
export const borrowFromPool = async (
  contract: DeployedLiquidityPoolContract,
  amount: bigint
): Promise<void> => {
  logger.info(`💳 Borrowing from pool: ${amount} tokens...`);
  
  const result = await contract.callTx.borrowFromPool(amount);
  await logTransactionHashes('Borrow from Pool', result.public.txId, result.public.blockHeight);
  
  logger.info('✅ Loan borrowed successfully');
};

// Repay loan with interest
export const repayLoan = async (
  contract: DeployedLiquidityPoolContract,
  principal: bigint,
  interest: bigint
): Promise<void> => {
  logger.info(`💰 Repaying loan - Principal: ${principal}, Interest: ${interest}...`);
  
  const result = await contract.callTx.repayLoan(principal, interest);
  await logTransactionHashes('Repay Loan', result.public.txId, result.public.blockHeight);
  
  logger.info('✅ Loan repaid successfully');
};

// Get borrower position
export const getBorrowerPosition = async (
  contract: DeployedLiquidityPoolContract
): Promise<void> => {
  logger.info('📊 Getting borrower position...');
  
  const result = await contract.callTx.getBorrowerPosition();
  await logTransactionHashes('Get Borrower Position', result.public.txId, result.public.blockHeight);
  
  const [address, collateral, debt, healthFactor, isActive] = result.public.output;
  logger.info('📋 Borrower Position:');
  logger.info(`👤 Address: ${JSON.stringify(address)}`);
  logger.info(`🏦 Collateral: ${collateral}`);
  logger.info(`💳 Debt: ${debt}`);
  logger.info(`📈 Health Factor: ${healthFactor}`);
  logger.info(`🔒 Active: ${isActive}`);
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