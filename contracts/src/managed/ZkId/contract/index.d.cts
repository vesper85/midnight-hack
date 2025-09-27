import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<T> = {
}

export type ImpureCircuits<T> = {
  initialize(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
  issueZkId(context: __compactRuntime.CircuitContext<T>,
            to_0: { bytes: Uint8Array },
            nameHash_0: bigint,
            emailHash_0: bigint,
            addressHash_0: bigint,
            isKYC_0: boolean,
            creditScoreValue_0: bigint): __compactRuntime.CircuitResults<T, [bigint]>;
  verifyZkId(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, [boolean]>;
  getZkIdInfo(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, [bigint,
                                                                                                { bytes: Uint8Array
                                                                                                },
                                                                                                boolean,
                                                                                                bigint]>;
  deactivateZkId(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
  revealIdentityForLiquidation(context: __compactRuntime.CircuitContext<T>,
                               debtCollector_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<T, [bigint,
                                                                                                            bigint,
                                                                                                            bigint,
                                                                                                            boolean,
                                                                                                            bigint]>;
  checkIdentityRevealed(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, [boolean,
                                                                                                          { bytes: Uint8Array
                                                                                                          }]>;
  getCreditScore(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, [bigint]>;
  updateCreditScore(context: __compactRuntime.CircuitContext<T>,
                    newScore_0: bigint): __compactRuntime.CircuitResults<T, []>;
}

export type PureCircuits = {
}

export type Circuits<T> = {
  initialize(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
  issueZkId(context: __compactRuntime.CircuitContext<T>,
            to_0: { bytes: Uint8Array },
            nameHash_0: bigint,
            emailHash_0: bigint,
            addressHash_0: bigint,
            isKYC_0: boolean,
            creditScoreValue_0: bigint): __compactRuntime.CircuitResults<T, [bigint]>;
  verifyZkId(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, [boolean]>;
  getZkIdInfo(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, [bigint,
                                                                                                { bytes: Uint8Array
                                                                                                },
                                                                                                boolean,
                                                                                                bigint]>;
  deactivateZkId(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
  revealIdentityForLiquidation(context: __compactRuntime.CircuitContext<T>,
                               debtCollector_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<T, [bigint,
                                                                                                            bigint,
                                                                                                            bigint,
                                                                                                            boolean,
                                                                                                            bigint]>;
  checkIdentityRevealed(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, [boolean,
                                                                                                          { bytes: Uint8Array
                                                                                                          }]>;
  getCreditScore(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, [bigint]>;
  updateCreditScore(context: __compactRuntime.CircuitContext<T>,
                    newScore_0: bigint): __compactRuntime.CircuitResults<T, []>;
}

export type Ledger = {
  readonly zkIdCounter: bigint;
  readonly isIssuerAuthorized: boolean;
  readonly authorizedIssuer: { bytes: Uint8Array };
  readonly currentZkId: bigint;
  readonly zkIdOwner: { bytes: Uint8Array };
  readonly zkIdIssuer: { bytes: Uint8Array };
  readonly isZkIdActive: boolean;
  readonly zkIdIssuedAt: bigint;
  readonly privateName: bigint;
  readonly privateEmail: bigint;
  readonly privateAddress: bigint;
  readonly isKYCVerified: boolean;
  readonly creditScore: bigint;
  readonly metadataTimestamp: bigint;
  readonly isIdentityRevealed: boolean;
  readonly revealedToCollector: { bytes: Uint8Array };
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
