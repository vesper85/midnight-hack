import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<T> = {
}

export type ImpureCircuits<T> = {
  initialize(context: __compactRuntime.CircuitContext<T>,
             testTokenAddr_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<T, []>;
  provideLiquidity(context: __compactRuntime.CircuitContext<T>, amount_0: bigint): __compactRuntime.CircuitResults<T, []>;
  stakeCollateral(context: __compactRuntime.CircuitContext<T>,
                  amount_0: bigint,
                  borrowerZkIdAddr_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<T, []>;
  borrowFromPool(context: __compactRuntime.CircuitContext<T>, amount_0: bigint): __compactRuntime.CircuitResults<T, []>;
  repayLoan(context: __compactRuntime.CircuitContext<T>,
            principal_0: bigint,
            interest_0: bigint): __compactRuntime.CircuitResults<T, []>;
  claimRewards(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, [bigint]>;
  withdrawCollateral(context: __compactRuntime.CircuitContext<T>,
                     amount_0: bigint): __compactRuntime.CircuitResults<T, []>;
  liquidatePosition(context: __compactRuntime.CircuitContext<T>,
                    liquidationAmount_0: bigint): __compactRuntime.CircuitResults<T, [boolean]>;
  getBorrowerPosition(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, [{ bytes: Uint8Array
                                                                                                        },
                                                                                                        bigint,
                                                                                                        bigint,
                                                                                                        bigint,
                                                                                                        boolean]>;
  getLiquidityProvider(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, [{ bytes: Uint8Array
                                                                                                         },
                                                                                                         bigint,
                                                                                                         bigint,
                                                                                                         bigint,
                                                                                                         boolean]>;
  getPoolState(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, [bigint,
                                                                                                 bigint,
                                                                                                 bigint,
                                                                                                 bigint,
                                                                                                 bigint,
                                                                                                 bigint,
                                                                                                 boolean]>;
  calculateHealthFactor(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, [bigint]>;
  updateInterestRates(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
  pausePool(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
  unpausePool(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
}

export type PureCircuits = {
}

export type Circuits<T> = {
  initialize(context: __compactRuntime.CircuitContext<T>,
             testTokenAddr_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<T, []>;
  provideLiquidity(context: __compactRuntime.CircuitContext<T>, amount_0: bigint): __compactRuntime.CircuitResults<T, []>;
  stakeCollateral(context: __compactRuntime.CircuitContext<T>,
                  amount_0: bigint,
                  borrowerZkIdAddr_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<T, []>;
  borrowFromPool(context: __compactRuntime.CircuitContext<T>, amount_0: bigint): __compactRuntime.CircuitResults<T, []>;
  repayLoan(context: __compactRuntime.CircuitContext<T>,
            principal_0: bigint,
            interest_0: bigint): __compactRuntime.CircuitResults<T, []>;
  claimRewards(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, [bigint]>;
  withdrawCollateral(context: __compactRuntime.CircuitContext<T>,
                     amount_0: bigint): __compactRuntime.CircuitResults<T, []>;
  liquidatePosition(context: __compactRuntime.CircuitContext<T>,
                    liquidationAmount_0: bigint): __compactRuntime.CircuitResults<T, [boolean]>;
  getBorrowerPosition(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, [{ bytes: Uint8Array
                                                                                                        },
                                                                                                        bigint,
                                                                                                        bigint,
                                                                                                        bigint,
                                                                                                        boolean]>;
  getLiquidityProvider(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, [{ bytes: Uint8Array
                                                                                                         },
                                                                                                         bigint,
                                                                                                         bigint,
                                                                                                         bigint,
                                                                                                         boolean]>;
  getPoolState(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, [bigint,
                                                                                                 bigint,
                                                                                                 bigint,
                                                                                                 bigint,
                                                                                                 bigint,
                                                                                                 bigint,
                                                                                                 boolean]>;
  calculateHealthFactor(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, [bigint]>;
  updateInterestRates(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
  pausePool(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
  unpausePool(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
}

export type Ledger = {
  readonly poolOwner: { bytes: Uint8Array };
  readonly testTokenContract: { bytes: Uint8Array };
  readonly zkIdContract: { bytes: Uint8Array };
  readonly totalLiquidity: bigint;
  readonly totalBorrowed: bigint;
  readonly totalCollateral: bigint;
  readonly availableLiquidity: bigint;
  readonly totalRewards: bigint;
  readonly interestRate: bigint;
  readonly collateralRatio: bigint;
  readonly liquidationThreshold: bigint;
  readonly isPoolActive: boolean;
  readonly borrowerAddress: { bytes: Uint8Array };
  readonly borrowerCollateral: bigint;
  readonly borrowerDebt: bigint;
  readonly borrowerHealthFactor: bigint;
  readonly borrowerZkId: { bytes: Uint8Array };
  readonly isBorrowerActive: boolean;
  readonly providerAddress: { bytes: Uint8Array };
  readonly providerLiquidity: bigint;
  readonly providerRewards: bigint;
  readonly providerSharePercentage: bigint;
  readonly isProviderActive: boolean;
  readonly poolTokenBalance: bigint;
  readonly userTokenBalance: bigint;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<T, W extends Witnesses<T> = Witnesses<T>> {
  witnesses: W;
  circuits: Circuits<T>;
  impureCircuits: ImpureCircuits<T>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<T>): __compactRuntime.ConstructorResult<T>;
}

export declare function ledger(state: __compactRuntime.StateValue): Ledger;
export declare const pureCircuits: PureCircuits;
