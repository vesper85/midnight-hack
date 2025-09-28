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
    initialize: (testTokenAddr: { bytes: Uint8Array }) => Promise<any>;
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
  // Enhanced methods with logging
  provideLiquidityWithLogging: (amount: bigint) => Promise<any>;
  borrowWithLogging: (amount: bigint) => Promise<any>;
  withdrawWithLogging: (amount: bigint) => Promise<any>;
  stakeCollateralWithLogging: (amount: bigint, borrowerZkIdAddr: string) => Promise<any>;
  repayLoanWithLogging: (principal: bigint, interest: bigint) => Promise<any>;
};

export const deployLiquidityPool = async (
  wallet: Wallet & Resource,
  config: Config,
  testTokenAddress: string
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
  
  // Convert string address to the required format (ZswapCoinPublicKey expects exactly 32 bytes)
  const addressHex = testTokenAddress.replace('0x', '').trim();
  logger.info(`🔍 Address hex length: ${addressHex.length}, expected: 64`);
  
  // Extract the last 32 bytes (64 hex characters) to get the actual public key
  const keyHex = addressHex.slice(-64);
  logger.info(`🔍 Using last 64 chars as key: ${keyHex}`);
  
  const testTokenAddrBytes = { bytes: new Uint8Array(Buffer.from(keyHex, 'hex')) };
  logger.info(`🔍 Converted to ${testTokenAddrBytes.bytes.length} bytes`);
  
  const initTxResult = await deployedContract.callTx.initialize(testTokenAddrBytes);
  logger.info('✅ LiquidityPool initialization successful!');
  logger.info(`🔗 Init TX: ${initTxResult.public.txId}`);
  logger.info(`📦 Block Height: ${initTxResult.public.blockHeight}`);
  
  // Add enhanced logging methods
  const enhancedContract = deployedContract as any as DeployedLiquidityPoolContract;
  
  enhancedContract.provideLiquidityWithLogging = async (amount: bigint) => {
    logger.info(`💧 Providing ${amount} liquidity to pool...`);
    const txResult = await deployedContract.callTx.provideLiquidity(amount);
    await logTransactionHashes('Provide Liquidity', txResult.public.txId, txResult.public.blockHeight);
    logger.info(`✅ Provided ${amount} liquidity successfully!`);
    return txResult;
  };
  
  enhancedContract.borrowWithLogging = async (amount: bigint) => {
    logger.info(`💰 Borrowing ${amount} from pool...`);
    const txResult = await deployedContract.callTx.borrowFromPool(amount);
    await logTransactionHashes('Borrow', txResult.public.txId, txResult.public.blockHeight);
    logger.info(`✅ Borrowed ${amount} successfully!`);
    return txResult;
  };
  
  enhancedContract.withdrawWithLogging = async (amount: bigint) => {
    logger.info(`💸 Withdrawing ${amount} from pool...`);
    const txResult = await deployedContract.callTx.withdrawCollateral(amount);
    await logTransactionHashes('Withdraw', txResult.public.txId, txResult.public.blockHeight);
    logger.info(`✅ Withdrew ${amount} successfully!`);
    return txResult;
  };
  
  enhancedContract.stakeCollateralWithLogging = async (amount: bigint, borrowerZkIdAddr: string) => {
    logger.info(`🏦 Staking ${amount} collateral with ZkId: ${borrowerZkIdAddr}...`);
    
    // Convert string address to the required format (ZswapCoinPublicKey expects exactly 32 bytes)
    const addressHex = borrowerZkIdAddr.replace('0x', '').trim();
    const keyHex = addressHex.slice(-64); // Extract the last 32 bytes (64 hex characters)
    const zkIdAddrBytes = { bytes: new Uint8Array(Buffer.from(keyHex, 'hex')) };
    
    const txResult = await deployedContract.callTx.stakeCollateral(amount, zkIdAddrBytes);
    await logTransactionHashes('Stake Collateral', txResult.public.txId, txResult.public.blockHeight);
    logger.info(`✅ Staked ${amount} collateral successfully!`);
    return txResult;
  };
  
  enhancedContract.repayLoanWithLogging = async (principal: bigint, interest: bigint) => {
    logger.info(`💳 Repaying loan - Principal: ${principal}, Interest: ${interest}...`);
    const txResult = await deployedContract.callTx.repayLoan(principal, interest);
    await logTransactionHashes('Repay Loan', txResult.public.txId, txResult.public.blockHeight);
    logger.info(`✅ Repaid loan successfully! Total: ${principal + interest}`);
    return txResult;
  };
  
  return enhancedContract;
};

// Enhanced logging function that shows both CLI and blockchain hashes
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
