// Client-side API for Midnight contracts
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider'
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider'
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider'
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider'
import {
  type BalancedTransaction,
  createBalancedTx,
  type MidnightProvider,
  type UnbalancedTransaction,
  type WalletProvider,
} from '@midnight-ntwrk/midnight-js-types'
import { type CoinInfo, nativeToken, Transaction, type TransactionId } from '@midnight-ntwrk/ledger'
import { Transaction as ZswapTransaction } from '@midnight-ntwrk/zswap'
import { getLedgerNetworkId, getZswapNetworkId } from '@midnight-ntwrk/midnight-js-network-id'
import path from 'node:path'

export interface ClientConfig {
  indexer: string
  indexerWS: string
  proofServer: string
  node: string
}

export interface WalletAPI {
  getUsedAddresses(): Promise<string[]>
  getChangeAddress(): Promise<string>
  balanceTransaction(tx: any, newCoins: CoinInfo[]): Promise<any>
  proveTransaction(tx: any): Promise<any>
  submitTransaction(tx: BalancedTransaction): Promise<TransactionId>
  state(): any
}

export const createWalletAndMidnightProvider = async (wallet: WalletAPI): Promise<WalletProvider & MidnightProvider> => {
  // For client-side, we'll need to adapt this to work with the browser wallet API
  // This is a simplified version - you may need to adjust based on your wallet API structure
  
  return {
    // These would need to be obtained from the wallet state
    coinPublicKey: "", // Placeholder - get from wallet
    encryptionPublicKey: "", // Placeholder - get from wallet
    
    balanceTx(tx: UnbalancedTransaction, newCoins: CoinInfo[]): Promise<BalancedTransaction> {
      return wallet
        .balanceTransaction(
          ZswapTransaction.deserialize(tx.serialize(getLedgerNetworkId()), getZswapNetworkId()),
          newCoins,
        )
        .then((tx) => wallet.proveTransaction(tx))
        .then((zswapTx) => Transaction.deserialize(zswapTx.serialize(getZswapNetworkId()), getLedgerNetworkId()))
        .then(createBalancedTx)
    },
    
    submitTx(tx: BalancedTransaction): Promise<TransactionId> {
      return wallet.submitTransaction(tx)
    },
  }
}

export const configureProviders = async (wallet: WalletAPI, config: ClientConfig) => {
  const walletAndMidnightProvider = await createWalletAndMidnightProvider(wallet)
  
  // For client-side, we'll use a different path resolution
  const liquidityPoolZkConfigPath = '/contracts/src/managed/LiquidityPool'
  
  return {
    privateStateProvider: levelPrivateStateProvider<never>({
      privateStateStoreName: 'liquiditypool-private-state',
    }),
    publicDataProvider: indexerPublicDataProvider(config.indexer, config.indexerWS),
    zkConfigProvider: new NodeZkConfigProvider<'initialize' | 'provideLiquidity' | 'stakeCollateral' | 'borrowFromPool' | 'repayLoan' | 'claimRewards' | 'withdrawCollateral' | 'liquidatePosition' | 'getBorrowerPosition' | 'getLiquidityProvider' | 'getPoolState' | 'calculateHealthFactor' | 'updateInterestRates' | 'pausePool' | 'unpausePool'>(liquidityPoolZkConfigPath),
    proofProvider: httpClientProofProvider(config.proofServer),
    walletProvider: walletAndMidnightProvider,
    midnightProvider: walletAndMidnightProvider,
  }
}
