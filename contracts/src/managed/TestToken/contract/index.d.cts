import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<T> = {
}

export type ImpureCircuits<T> = {
  initialize(context: __compactRuntime.CircuitContext<T>,
             name_0: bigint,
             symbol_0: bigint,
             initialSupply_0: bigint): __compactRuntime.CircuitResults<T, []>;
  mint(context: __compactRuntime.CircuitContext<T>, amount_0: bigint): __compactRuntime.CircuitResults<T, []>;
  faucet(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
  burn(context: __compactRuntime.CircuitContext<T>, amount_0: bigint): __compactRuntime.CircuitResults<T, []>;
}

export type PureCircuits = {
}

export type Circuits<T> = {
  initialize(context: __compactRuntime.CircuitContext<T>,
             name_0: bigint,
             symbol_0: bigint,
             initialSupply_0: bigint): __compactRuntime.CircuitResults<T, []>;
  mint(context: __compactRuntime.CircuitContext<T>, amount_0: bigint): __compactRuntime.CircuitResults<T, []>;
  faucet(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
  burn(context: __compactRuntime.CircuitContext<T>, amount_0: bigint): __compactRuntime.CircuitResults<T, []>;
}

export type Ledger = {
  readonly tokenName: bigint;
  readonly tokenSymbol: bigint;
  readonly totalSupply: bigint;
  readonly owner: { bytes: Uint8Array };
  readonly ownerBalance: bigint;
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
