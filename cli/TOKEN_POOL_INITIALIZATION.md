# Token and Pool Initialization Script

This script automatically creates multiple test tokens and initializes corresponding liquidity pools for each token.

## What It Does

The script will:

1. **Deploy Test Tokens**: Creates 3 different test tokens with predefined configurations
2. **Initialize Liquidity Pools**: For each token, creates and initializes a corresponding liquidity pool
3. **Link Tokens to Pools**: Properly connects each token to its pool during initialization

## Predefined Tokens

The script creates these tokens by default:

| Token Name | Name Number | Symbol Number | Initial Supply |
|------------|-------------|---------------|----------------|
| USDC Token | 1001        | 2001          | 1,000,000      |
| WETH Token | 1002        | 2002          | 500,000        |
| WBTC Token | 1003        | 2003          | 100,000        |

## How to Run

### Prerequisites

1. Make sure your standalone environment is running:
   ```bash
   cd cli
   docker compose -f standalone.yml up -d
   ```

2. Ensure contracts are compiled:
   ```bash
   cd contracts
   bun run compact
   ```

### Run the Script

```bash
cd cli

# Option 1: Run directly
bun run initialize-tokens-and-pools

# Option 2: Build first (recommended for production)
bun run start-initialize-tokens-pools
```

### Environment Variables

You can customize the wallet seed:
```bash
export WALLET_SEED="your-custom-seed-here"
bun run initialize-tokens-and-pools
```

## What You'll See

The script provides detailed logging:

```
🚀 Starting Token and Pool Initialization...
📡 Indexer: http://127.0.0.1:8088/api/v1/graphql
🌐 Node: http://127.0.0.1:9944
🔐 Proof Server: http://127.0.0.1:6300
🪙 Tokens to create: 3

🔑 Building wallet and waiting for funds...

==================== TOKEN 1/3 ====================
🪙 Creating USDC Token...
📝 Name: 1001, Symbol: 2001
💰 Initial Supply: 1000000

✅ USDC Token deployed successfully!
📄 Token Address: 0xabc123...
🏊 Creating liquidity pool for USDC Token...
✅ Liquidity pool for USDC Token created successfully!
🏊 Pool Address: 0xdef456...
📊 USDC Token ecosystem created successfully!

[... similar for other tokens ...]

🎉 ===================== SUMMARY =====================
✅ Successfully created 3 token ecosystems!

1. USDC Token:
   🪙 Token:  0xabc123...
   🏊 Pool:   0xdef456...

2. WETH Token:
   🪙 Token:  0x789abc...
   🏊 Pool:   0x012def...

3. WBTC Token:
   🪙 Token:  0x345678...
   🏊 Pool:   0x9abcde...

🔧 You can now interact with these tokens and pools using the CLI!
💡 Use the contract addresses above to join existing contracts.
```

## Using the Created Tokens

After the script completes, you can:

1. **Join existing tokens** using the `simple-standalone-testtoken` command and the printed token addresses
2. **Interact with pools** (note: full pool functionality requires the LiquidityPool contract to be compiled)

## Customizing Token Configurations

To modify the tokens that get created, edit the `TOKEN_CONFIGS` array in `src/initialize-tokens-and-pools.ts`:

```typescript
const TOKEN_CONFIGS = [
  {
    name: 'My Custom Token',
    nameNum: 9001,
    symbolNum: 9002, 
    initialSupply: 2000000n,
  },
  // Add more tokens as needed...
];
```

## Important Notes

- **LiquidityPool Contract**: Uses the fully compiled and functional LiquidityPool contract
- **Wallet Seed**: The script uses a default seed for development. Use a secure seed in production
- **Network**: This script is configured for standalone development environment
- **Funds**: Make sure your wallet has sufficient funds for deployment transactions

## Troubleshooting

1. **"Insufficient funds" errors**: Make sure your wallet has native tokens for gas fees
2. **"Contract compilation failed"**: Ensure the TestToken contract is compiled in the contracts directory
3. **"Connection refused"**: Check that the standalone environment is running with `docker compose ps`

## Files Created

The script creates these new files:
- `src/initialize-tokens-and-pools.ts` - Main initialization script
- `src/liquidity-pool-api.ts` - API layer for LiquidityPool contracts with full functionality
- Logs in `logs/initialize-tokens-and-pools/`

## Next Steps

After running this script, you can:
1. Use the printed contract addresses with your existing CLI tools
2. Develop frontend interfaces that interact with these tokens
3. Implement additional DeFi functionality using the deployed contracts
