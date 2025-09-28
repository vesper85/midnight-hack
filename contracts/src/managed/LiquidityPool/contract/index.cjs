'use strict';
const __compactRuntime = require('@midnight-ntwrk/compact-runtime');
const expectedRuntimeVersionString = '0.8.1';
const expectedRuntimeVersion = expectedRuntimeVersionString.split('-')[0].split('.').map(Number);
const actualRuntimeVersion = __compactRuntime.versionString.split('-')[0].split('.').map(Number);
if (expectedRuntimeVersion[0] != actualRuntimeVersion[0]
     || (actualRuntimeVersion[0] == 0 && expectedRuntimeVersion[1] != actualRuntimeVersion[1])
     || expectedRuntimeVersion[1] > actualRuntimeVersion[1]
     || (expectedRuntimeVersion[1] == actualRuntimeVersion[1] && expectedRuntimeVersion[2] > actualRuntimeVersion[2]))
   throw new __compactRuntime.CompactError(`Version mismatch: compiled code expects ${expectedRuntimeVersionString}, runtime is ${__compactRuntime.versionString}`);
{ const MAX_FIELD = 52435875175126190479447740508185965837690552500527637822603658699938581184512n;
  if (__compactRuntime.MAX_FIELD !== MAX_FIELD)
     throw new __compactRuntime.CompactError(`compiler thinks maximum field value is ${MAX_FIELD}; run time thinks it is ${__compactRuntime.MAX_FIELD}`)
}

const _descriptor_0 = new __compactRuntime.CompactTypeBytes(32);

class _ZswapCoinPublicKey_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_1 = new _ZswapCoinPublicKey_0();

const _descriptor_2 = new __compactRuntime.CompactTypeBoolean();

const _descriptor_3 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

const _descriptor_4 = new __compactRuntime.CompactTypeUnsignedInteger(4294967295n, 4);

class _tuple_0 {
  alignment() {
    return _descriptor_4.alignment();
  }
  fromValue(value_0) {
    return [
      _descriptor_4.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0[0]);
  }
}

const _descriptor_5 = new _tuple_0();

class _tuple_1 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_4.alignment().concat(_descriptor_2.alignment()))));
  }
  fromValue(value_0) {
    return [
      _descriptor_1.fromValue(value_0),
      _descriptor_3.fromValue(value_0),
      _descriptor_3.fromValue(value_0),
      _descriptor_4.fromValue(value_0),
      _descriptor_2.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0[0]).concat(_descriptor_3.toValue(value_0[1]).concat(_descriptor_3.toValue(value_0[2]).concat(_descriptor_4.toValue(value_0[3]).concat(_descriptor_2.toValue(value_0[4])))));
  }
}

const _descriptor_6 = new _tuple_1();

class _tuple_2 {
  alignment() {
    return _descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_4.alignment().concat(_descriptor_2.alignment()))))));
  }
  fromValue(value_0) {
    return [
      _descriptor_3.fromValue(value_0),
      _descriptor_3.fromValue(value_0),
      _descriptor_3.fromValue(value_0),
      _descriptor_3.fromValue(value_0),
      _descriptor_3.fromValue(value_0),
      _descriptor_4.fromValue(value_0),
      _descriptor_2.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0[0]).concat(_descriptor_3.toValue(value_0[1]).concat(_descriptor_3.toValue(value_0[2]).concat(_descriptor_3.toValue(value_0[3]).concat(_descriptor_3.toValue(value_0[4]).concat(_descriptor_4.toValue(value_0[5]).concat(_descriptor_2.toValue(value_0[6])))))));
  }
}

const _descriptor_7 = new _tuple_2();

class _tuple_3 {
  alignment() {
    return _descriptor_2.alignment();
  }
  fromValue(value_0) {
    return [
      _descriptor_2.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0[0]);
  }
}

const _descriptor_8 = new _tuple_3();

class _tuple_4 {
  alignment() {
    return _descriptor_3.alignment();
  }
  fromValue(value_0) {
    return [
      _descriptor_3.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0[0]);
  }
}

const _descriptor_9 = new _tuple_4();

const _descriptor_10 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

class _ContractAddress_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_11 = new _ContractAddress_0();

const _descriptor_12 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      initialize: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`initialize: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const testTokenAddr_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('initialize',
                                      'argument 1 (as invoked from Typescript)',
                                      'LiquidityPool.compact line 41 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(testTokenAddr_0) === 'object' && testTokenAddr_0.bytes.buffer instanceof ArrayBuffer && testTokenAddr_0.bytes.BYTES_PER_ELEMENT === 1 && testTokenAddr_0.bytes.length === 32)) {
          __compactRuntime.type_error('initialize',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'LiquidityPool.compact line 41 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      testTokenAddr_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(testTokenAddr_0),
            alignment: _descriptor_1.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._initialize_0(context,
                                            partialProofData,
                                            testTokenAddr_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      provideLiquidity: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`provideLiquidity: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const amount_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('provideLiquidity',
                                      'argument 1 (as invoked from Typescript)',
                                      'LiquidityPool.compact line 66 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.type_error('provideLiquidity',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'LiquidityPool.compact line 66 char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      amount_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(amount_0),
            alignment: _descriptor_3.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._provideLiquidity_0(context,
                                                  partialProofData,
                                                  amount_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      stakeCollateral: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`stakeCollateral: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const amount_0 = args_1[1];
        const borrowerZkIdAddr_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('stakeCollateral',
                                      'argument 1 (as invoked from Typescript)',
                                      'LiquidityPool.compact line 98 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.type_error('stakeCollateral',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'LiquidityPool.compact line 98 char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      amount_0)
        }
        if (!(typeof(borrowerZkIdAddr_0) === 'object' && borrowerZkIdAddr_0.bytes.buffer instanceof ArrayBuffer && borrowerZkIdAddr_0.bytes.BYTES_PER_ELEMENT === 1 && borrowerZkIdAddr_0.bytes.length === 32)) {
          __compactRuntime.type_error('stakeCollateral',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'LiquidityPool.compact line 98 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      borrowerZkIdAddr_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(amount_0).concat(_descriptor_1.toValue(borrowerZkIdAddr_0)),
            alignment: _descriptor_3.alignment().concat(_descriptor_1.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._stakeCollateral_0(context,
                                                 partialProofData,
                                                 amount_0,
                                                 borrowerZkIdAddr_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      borrowFromPool: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`borrowFromPool: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const amount_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('borrowFromPool',
                                      'argument 1 (as invoked from Typescript)',
                                      'LiquidityPool.compact line 133 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.type_error('borrowFromPool',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'LiquidityPool.compact line 133 char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      amount_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(amount_0),
            alignment: _descriptor_3.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._borrowFromPool_0(context,
                                                partialProofData,
                                                amount_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      repayLoan: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`repayLoan: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const principal_0 = args_1[1];
        const interest_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('repayLoan',
                                      'argument 1 (as invoked from Typescript)',
                                      'LiquidityPool.compact line 176 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(principal_0) === 'bigint' && principal_0 >= 0n && principal_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.type_error('repayLoan',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'LiquidityPool.compact line 176 char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      principal_0)
        }
        if (!(typeof(interest_0) === 'bigint' && interest_0 >= 0n && interest_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.type_error('repayLoan',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'LiquidityPool.compact line 176 char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      interest_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(principal_0).concat(_descriptor_3.toValue(interest_0)),
            alignment: _descriptor_3.alignment().concat(_descriptor_3.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._repayLoan_0(context,
                                           partialProofData,
                                           principal_0,
                                           interest_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      claimRewards: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`claimRewards: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('claimRewards',
                                      'argument 1 (as invoked from Typescript)',
                                      'LiquidityPool.compact line 202 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._claimRewards_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_9.toValue(result_0), alignment: _descriptor_9.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      withdrawCollateral: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`withdrawCollateral: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const amount_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('withdrawCollateral',
                                      'argument 1 (as invoked from Typescript)',
                                      'LiquidityPool.compact line 225 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.type_error('withdrawCollateral',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'LiquidityPool.compact line 225 char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      amount_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(amount_0),
            alignment: _descriptor_3.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._withdrawCollateral_0(context,
                                                    partialProofData,
                                                    amount_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      liquidatePosition: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`liquidatePosition: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const liquidationAmount_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('liquidatePosition',
                                      'argument 1 (as invoked from Typescript)',
                                      'LiquidityPool.compact line 245 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(liquidationAmount_0) === 'bigint' && liquidationAmount_0 >= 0n && liquidationAmount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.type_error('liquidatePosition',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'LiquidityPool.compact line 245 char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      liquidationAmount_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(liquidationAmount_0),
            alignment: _descriptor_3.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._liquidatePosition_0(context,
                                                   partialProofData,
                                                   liquidationAmount_0);
        partialProofData.output = { value: _descriptor_8.toValue(result_0), alignment: _descriptor_8.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      getBorrowerPosition: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`getBorrowerPosition: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('getBorrowerPosition',
                                      'argument 1 (as invoked from Typescript)',
                                      'LiquidityPool.compact line 278 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._getBorrowerPosition_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_6.toValue(result_0), alignment: _descriptor_6.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      getLiquidityProvider: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`getLiquidityProvider: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('getLiquidityProvider',
                                      'argument 1 (as invoked from Typescript)',
                                      'LiquidityPool.compact line 283 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._getLiquidityProvider_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_6.toValue(result_0), alignment: _descriptor_6.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      getPoolState: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`getPoolState: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('getPoolState',
                                      'argument 1 (as invoked from Typescript)',
                                      'LiquidityPool.compact line 288 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._getPoolState_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_7.toValue(result_0), alignment: _descriptor_7.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      calculateHealthFactor: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`calculateHealthFactor: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('calculateHealthFactor',
                                      'argument 1 (as invoked from Typescript)',
                                      'LiquidityPool.compact line 293 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._calculateHealthFactor_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_5.toValue(result_0), alignment: _descriptor_5.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      updateInterestRates: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`updateInterestRates: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('updateInterestRates',
                                      'argument 1 (as invoked from Typescript)',
                                      'LiquidityPool.compact line 310 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._updateInterestRates_0(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      pausePool: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`pausePool: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('pausePool',
                                      'argument 1 (as invoked from Typescript)',
                                      'LiquidityPool.compact line 327 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._pausePool_0(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      unpausePool: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`unpausePool: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('unpausePool',
                                      'argument 1 (as invoked from Typescript)',
                                      'LiquidityPool.compact line 332 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._unpausePool_0(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      }
    };
    this.impureCircuits = {
      initialize: this.circuits.initialize,
      provideLiquidity: this.circuits.provideLiquidity,
      stakeCollateral: this.circuits.stakeCollateral,
      borrowFromPool: this.circuits.borrowFromPool,
      repayLoan: this.circuits.repayLoan,
      claimRewards: this.circuits.claimRewards,
      withdrawCollateral: this.circuits.withdrawCollateral,
      liquidatePosition: this.circuits.liquidatePosition,
      getBorrowerPosition: this.circuits.getBorrowerPosition,
      getLiquidityProvider: this.circuits.getLiquidityProvider,
      getPoolState: this.circuits.getPoolState,
      calculateHealthFactor: this.circuits.calculateHealthFactor,
      updateInterestRates: this.circuits.updateInterestRates,
      pausePool: this.circuits.pausePool,
      unpausePool: this.circuits.unpausePool
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    let stateValue_2 = __compactRuntime.StateValue.newArray();
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(stateValue_2);
    let stateValue_1 = __compactRuntime.StateValue.newArray();
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(stateValue_1);
    state_0.data = stateValue_0;
    state_0.setOperation('initialize', new __compactRuntime.ContractOperation());
    state_0.setOperation('provideLiquidity', new __compactRuntime.ContractOperation());
    state_0.setOperation('stakeCollateral', new __compactRuntime.ContractOperation());
    state_0.setOperation('borrowFromPool', new __compactRuntime.ContractOperation());
    state_0.setOperation('repayLoan', new __compactRuntime.ContractOperation());
    state_0.setOperation('claimRewards', new __compactRuntime.ContractOperation());
    state_0.setOperation('withdrawCollateral', new __compactRuntime.ContractOperation());
    state_0.setOperation('liquidatePosition', new __compactRuntime.ContractOperation());
    state_0.setOperation('getBorrowerPosition', new __compactRuntime.ContractOperation());
    state_0.setOperation('getLiquidityProvider', new __compactRuntime.ContractOperation());
    state_0.setOperation('getPoolState', new __compactRuntime.ContractOperation());
    state_0.setOperation('calculateHealthFactor', new __compactRuntime.ContractOperation());
    state_0.setOperation('updateInterestRates', new __compactRuntime.ContractOperation());
    state_0.setOperation('pausePool', new __compactRuntime.ContractOperation());
    state_0.setOperation('unpausePool', new __compactRuntime.ContractOperation());
    const context = {
      originalState: state_0,
      currentPrivateState: constructorContext_0.initialPrivateState,
      currentZswapLocalState: constructorContext_0.initialZswapLocalState,
      transactionContext: new __compactRuntime.QueryContext(state_0.data, __compactRuntime.dummyContractAddress())
    };
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(0n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue({ bytes: new Uint8Array(32) }),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(1n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue({ bytes: new Uint8Array(32) }),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(2n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue({ bytes: new Uint8Array(32) }),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(3n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(4n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(5n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(6n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(7n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(8n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(0n),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(9n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(0n),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(0n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(0n),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(1n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(false),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(2n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue({ bytes: new Uint8Array(32) }),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(3n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(4n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(5n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(0n),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(6n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue({ bytes: new Uint8Array(32) }),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(7n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(false),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(8n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue({ bytes: new Uint8Array(32) }),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(9n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(10n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(11n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(0n),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(12n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(false),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(13n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(14n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    state_0.data = context.transactionContext.state;
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  _ownPublicKey_0(context, partialProofData) {
    const result_0 = __compactRuntime.ownPublicKey(context);
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_1.toValue(result_0),
      alignment: _descriptor_1.alignment()
    });
    return result_0;
  }
  _initialize_0(context, partialProofData, testTokenAddr_0) {
    const tmp_0 = this._ownPublicKey_0(context, partialProofData);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(0n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tmp_0),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(1n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(testTokenAddr_0),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_1 = 0n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(3n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_1),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_2 = 0n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(4n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_2),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_3 = 0n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(5n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_3),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_4 = 0n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(6n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_4),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_5 = 0n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(7n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_5),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_6 = 500n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(8n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_6),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_7 = 150n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(9n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_7),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_8 = 120n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(0n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_8),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(1n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(true),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(7n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(false),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(12n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(false),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_9 = 0n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(13n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_9),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_10 = 0n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(14n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_10),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _provideLiquidity_0(context, partialProofData, amount_0) {
    const provider_0 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime.assert(amount_0 > 0n, 'Amount must be greater than 0');
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                                alignment: _descriptor_12.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }]).value)
                            ===
                            true,
                            'Pool is not active');
    __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                                alignment: _descriptor_12.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(14n),
                                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }]).value)
                            >=
                            amount_0,
                            'Insufficient user balance for liquidity provision');
    let t_0;
    const newUserBalance_0 = (t_0 = _descriptor_3.fromValue(Contract._query(context,
                                                                            partialProofData,
                                                                            [
                                                                             { dup: { n: 0 } },
                                                                             { idx: { cached: false,
                                                                                      pushPath: false,
                                                                                      path: [
                                                                                             { tag: 'value',
                                                                                               value: { value: _descriptor_12.toValue(1n),
                                                                                                        alignment: _descriptor_12.alignment() } },
                                                                                             { tag: 'value',
                                                                                               value: { value: _descriptor_12.toValue(14n),
                                                                                                        alignment: _descriptor_12.alignment() } }] } },
                                                                             { popeq: { cached: false,
                                                                                        result: undefined } }]).value),
                              (__compactRuntime.assert(!(t_0 < amount_0),
                                                       'result of subtraction would be negative'),
                               t_0 - amount_0));
    const newPoolBalance_0 = ((t1) => {
                               if (t1 > 340282366920938463463374607431768211455n) {
                                 throw new __compactRuntime.CompactError('LiquidityPool.compact line 80 char 26: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                               }
                               return t1;
                             })(_descriptor_3.fromValue(Contract._query(context,
                                                                        partialProofData,
                                                                        [
                                                                         { dup: { n: 0 } },
                                                                         { idx: { cached: false,
                                                                                  pushPath: false,
                                                                                  path: [
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_12.toValue(1n),
                                                                                                    alignment: _descriptor_12.alignment() } },
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_12.toValue(13n),
                                                                                                    alignment: _descriptor_12.alignment() } }] } },
                                                                         { popeq: { cached: false,
                                                                                    result: undefined } }]).value)
                                +
                                amount_0);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(14n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(newUserBalance_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(13n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(newPoolBalance_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(8n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(provider_0),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_0 = ((t1) => {
                    if (t1 > 340282366920938463463374607431768211455n) {
                      throw new __compactRuntime.CompactError('LiquidityPool.compact line 88 char 32: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                    }
                    return t1;
                  })(_descriptor_3.fromValue(Contract._query(context,
                                                             partialProofData,
                                                             [
                                                              { dup: { n: 0 } },
                                                              { idx: { cached: false,
                                                                       pushPath: false,
                                                                       path: [
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_12.toValue(1n),
                                                                                         alignment: _descriptor_12.alignment() } },
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_12.toValue(9n),
                                                                                         alignment: _descriptor_12.alignment() } }] } },
                                                              { popeq: { cached: false,
                                                                         result: undefined } }]).value)
                     +
                     amount_0);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(9n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_1 = 100n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(11n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_1),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(12n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(true),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_2 = ((t1) => {
                    if (t1 > 340282366920938463463374607431768211455n) {
                      throw new __compactRuntime.CompactError('LiquidityPool.compact line 93 char 29: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                    }
                    return t1;
                  })(_descriptor_3.fromValue(Contract._query(context,
                                                             partialProofData,
                                                             [
                                                              { dup: { n: 0 } },
                                                              { idx: { cached: false,
                                                                       pushPath: false,
                                                                       path: [
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_12.toValue(0n),
                                                                                         alignment: _descriptor_12.alignment() } },
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_12.toValue(3n),
                                                                                         alignment: _descriptor_12.alignment() } }] } },
                                                              { popeq: { cached: false,
                                                                         result: undefined } }]).value)
                     +
                     amount_0);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(3n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_2),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_3 = ((t1) => {
                    if (t1 > 340282366920938463463374607431768211455n) {
                      throw new __compactRuntime.CompactError('LiquidityPool.compact line 94 char 33: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                    }
                    return t1;
                  })(_descriptor_3.fromValue(Contract._query(context,
                                                             partialProofData,
                                                             [
                                                              { dup: { n: 0 } },
                                                              { idx: { cached: false,
                                                                       pushPath: false,
                                                                       path: [
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_12.toValue(0n),
                                                                                         alignment: _descriptor_12.alignment() } },
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_12.toValue(6n),
                                                                                         alignment: _descriptor_12.alignment() } }] } },
                                                              { popeq: { cached: false,
                                                                         result: undefined } }]).value)
                     +
                     amount_0);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(6n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_3),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _stakeCollateral_0(context, partialProofData, amount_0, borrowerZkIdAddr_0) {
    const borrower_0 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime.assert(amount_0 > 0n,
                            'Collateral amount must be greater than 0');
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                                alignment: _descriptor_12.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }]).value)
                            ===
                            true,
                            'Pool is not active');
    __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                                alignment: _descriptor_12.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(14n),
                                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }]).value)
                            >=
                            amount_0,
                            'Insufficient user balance for collateral');
    let t_0;
    const newUserBalance_0 = (t_0 = _descriptor_3.fromValue(Contract._query(context,
                                                                            partialProofData,
                                                                            [
                                                                             { dup: { n: 0 } },
                                                                             { idx: { cached: false,
                                                                                      pushPath: false,
                                                                                      path: [
                                                                                             { tag: 'value',
                                                                                               value: { value: _descriptor_12.toValue(1n),
                                                                                                        alignment: _descriptor_12.alignment() } },
                                                                                             { tag: 'value',
                                                                                               value: { value: _descriptor_12.toValue(14n),
                                                                                                        alignment: _descriptor_12.alignment() } }] } },
                                                                             { popeq: { cached: false,
                                                                                        result: undefined } }]).value),
                              (__compactRuntime.assert(!(t_0 < amount_0),
                                                       'result of subtraction would be negative'),
                               t_0 - amount_0));
    const newPoolBalance_0 = ((t1) => {
                               if (t1 > 340282366920938463463374607431768211455n) {
                                 throw new __compactRuntime.CompactError('LiquidityPool.compact line 115 char 26: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                               }
                               return t1;
                             })(_descriptor_3.fromValue(Contract._query(context,
                                                                        partialProofData,
                                                                        [
                                                                         { dup: { n: 0 } },
                                                                         { idx: { cached: false,
                                                                                  pushPath: false,
                                                                                  path: [
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_12.toValue(1n),
                                                                                                    alignment: _descriptor_12.alignment() } },
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_12.toValue(13n),
                                                                                                    alignment: _descriptor_12.alignment() } }] } },
                                                                         { popeq: { cached: false,
                                                                                    result: undefined } }]).value)
                                +
                                amount_0);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(14n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(newUserBalance_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(13n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(newPoolBalance_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(2n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(borrower_0),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_0 = ((t1) => {
                    if (t1 > 340282366920938463463374607431768211455n) {
                      throw new __compactRuntime.CompactError('LiquidityPool.compact line 123 char 33: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                    }
                    return t1;
                  })(_descriptor_3.fromValue(Contract._query(context,
                                                             partialProofData,
                                                             [
                                                              { dup: { n: 0 } },
                                                              { idx: { cached: false,
                                                                       pushPath: false,
                                                                       path: [
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_12.toValue(1n),
                                                                                         alignment: _descriptor_12.alignment() } },
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_12.toValue(3n),
                                                                                         alignment: _descriptor_12.alignment() } }] } },
                                                              { popeq: { cached: false,
                                                                         result: undefined } }]).value)
                     +
                     amount_0);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(3n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(6n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(borrowerZkIdAddr_0),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_1 = 999n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(5n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_1),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(7n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(true),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_2 = ((t1) => {
                    if (t1 > 340282366920938463463374607431768211455n) {
                      throw new __compactRuntime.CompactError('LiquidityPool.compact line 129 char 30: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                    }
                    return t1;
                  })(_descriptor_3.fromValue(Contract._query(context,
                                                             partialProofData,
                                                             [
                                                              { dup: { n: 0 } },
                                                              { idx: { cached: false,
                                                                       pushPath: false,
                                                                       path: [
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_12.toValue(0n),
                                                                                         alignment: _descriptor_12.alignment() } },
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_12.toValue(5n),
                                                                                         alignment: _descriptor_12.alignment() } }] } },
                                                              { popeq: { cached: false,
                                                                         result: undefined } }]).value)
                     +
                     amount_0);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(5n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_2),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _borrowFromPool_0(context, partialProofData, amount_0) {
    const borrower_0 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime.assert(amount_0 > 0n,
                            'Borrow amount must be greater than 0');
    __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(0n),
                                                                                                alignment: _descriptor_12.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(6n),
                                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }]).value)
                            >=
                            amount_0,
                            'Insufficient liquidity in pool');
    __compactRuntime.assert(this._equal_0(borrower_0,
                                          _descriptor_1.fromValue(Contract._query(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 0 } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_12.toValue(1n),
                                                                                                              alignment: _descriptor_12.alignment() } },
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_12.toValue(2n),
                                                                                                              alignment: _descriptor_12.alignment() } }] } },
                                                                                   { popeq: { cached: false,
                                                                                              result: undefined } }]).value)),
                            'Only staked borrower can borrow');
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                                alignment: _descriptor_12.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(7n),
                                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }]).value)
                            ===
                            true,
                            'No active collateral position');
    const newTotalDebt_0 = ((t1) => {
                             if (t1 > 340282366920938463463374607431768211455n) {
                               throw new __compactRuntime.CompactError('LiquidityPool.compact line 142 char 24: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                             }
                             return t1;
                           })(_descriptor_3.fromValue(Contract._query(context,
                                                                      partialProofData,
                                                                      [
                                                                       { dup: { n: 0 } },
                                                                       { idx: { cached: false,
                                                                                pushPath: false,
                                                                                path: [
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_12.toValue(1n),
                                                                                                  alignment: _descriptor_12.alignment() } },
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_12.toValue(4n),
                                                                                                  alignment: _descriptor_12.alignment() } }] } },
                                                                       { popeq: { cached: false,
                                                                                  result: undefined } }]).value)
                              +
                              amount_0);
    const requiredCollateral_0 = ((t1) => {
                                   if (t1 > 340282366920938463463374607431768211455n) {
                                     throw new __compactRuntime.CompactError('LiquidityPool.compact line 143 char 30: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                                   }
                                   return t1;
                                 })(newTotalDebt_0 + newTotalDebt_0);
    __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                                alignment: _descriptor_12.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(3n),
                                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }]).value)
                            >=
                            requiredCollateral_0,
                            'Insufficient collateral');
    const collateralValue_0 = ((t1) => {
                                if (t1 > 340282366920938463463374607431768211455n) {
                                  throw new __compactRuntime.CompactError('LiquidityPool.compact line 148 char 27: cast from field value to Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                                }
                                return t1;
                              })(__compactRuntime.mulField(_descriptor_3.fromValue(Contract._query(context,
                                                                                                   partialProofData,
                                                                                                   [
                                                                                                    { dup: { n: 0 } },
                                                                                                    { idx: { cached: false,
                                                                                                             pushPath: false,
                                                                                                             path: [
                                                                                                                    { tag: 'value',
                                                                                                                      value: { value: _descriptor_12.toValue(1n),
                                                                                                                               alignment: _descriptor_12.alignment() } },
                                                                                                                    { tag: 'value',
                                                                                                                      value: { value: _descriptor_12.toValue(3n),
                                                                                                                               alignment: _descriptor_12.alignment() } }] } },
                                                                                                    { popeq: { cached: false,
                                                                                                               result: undefined } }]).value),
                                                           100n));
    const debtThreshold_0 = ((t1) => {
                              if (t1 > 340282366920938463463374607431768211455n) {
                                throw new __compactRuntime.CompactError('LiquidityPool.compact line 149 char 25: cast from field value to Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                              }
                              return t1;
                            })(__compactRuntime.mulField(newTotalDebt_0, 120n));
    __compactRuntime.assert(collateralValue_0 > debtThreshold_0,
                            'Health factor too low');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(4n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(newTotalDebt_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_0 = 150n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(5n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_0),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_1 = ((t1) => {
                    if (t1 > 340282366920938463463374607431768211455n) {
                      throw new __compactRuntime.CompactError('LiquidityPool.compact line 157 char 28: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                    }
                    return t1;
                  })(_descriptor_3.fromValue(Contract._query(context,
                                                             partialProofData,
                                                             [
                                                              { dup: { n: 0 } },
                                                              { idx: { cached: false,
                                                                       pushPath: false,
                                                                       path: [
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_12.toValue(0n),
                                                                                         alignment: _descriptor_12.alignment() } },
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_12.toValue(4n),
                                                                                         alignment: _descriptor_12.alignment() } }] } },
                                                              { popeq: { cached: false,
                                                                         result: undefined } }]).value)
                     +
                     amount_0);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(4n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_1),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    let t_0;
    const tmp_2 = (t_0 = _descriptor_3.fromValue(Contract._query(context,
                                                                 partialProofData,
                                                                 [
                                                                  { dup: { n: 0 } },
                                                                  { idx: { cached: false,
                                                                           pushPath: false,
                                                                           path: [
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_12.toValue(0n),
                                                                                             alignment: _descriptor_12.alignment() } },
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_12.toValue(6n),
                                                                                             alignment: _descriptor_12.alignment() } }] } },
                                                                  { popeq: { cached: false,
                                                                             result: undefined } }]).value),
                   (__compactRuntime.assert(!(t_0 < amount_0),
                                            'result of subtraction would be negative'),
                    t_0 - amount_0));
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(6n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_2),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                                alignment: _descriptor_12.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(13n),
                                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }]).value)
                            >=
                            amount_0,
                            'Insufficient pool balance for borrowing');
    let t_1;
    const newPoolBalance_0 = (t_1 = _descriptor_3.fromValue(Contract._query(context,
                                                                            partialProofData,
                                                                            [
                                                                             { dup: { n: 0 } },
                                                                             { idx: { cached: false,
                                                                                      pushPath: false,
                                                                                      path: [
                                                                                             { tag: 'value',
                                                                                               value: { value: _descriptor_12.toValue(1n),
                                                                                                        alignment: _descriptor_12.alignment() } },
                                                                                             { tag: 'value',
                                                                                               value: { value: _descriptor_12.toValue(13n),
                                                                                                        alignment: _descriptor_12.alignment() } }] } },
                                                                             { popeq: { cached: false,
                                                                                        result: undefined } }]).value),
                              (__compactRuntime.assert(!(t_1 < amount_0),
                                                       'result of subtraction would be negative'),
                               t_1 - amount_0));
    const newUserBalance_0 = ((t1) => {
                               if (t1 > 340282366920938463463374607431768211455n) {
                                 throw new __compactRuntime.CompactError('LiquidityPool.compact line 168 char 26: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                               }
                               return t1;
                             })(_descriptor_3.fromValue(Contract._query(context,
                                                                        partialProofData,
                                                                        [
                                                                         { dup: { n: 0 } },
                                                                         { idx: { cached: false,
                                                                                  pushPath: false,
                                                                                  path: [
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_12.toValue(1n),
                                                                                                    alignment: _descriptor_12.alignment() } },
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_12.toValue(14n),
                                                                                                    alignment: _descriptor_12.alignment() } }] } },
                                                                         { popeq: { cached: false,
                                                                                    result: undefined } }]).value)
                                +
                                amount_0);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(13n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(newPoolBalance_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(14n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(newUserBalance_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _repayLoan_0(context, partialProofData, principal_0, interest_0) {
    const borrower_0 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime.assert(this._equal_1(borrower_0,
                                          _descriptor_1.fromValue(Contract._query(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 0 } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_12.toValue(1n),
                                                                                                              alignment: _descriptor_12.alignment() } },
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_12.toValue(2n),
                                                                                                              alignment: _descriptor_12.alignment() } }] } },
                                                                                   { popeq: { cached: false,
                                                                                              result: undefined } }]).value)),
                            'Only active borrower can repay');
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                                alignment: _descriptor_12.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(7n),
                                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }]).value)
                            ===
                            true,
                            'No active borrowing position');
    __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                                alignment: _descriptor_12.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(4n),
                                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }]).value)
                            >=
                            principal_0,
                            'Repayment exceeds borrowed amount');
    const totalRepayment_0 = ((t1) => {
                               if (t1 > 340282366920938463463374607431768211455n) {
                                 throw new __compactRuntime.CompactError('LiquidityPool.compact line 184 char 26: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                               }
                               return t1;
                             })(principal_0 + interest_0);
    let t_0;
    const tmp_0 = (t_0 = _descriptor_3.fromValue(Contract._query(context,
                                                                 partialProofData,
                                                                 [
                                                                  { dup: { n: 0 } },
                                                                  { idx: { cached: false,
                                                                           pushPath: false,
                                                                           path: [
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_12.toValue(1n),
                                                                                             alignment: _descriptor_12.alignment() } },
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_12.toValue(4n),
                                                                                             alignment: _descriptor_12.alignment() } }] } },
                                                                  { popeq: { cached: false,
                                                                             result: undefined } }]).value),
                   (__compactRuntime.assert(!(t_0 < principal_0),
                                            'result of subtraction would be negative'),
                    t_0 - principal_0));
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(4n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_1 = 150n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(5n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_1),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    let t_1;
    const tmp_2 = (t_1 = _descriptor_3.fromValue(Contract._query(context,
                                                                 partialProofData,
                                                                 [
                                                                  { dup: { n: 0 } },
                                                                  { idx: { cached: false,
                                                                           pushPath: false,
                                                                           path: [
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_12.toValue(0n),
                                                                                             alignment: _descriptor_12.alignment() } },
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_12.toValue(4n),
                                                                                             alignment: _descriptor_12.alignment() } }] } },
                                                                  { popeq: { cached: false,
                                                                             result: undefined } }]).value),
                   (__compactRuntime.assert(!(t_1 < principal_0),
                                            'result of subtraction would be negative'),
                    t_1 - principal_0));
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(4n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_2),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_3 = ((t1) => {
                    if (t1 > 340282366920938463463374607431768211455n) {
                      throw new __compactRuntime.CompactError('LiquidityPool.compact line 194 char 33: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                    }
                    return t1;
                  })(_descriptor_3.fromValue(Contract._query(context,
                                                             partialProofData,
                                                             [
                                                              { dup: { n: 0 } },
                                                              { idx: { cached: false,
                                                                       pushPath: false,
                                                                       path: [
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_12.toValue(0n),
                                                                                         alignment: _descriptor_12.alignment() } },
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_12.toValue(6n),
                                                                                         alignment: _descriptor_12.alignment() } }] } },
                                                              { popeq: { cached: false,
                                                                         result: undefined } }]).value)
                     +
                     principal_0);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(6n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_3),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_4 = ((t1) => {
                    if (t1 > 340282366920938463463374607431768211455n) {
                      throw new __compactRuntime.CompactError('LiquidityPool.compact line 195 char 27: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                    }
                    return t1;
                  })(_descriptor_3.fromValue(Contract._query(context,
                                                             partialProofData,
                                                             [
                                                              { dup: { n: 0 } },
                                                              { idx: { cached: false,
                                                                       pushPath: false,
                                                                       path: [
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_12.toValue(0n),
                                                                                         alignment: _descriptor_12.alignment() } },
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_12.toValue(7n),
                                                                                         alignment: _descriptor_12.alignment() } }] } },
                                                              { popeq: { cached: false,
                                                                         result: undefined } }]).value)
                     +
                     interest_0);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(7n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_4),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_5 = ((t1) => {
                    if (t1 > 340282366920938463463374607431768211455n) {
                      throw new __compactRuntime.CompactError('LiquidityPool.compact line 198 char 30: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                    }
                    return t1;
                  })(_descriptor_3.fromValue(Contract._query(context,
                                                             partialProofData,
                                                             [
                                                              { dup: { n: 0 } },
                                                              { idx: { cached: false,
                                                                       pushPath: false,
                                                                       path: [
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_12.toValue(1n),
                                                                                         alignment: _descriptor_12.alignment() } },
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_12.toValue(10n),
                                                                                         alignment: _descriptor_12.alignment() } }] } },
                                                              { popeq: { cached: false,
                                                                         result: undefined } }]).value)
                     +
                     interest_0);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(10n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_5),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _claimRewards_0(context, partialProofData) {
    const provider_0 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime.assert(this._equal_2(provider_0,
                                          _descriptor_1.fromValue(Contract._query(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 0 } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_12.toValue(1n),
                                                                                                              alignment: _descriptor_12.alignment() } },
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_12.toValue(8n),
                                                                                                              alignment: _descriptor_12.alignment() } }] } },
                                                                                   { popeq: { cached: false,
                                                                                              result: undefined } }]).value)),
                            'Only active provider can claim');
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                                alignment: _descriptor_12.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(12n),
                                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }]).value)
                            ===
                            true,
                            'No active liquidity position');
    __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                                alignment: _descriptor_12.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(10n),
                                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }]).value)
                            >
                            0n,
                            'No rewards available');
    const rewardsToDistribute_0 = _descriptor_3.fromValue(Contract._query(context,
                                                                          partialProofData,
                                                                          [
                                                                           { dup: { n: 0 } },
                                                                           { idx: { cached: false,
                                                                                    pushPath: false,
                                                                                    path: [
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_12.toValue(1n),
                                                                                                      alignment: _descriptor_12.alignment() } },
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_12.toValue(10n),
                                                                                                      alignment: _descriptor_12.alignment() } }] } },
                                                                           { popeq: { cached: false,
                                                                                      result: undefined } }]).value);
    const tmp_0 = 0n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(10n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    let t_0;
    const tmp_1 = (t_0 = _descriptor_3.fromValue(Contract._query(context,
                                                                 partialProofData,
                                                                 [
                                                                  { dup: { n: 0 } },
                                                                  { idx: { cached: false,
                                                                           pushPath: false,
                                                                           path: [
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_12.toValue(0n),
                                                                                             alignment: _descriptor_12.alignment() } },
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_12.toValue(7n),
                                                                                             alignment: _descriptor_12.alignment() } }] } },
                                                                  { popeq: { cached: false,
                                                                             result: undefined } }]).value),
                   (__compactRuntime.assert(!(t_0 < rewardsToDistribute_0),
                                            'result of subtraction would be negative'),
                    t_0 - rewardsToDistribute_0));
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(7n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_1),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [rewardsToDistribute_0];
  }
  _withdrawCollateral_0(context, partialProofData, amount_0) {
    const borrower_0 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime.assert(this._equal_3(borrower_0,
                                          _descriptor_1.fromValue(Contract._query(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 0 } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_12.toValue(1n),
                                                                                                              alignment: _descriptor_12.alignment() } },
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_12.toValue(2n),
                                                                                                              alignment: _descriptor_12.alignment() } }] } },
                                                                                   { popeq: { cached: false,
                                                                                              result: undefined } }]).value)),
                            'Only active borrower can withdraw');
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                                alignment: _descriptor_12.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(7n),
                                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }]).value)
                            ===
                            true,
                            'No active collateral position');
    __compactRuntime.assert(this._equal_4(_descriptor_3.fromValue(Contract._query(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 0 } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_12.toValue(1n),
                                                                                                              alignment: _descriptor_12.alignment() } },
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_12.toValue(4n),
                                                                                                              alignment: _descriptor_12.alignment() } }] } },
                                                                                   { popeq: { cached: false,
                                                                                              result: undefined } }]).value),
                                          0n),
                            'Cannot withdraw with outstanding debt');
    __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                                alignment: _descriptor_12.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(3n),
                                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }]).value)
                            >=
                            amount_0,
                            'Insufficient collateral');
    let t_0;
    const tmp_0 = (t_0 = _descriptor_3.fromValue(Contract._query(context,
                                                                 partialProofData,
                                                                 [
                                                                  { dup: { n: 0 } },
                                                                  { idx: { cached: false,
                                                                           pushPath: false,
                                                                           path: [
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_12.toValue(1n),
                                                                                             alignment: _descriptor_12.alignment() } },
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_12.toValue(3n),
                                                                                             alignment: _descriptor_12.alignment() } }] } },
                                                                  { popeq: { cached: false,
                                                                             result: undefined } }]).value),
                   (__compactRuntime.assert(!(t_0 < amount_0),
                                            'result of subtraction would be negative'),
                    t_0 - amount_0));
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(3n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    let t_1;
    const tmp_1 = (t_1 = _descriptor_3.fromValue(Contract._query(context,
                                                                 partialProofData,
                                                                 [
                                                                  { dup: { n: 0 } },
                                                                  { idx: { cached: false,
                                                                           pushPath: false,
                                                                           path: [
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_12.toValue(0n),
                                                                                             alignment: _descriptor_12.alignment() } },
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_12.toValue(5n),
                                                                                             alignment: _descriptor_12.alignment() } }] } },
                                                                  { popeq: { cached: false,
                                                                             result: undefined } }]).value),
                   (__compactRuntime.assert(!(t_1 < amount_0),
                                            'result of subtraction would be negative'),
                    t_1 - amount_0));
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(5n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_1),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _liquidatePosition_0(context, partialProofData, liquidationAmount_0) {
    const liquidator_0 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                                alignment: _descriptor_12.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(7n),
                                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }]).value)
                            ===
                            true,
                            'No active position to liquidate');
    __compactRuntime.assert(_descriptor_4.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                                alignment: _descriptor_12.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(5n),
                                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }]).value)
                            <
                            _descriptor_4.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                                alignment: _descriptor_12.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(0n),
                                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }]).value),
                            'Position is healthy');
    __compactRuntime.assert(liquidationAmount_0
                            <=
                            _descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                                alignment: _descriptor_12.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(4n),
                                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }]).value),
                            'Liquidation exceeds debt');
    const collateralToSeize_0 = ((t1) => {
                                  if (t1 > 340282366920938463463374607431768211455n) {
                                    throw new __compactRuntime.CompactError('LiquidityPool.compact line 253 char 29: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                                  }
                                  return t1;
                                })(liquidationAmount_0 + liquidationAmount_0);
    __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                                alignment: _descriptor_12.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_12.toValue(3n),
                                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }]).value)
                            >=
                            collateralToSeize_0,
                            'Insufficient collateral');
    let t_0;
    const tmp_0 = (t_0 = _descriptor_3.fromValue(Contract._query(context,
                                                                 partialProofData,
                                                                 [
                                                                  { dup: { n: 0 } },
                                                                  { idx: { cached: false,
                                                                           pushPath: false,
                                                                           path: [
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_12.toValue(1n),
                                                                                             alignment: _descriptor_12.alignment() } },
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_12.toValue(4n),
                                                                                             alignment: _descriptor_12.alignment() } }] } },
                                                                  { popeq: { cached: false,
                                                                             result: undefined } }]).value),
                   (__compactRuntime.assert(!(t_0 < liquidationAmount_0),
                                            'result of subtraction would be negative'),
                    t_0 - liquidationAmount_0));
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(4n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    let t_1;
    const tmp_1 = (t_1 = _descriptor_3.fromValue(Contract._query(context,
                                                                 partialProofData,
                                                                 [
                                                                  { dup: { n: 0 } },
                                                                  { idx: { cached: false,
                                                                           pushPath: false,
                                                                           path: [
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_12.toValue(1n),
                                                                                             alignment: _descriptor_12.alignment() } },
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_12.toValue(3n),
                                                                                             alignment: _descriptor_12.alignment() } }] } },
                                                                  { popeq: { cached: false,
                                                                             result: undefined } }]).value),
                   (__compactRuntime.assert(!(t_1 < collateralToSeize_0),
                                            'result of subtraction would be negative'),
                    t_1 - collateralToSeize_0));
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(3n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_1),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_2 = 0n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(5n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_2),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    let t_2;
    const tmp_3 = (t_2 = _descriptor_3.fromValue(Contract._query(context,
                                                                 partialProofData,
                                                                 [
                                                                  { dup: { n: 0 } },
                                                                  { idx: { cached: false,
                                                                           pushPath: false,
                                                                           path: [
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_12.toValue(0n),
                                                                                             alignment: _descriptor_12.alignment() } },
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_12.toValue(4n),
                                                                                             alignment: _descriptor_12.alignment() } }] } },
                                                                  { popeq: { cached: false,
                                                                             result: undefined } }]).value),
                   (__compactRuntime.assert(!(t_2 < liquidationAmount_0),
                                            'result of subtraction would be negative'),
                    t_2 - liquidationAmount_0));
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(4n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_3),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    let t_3;
    const tmp_4 = (t_3 = _descriptor_3.fromValue(Contract._query(context,
                                                                 partialProofData,
                                                                 [
                                                                  { dup: { n: 0 } },
                                                                  { idx: { cached: false,
                                                                           pushPath: false,
                                                                           path: [
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_12.toValue(0n),
                                                                                             alignment: _descriptor_12.alignment() } },
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_12.toValue(5n),
                                                                                             alignment: _descriptor_12.alignment() } }] } },
                                                                  { popeq: { cached: false,
                                                                             result: undefined } }]).value),
                   (__compactRuntime.assert(!(t_3 < collateralToSeize_0),
                                            'result of subtraction would be negative'),
                    t_3 - collateralToSeize_0));
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(5n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_4),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_5 = ((t1) => {
                    if (t1 > 340282366920938463463374607431768211455n) {
                      throw new __compactRuntime.CompactError('LiquidityPool.compact line 264 char 33: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                    }
                    return t1;
                  })(_descriptor_3.fromValue(Contract._query(context,
                                                             partialProofData,
                                                             [
                                                              { dup: { n: 0 } },
                                                              { idx: { cached: false,
                                                                       pushPath: false,
                                                                       path: [
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_12.toValue(0n),
                                                                                         alignment: _descriptor_12.alignment() } },
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_12.toValue(6n),
                                                                                         alignment: _descriptor_12.alignment() } }] } },
                                                              { popeq: { cached: false,
                                                                         result: undefined } }]).value)
                     +
                     liquidationAmount_0);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(0n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(6n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_5),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [true];
  }
  _getBorrowerPosition_0(context, partialProofData) {
    return [_descriptor_1.fromValue(Contract._query(context,
                                                    partialProofData,
                                                    [
                                                     { dup: { n: 0 } },
                                                     { idx: { cached: false,
                                                              pushPath: false,
                                                              path: [
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                alignment: _descriptor_12.alignment() } },
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(2n),
                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                     { popeq: { cached: false,
                                                                result: undefined } }]).value),
            _descriptor_3.fromValue(Contract._query(context,
                                                    partialProofData,
                                                    [
                                                     { dup: { n: 0 } },
                                                     { idx: { cached: false,
                                                              pushPath: false,
                                                              path: [
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                alignment: _descriptor_12.alignment() } },
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(3n),
                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                     { popeq: { cached: false,
                                                                result: undefined } }]).value),
            _descriptor_3.fromValue(Contract._query(context,
                                                    partialProofData,
                                                    [
                                                     { dup: { n: 0 } },
                                                     { idx: { cached: false,
                                                              pushPath: false,
                                                              path: [
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                alignment: _descriptor_12.alignment() } },
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(4n),
                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                     { popeq: { cached: false,
                                                                result: undefined } }]).value),
            _descriptor_4.fromValue(Contract._query(context,
                                                    partialProofData,
                                                    [
                                                     { dup: { n: 0 } },
                                                     { idx: { cached: false,
                                                              pushPath: false,
                                                              path: [
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                alignment: _descriptor_12.alignment() } },
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(5n),
                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                     { popeq: { cached: false,
                                                                result: undefined } }]).value),
            _descriptor_2.fromValue(Contract._query(context,
                                                    partialProofData,
                                                    [
                                                     { dup: { n: 0 } },
                                                     { idx: { cached: false,
                                                              pushPath: false,
                                                              path: [
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                alignment: _descriptor_12.alignment() } },
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(7n),
                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                     { popeq: { cached: false,
                                                                result: undefined } }]).value)];
  }
  _getLiquidityProvider_0(context, partialProofData) {
    return [_descriptor_1.fromValue(Contract._query(context,
                                                    partialProofData,
                                                    [
                                                     { dup: { n: 0 } },
                                                     { idx: { cached: false,
                                                              pushPath: false,
                                                              path: [
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                alignment: _descriptor_12.alignment() } },
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(8n),
                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                     { popeq: { cached: false,
                                                                result: undefined } }]).value),
            _descriptor_3.fromValue(Contract._query(context,
                                                    partialProofData,
                                                    [
                                                     { dup: { n: 0 } },
                                                     { idx: { cached: false,
                                                              pushPath: false,
                                                              path: [
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                alignment: _descriptor_12.alignment() } },
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(9n),
                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                     { popeq: { cached: false,
                                                                result: undefined } }]).value),
            _descriptor_3.fromValue(Contract._query(context,
                                                    partialProofData,
                                                    [
                                                     { dup: { n: 0 } },
                                                     { idx: { cached: false,
                                                              pushPath: false,
                                                              path: [
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                alignment: _descriptor_12.alignment() } },
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(10n),
                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                     { popeq: { cached: false,
                                                                result: undefined } }]).value),
            _descriptor_4.fromValue(Contract._query(context,
                                                    partialProofData,
                                                    [
                                                     { dup: { n: 0 } },
                                                     { idx: { cached: false,
                                                              pushPath: false,
                                                              path: [
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                alignment: _descriptor_12.alignment() } },
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(11n),
                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                     { popeq: { cached: false,
                                                                result: undefined } }]).value),
            _descriptor_2.fromValue(Contract._query(context,
                                                    partialProofData,
                                                    [
                                                     { dup: { n: 0 } },
                                                     { idx: { cached: false,
                                                              pushPath: false,
                                                              path: [
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                alignment: _descriptor_12.alignment() } },
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(12n),
                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                     { popeq: { cached: false,
                                                                result: undefined } }]).value)];
  }
  _getPoolState_0(context, partialProofData) {
    return [_descriptor_3.fromValue(Contract._query(context,
                                                    partialProofData,
                                                    [
                                                     { dup: { n: 0 } },
                                                     { idx: { cached: false,
                                                              pushPath: false,
                                                              path: [
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(0n),
                                                                                alignment: _descriptor_12.alignment() } },
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(3n),
                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                     { popeq: { cached: false,
                                                                result: undefined } }]).value),
            _descriptor_3.fromValue(Contract._query(context,
                                                    partialProofData,
                                                    [
                                                     { dup: { n: 0 } },
                                                     { idx: { cached: false,
                                                              pushPath: false,
                                                              path: [
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(0n),
                                                                                alignment: _descriptor_12.alignment() } },
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(4n),
                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                     { popeq: { cached: false,
                                                                result: undefined } }]).value),
            _descriptor_3.fromValue(Contract._query(context,
                                                    partialProofData,
                                                    [
                                                     { dup: { n: 0 } },
                                                     { idx: { cached: false,
                                                              pushPath: false,
                                                              path: [
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(0n),
                                                                                alignment: _descriptor_12.alignment() } },
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(5n),
                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                     { popeq: { cached: false,
                                                                result: undefined } }]).value),
            _descriptor_3.fromValue(Contract._query(context,
                                                    partialProofData,
                                                    [
                                                     { dup: { n: 0 } },
                                                     { idx: { cached: false,
                                                              pushPath: false,
                                                              path: [
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(0n),
                                                                                alignment: _descriptor_12.alignment() } },
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(6n),
                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                     { popeq: { cached: false,
                                                                result: undefined } }]).value),
            _descriptor_3.fromValue(Contract._query(context,
                                                    partialProofData,
                                                    [
                                                     { dup: { n: 0 } },
                                                     { idx: { cached: false,
                                                              pushPath: false,
                                                              path: [
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(0n),
                                                                                alignment: _descriptor_12.alignment() } },
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(7n),
                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                     { popeq: { cached: false,
                                                                result: undefined } }]).value),
            _descriptor_4.fromValue(Contract._query(context,
                                                    partialProofData,
                                                    [
                                                     { dup: { n: 0 } },
                                                     { idx: { cached: false,
                                                              pushPath: false,
                                                              path: [
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(0n),
                                                                                alignment: _descriptor_12.alignment() } },
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(8n),
                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                     { popeq: { cached: false,
                                                                result: undefined } }]).value),
            _descriptor_2.fromValue(Contract._query(context,
                                                    partialProofData,
                                                    [
                                                     { dup: { n: 0 } },
                                                     { idx: { cached: false,
                                                              pushPath: false,
                                                              path: [
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                alignment: _descriptor_12.alignment() } },
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_12.toValue(1n),
                                                                                alignment: _descriptor_12.alignment() } }] } },
                                                     { popeq: { cached: false,
                                                                result: undefined } }]).value)];
  }
  _calculateHealthFactor_0(context, partialProofData) {
    if (this._equal_5(_descriptor_3.fromValue(Contract._query(context,
                                                              partialProofData,
                                                              [
                                                               { dup: { n: 0 } },
                                                               { idx: { cached: false,
                                                                        pushPath: false,
                                                                        path: [
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_12.toValue(1n),
                                                                                          alignment: _descriptor_12.alignment() } },
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_12.toValue(4n),
                                                                                          alignment: _descriptor_12.alignment() } }] } },
                                                               { popeq: { cached: false,
                                                                          result: undefined } }]).value),
                      0n))
    {
      return [999n];
    } else {
      const collateralValue_0 = ((t1) => {
                                  if (t1 > 340282366920938463463374607431768211455n) {
                                    throw new __compactRuntime.CompactError('LiquidityPool.compact line 299 char 27: cast from field value to Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                                  }
                                  return t1;
                                })(__compactRuntime.mulField(_descriptor_3.fromValue(Contract._query(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_12.toValue(1n),
                                                                                                                                 alignment: _descriptor_12.alignment() } },
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_12.toValue(3n),
                                                                                                                                 alignment: _descriptor_12.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value),
                                                             100n));
      const debtThreshold_0 = ((t1) => {
                                if (t1 > 340282366920938463463374607431768211455n) {
                                  throw new __compactRuntime.CompactError('LiquidityPool.compact line 300 char 25: cast from field value to Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                                }
                                return t1;
                              })(__compactRuntime.mulField(_descriptor_3.fromValue(Contract._query(context,
                                                                                                   partialProofData,
                                                                                                   [
                                                                                                    { dup: { n: 0 } },
                                                                                                    { idx: { cached: false,
                                                                                                             pushPath: false,
                                                                                                             path: [
                                                                                                                    { tag: 'value',
                                                                                                                      value: { value: _descriptor_12.toValue(1n),
                                                                                                                               alignment: _descriptor_12.alignment() } },
                                                                                                                    { tag: 'value',
                                                                                                                      value: { value: _descriptor_12.toValue(4n),
                                                                                                                               alignment: _descriptor_12.alignment() } }] } },
                                                                                                    { popeq: { cached: false,
                                                                                                               result: undefined } }]).value),
                                                           120n));
      if (collateralValue_0 > debtThreshold_0) {
        return [150n];
      } else {
        return [100n];
      }
    }
  }
  _updateInterestRates_0(context, partialProofData) {
    if (this._equal_6(_descriptor_3.fromValue(Contract._query(context,
                                                              partialProofData,
                                                              [
                                                               { dup: { n: 0 } },
                                                               { idx: { cached: false,
                                                                        pushPath: false,
                                                                        path: [
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_12.toValue(0n),
                                                                                          alignment: _descriptor_12.alignment() } },
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_12.toValue(3n),
                                                                                          alignment: _descriptor_12.alignment() } }] } },
                                                               { popeq: { cached: false,
                                                                          result: undefined } }]).value),
                      0n))
    {
      return [];
    } else {
      const halfLiquidity_0 = ((t1) => {
                                if (t1 > 340282366920938463463374607431768211455n) {
                                  throw new __compactRuntime.CompactError('LiquidityPool.compact line 316 char 25: cast from field value to Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                                }
                                return t1;
                              })(__compactRuntime.mulField(_descriptor_3.fromValue(Contract._query(context,
                                                                                                   partialProofData,
                                                                                                   [
                                                                                                    { dup: { n: 0 } },
                                                                                                    { idx: { cached: false,
                                                                                                             pushPath: false,
                                                                                                             path: [
                                                                                                                    { tag: 'value',
                                                                                                                      value: { value: _descriptor_12.toValue(0n),
                                                                                                                               alignment: _descriptor_12.alignment() } },
                                                                                                                    { tag: 'value',
                                                                                                                      value: { value: _descriptor_12.toValue(3n),
                                                                                                                               alignment: _descriptor_12.alignment() } }] } },
                                                                                                    { popeq: { cached: false,
                                                                                                               result: undefined } }]).value),
                                                           50n));
      const borrowedPercent_0 = ((t1) => {
                                  if (t1 > 340282366920938463463374607431768211455n) {
                                    throw new __compactRuntime.CompactError('LiquidityPool.compact line 317 char 27: cast from field value to Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                                  }
                                  return t1;
                                })(__compactRuntime.mulField(_descriptor_3.fromValue(Contract._query(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_12.toValue(0n),
                                                                                                                                 alignment: _descriptor_12.alignment() } },
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_12.toValue(4n),
                                                                                                                                 alignment: _descriptor_12.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value),
                                                             100n));
      if (borrowedPercent_0 > halfLiquidity_0) {
        const tmp_0 = 1000n;
        Contract._query(context,
                        partialProofData,
                        [
                         { idx: { cached: false,
                                  pushPath: true,
                                  path: [
                                         { tag: 'value',
                                           value: { value: _descriptor_12.toValue(0n),
                                                    alignment: _descriptor_12.alignment() } }] } },
                         { push: { storage: false,
                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(8n),
                                                                                alignment: _descriptor_12.alignment() }).encode() } },
                         { push: { storage: true,
                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_0),
                                                                                alignment: _descriptor_4.alignment() }).encode() } },
                         { ins: { cached: false, n: 1 } },
                         { ins: { cached: true, n: 1 } }]);
      } else {
        const tmp_1 = 500n;
        Contract._query(context,
                        partialProofData,
                        [
                         { idx: { cached: false,
                                  pushPath: true,
                                  path: [
                                         { tag: 'value',
                                           value: { value: _descriptor_12.toValue(0n),
                                                    alignment: _descriptor_12.alignment() } }] } },
                         { push: { storage: false,
                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(8n),
                                                                                alignment: _descriptor_12.alignment() }).encode() } },
                         { push: { storage: true,
                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_1),
                                                                                alignment: _descriptor_4.alignment() }).encode() } },
                         { ins: { cached: false, n: 1 } },
                         { ins: { cached: true, n: 1 } }]);
      }
      return [];
    }
  }
  _pausePool_0(context, partialProofData) {
    __compactRuntime.assert(this._equal_7(this._ownPublicKey_0(context,
                                                               partialProofData),
                                          _descriptor_1.fromValue(Contract._query(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 0 } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_12.toValue(0n),
                                                                                                              alignment: _descriptor_12.alignment() } },
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_12.toValue(0n),
                                                                                                              alignment: _descriptor_12.alignment() } }] } },
                                                                                   { popeq: { cached: false,
                                                                                              result: undefined } }]).value)),
                            'Only pool owner can pause');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(1n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(false),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _unpausePool_0(context, partialProofData) {
    __compactRuntime.assert(this._equal_8(this._ownPublicKey_0(context,
                                                               partialProofData),
                                          _descriptor_1.fromValue(Contract._query(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 0 } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_12.toValue(0n),
                                                                                                              alignment: _descriptor_12.alignment() } },
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_12.toValue(0n),
                                                                                                              alignment: _descriptor_12.alignment() } }] } },
                                                                                   { popeq: { cached: false,
                                                                                              result: undefined } }]).value)),
                            'Only pool owner can unpause');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_12.toValue(1n),
                                                alignment: _descriptor_12.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(1n),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(true),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _equal_0(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_1(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_2(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_3(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_4(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_5(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_6(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_7(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_8(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  static _query(context, partialProofData, prog) {
    var res;
    try {
      res = context.transactionContext.query(prog, __compactRuntime.CostModel.dummyCostModel());
    } catch (err) {
      throw new __compactRuntime.CompactError(err.toString());
    }
    context.transactionContext = res.context;
    var reads = res.events.filter((e) => e.tag === 'read');
    var i = 0;
    partialProofData.publicTranscript = partialProofData.publicTranscript.concat(prog.map((op) => {
      if(typeof(op) === 'object' && 'popeq' in op) {
        return { popeq: {
          ...op.popeq,
          result: reads[i++].content,
        } };
      } else {
        return op;
      }
    }));
    if(res.events.length == 1 && res.events[0].tag === 'read') {
      return res.events[0].content;
    } else {
      return res.events;
    }
  }
}
function ledger(state) {
  const context = {
    originalState: state,
    transactionContext: new __compactRuntime.QueryContext(state, __compactRuntime.dummyContractAddress())
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    get poolOwner() {
      return _descriptor_1.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(0n),
                                                                                 alignment: _descriptor_12.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(0n),
                                                                                 alignment: _descriptor_12.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get testTokenContract() {
      return _descriptor_1.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(0n),
                                                                                 alignment: _descriptor_12.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(1n),
                                                                                 alignment: _descriptor_12.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get zkIdContract() {
      return _descriptor_1.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(0n),
                                                                                 alignment: _descriptor_12.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(2n),
                                                                                 alignment: _descriptor_12.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get totalLiquidity() {
      return _descriptor_3.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(0n),
                                                                                 alignment: _descriptor_12.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(3n),
                                                                                 alignment: _descriptor_12.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get totalBorrowed() {
      return _descriptor_3.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(0n),
                                                                                 alignment: _descriptor_12.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(4n),
                                                                                 alignment: _descriptor_12.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get totalCollateral() {
      return _descriptor_3.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(0n),
                                                                                 alignment: _descriptor_12.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(5n),
                                                                                 alignment: _descriptor_12.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get availableLiquidity() {
      return _descriptor_3.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(0n),
                                                                                 alignment: _descriptor_12.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(6n),
                                                                                 alignment: _descriptor_12.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get totalRewards() {
      return _descriptor_3.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(0n),
                                                                                 alignment: _descriptor_12.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(7n),
                                                                                 alignment: _descriptor_12.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get interestRate() {
      return _descriptor_4.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(0n),
                                                                                 alignment: _descriptor_12.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(8n),
                                                                                 alignment: _descriptor_12.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get collateralRatio() {
      return _descriptor_4.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(0n),
                                                                                 alignment: _descriptor_12.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(9n),
                                                                                 alignment: _descriptor_12.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get liquidationThreshold() {
      return _descriptor_4.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(1n),
                                                                                 alignment: _descriptor_12.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(0n),
                                                                                 alignment: _descriptor_12.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get isPoolActive() {
      return _descriptor_2.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(1n),
                                                                                 alignment: _descriptor_12.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(1n),
                                                                                 alignment: _descriptor_12.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get borrowerAddress() {
      return _descriptor_1.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(1n),
                                                                                 alignment: _descriptor_12.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(2n),
                                                                                 alignment: _descriptor_12.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get borrowerCollateral() {
      return _descriptor_3.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(1n),
                                                                                 alignment: _descriptor_12.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(3n),
                                                                                 alignment: _descriptor_12.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get borrowerDebt() {
      return _descriptor_3.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(1n),
                                                                                 alignment: _descriptor_12.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(4n),
                                                                                 alignment: _descriptor_12.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get borrowerHealthFactor() {
      return _descriptor_4.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(1n),
                                                                                 alignment: _descriptor_12.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(5n),
                                                                                 alignment: _descriptor_12.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get borrowerZkId() {
      return _descriptor_1.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(1n),
                                                                                 alignment: _descriptor_12.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(6n),
                                                                                 alignment: _descriptor_12.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get isBorrowerActive() {
      return _descriptor_2.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(1n),
                                                                                 alignment: _descriptor_12.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(7n),
                                                                                 alignment: _descriptor_12.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get providerAddress() {
      return _descriptor_1.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(1n),
                                                                                 alignment: _descriptor_12.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(8n),
                                                                                 alignment: _descriptor_12.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get providerLiquidity() {
      return _descriptor_3.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(1n),
                                                                                 alignment: _descriptor_12.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(9n),
                                                                                 alignment: _descriptor_12.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get providerRewards() {
      return _descriptor_3.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(1n),
                                                                                 alignment: _descriptor_12.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(10n),
                                                                                 alignment: _descriptor_12.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get providerSharePercentage() {
      return _descriptor_4.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(1n),
                                                                                 alignment: _descriptor_12.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(11n),
                                                                                 alignment: _descriptor_12.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get isProviderActive() {
      return _descriptor_2.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(1n),
                                                                                 alignment: _descriptor_12.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(12n),
                                                                                 alignment: _descriptor_12.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get poolTokenBalance() {
      return _descriptor_3.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(1n),
                                                                                 alignment: _descriptor_12.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(13n),
                                                                                 alignment: _descriptor_12.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get userTokenBalance() {
      return _descriptor_3.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(1n),
                                                                                 alignment: _descriptor_12.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_12.toValue(14n),
                                                                                 alignment: _descriptor_12.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    }
  };
}
const _emptyContext = {
  originalState: new __compactRuntime.ContractState(),
  transactionContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({ });
const pureCircuits = {};
const contractReferenceLocations = { tag: 'publicLedgerArray', indices: { } };
exports.Contract = Contract;
exports.ledger = ledger;
exports.pureCircuits = pureCircuits;
exports.contractReferenceLocations = contractReferenceLocations;
//# sourceMappingURL=index.cjs.map
