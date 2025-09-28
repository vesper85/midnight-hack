# Strix 🦅

A privacy-preserving DeFi lending protocol built on Midnight Network that enables private lending and borrowing while maintaining user anonymity through zero-knowledge proofs.

## What is Strix?

Strix is a decentralized lending protocol with privacy-first design that bridges traditional DeFi transparency requirements with user privacy needs. Built on Midnight Network's zero-knowledge capabilities, Strix enables users to access lending services without compromising their financial privacy.

## Key Features

- **Private Identity System (zkID)**: Privacy-preserving identity tokens with selective revelation
- **Customizable Liquidity Pools**: Private lending/borrowing with interest earning capabilities
- **Privacy-Preserving Transactions**: All operations maintain user anonymity through zk-proofs
- **Debt Auction Mechanism**: Failed repayments trigger debt auctions with controlled identity disclosure
- **Modern Development Stack**:
  - [Midnight Network](https://midnight.network) for zero-knowledge blockchain infrastructure
  - [Bun](https://bun.sh) as the JavaScript runtime and package manager
  - [Hono](https://hono.dev) as the backend framework
  - [React](https://react.dev) for the frontend UI
  - [Turbo](https://turbo.build) for monorepo build orchestration and caching

## Project Structure

```
.
├── contracts/            # Midnight Network smart contracts (Compact language)
│   ├── src/
│   │   ├── TestToken.compact      # ERC-20-like token contract
│   │   ├── LiquidityPool.compact  # Lending/borrowing pool contract
│   │   └── zkID.compact           # Privacy-preserving identity contract
│   └── managed/          # Compiled contract artifacts
├── cli/                  # Command-line interface for contract interaction
│   ├── src/
│   │   ├── testtoken-api.ts       # TestToken contract API
│   │   ├── liquidity-pool-api.ts  # LiquidityPool contract API
│   │   ├── initialize-tokens-and-pools.ts  # Deployment scripts
│   │   └── query-contract-state.ts # Contract state querying
│   └── standalone.yml    # Docker configuration for Midnight Network
├── client/               # React frontend (UI mockups)
├── server/               # Hono backend API
├── shared/               # Shared TypeScript definitions
└── turbo.json            # Turbo configuration for build orchestration
```

### Smart Contracts

Strix implements three core smart contracts using Midnight Network's Compact language:

#### TestToken Contract
Basic ERC-20-like functionality with privacy features:
- Mint, burn, and faucet operations
- Private balance tracking
- Owner-based access control

#### LiquidityPool Contract
Comprehensive lending/borrowing system:
- Liquidity provision and withdrawal
- Collateral staking and borrowing
- Health factor calculations and liquidation
- Interest rate management
- Reward distribution

#### zkID Contract
Privacy-preserving identity management:
- KYC verification without revealing personal data
- Credit score tracking
- Selective identity revelation during liquidation
- Authorized issuer management

### CLI Interface

The command-line interface provides comprehensive contract management:

```
cli/
├── src/
│   ├── testtoken-api.ts       # TestToken contract interactions
│   ├── liquidity-pool-api.ts  # LiquidityPool contract interactions
│   ├── initialize-tokens-and-pools.ts  # Deployment automation
│   └── query-contract-state.ts # Contract state inspection
└── standalone.yml             # Docker configuration
```

### Frontend (In Development)

The React frontend provides a modern web interface for interacting with Strix:

```
client/
├── src/
│   ├── components/
│   │   ├── supply-market.tsx    # Supply market interface
│   │   ├── borrow-market.tsx    # Borrow market interface
│   │   ├── core-asset-table.tsx # Asset listing
│   │   └── ui/                  # Reusable UI components
│   ├── routes/
│   │   ├── index.tsx           # Main dashboard
│   │   ├── portfolio/          # User portfolio
│   │   └── transactions/       # Transaction history
│   └── lib/
│       └── token-api.ts        # Frontend API integration
```

**Note**: The frontend currently contains UI mockups and is not yet connected to the CLI backend. Integration is planned for future development.

## Getting Started

### Prerequisites

- **Bun**: Version 1.2.4+ (package manager and runtime)
- **Docker & Docker Compose**: For running Midnight Network standalone environment
- **Midnight Compact Compiler**: For smart contract compilation

### Quick Start

1. **Install Dependencies**
```bash
bun install
```

2. **Start Midnight Network Environment**
```bash
cd cli
docker compose -f standalone.yml up -d
```

3. **Compile Smart Contracts**
```bash
cd contracts
bun run compact
```

4. **Deploy Tokens and Liquidity Pools**
```bash
cd cli
bun run src/initialize-tokens-and-pools.ts
```

5. **Interact with Contracts**
```bash
# Deploy new token
bun run src/simple-standalone-testtoken.ts

# Query contract states
bun run src/query-contract-state.ts

# List all tokens
bun run src/list-test-tokens.ts
```

### Development Commands

```bash
# Run all services in development mode
bun run dev

# Build all packages
bun run build

# Lint code
bun run lint

# Type check
bun run type-check
```

## Architecture Overview

Strix implements a privacy-preserving DeFi protocol with the following key components:

### Privacy Model
- **Default Privacy**: All transactions and balances are private by default
- **Selective Revelation**: Identity is only revealed during liquidation events
- **Zero-Knowledge Proofs**: Verify financial positions without revealing amounts
- **Controlled Disclosure**: Authorized entities can access specific information when needed

### Contract Interactions
1. **Token Deployment**: Deploy TestToken contracts with private balances
2. **Pool Creation**: Create LiquidityPool contracts linked to tokens
3. **Identity Issuance**: Issue zkID tokens for KYC verification
4. **Lending Operations**: Provide liquidity and earn interest privately
5. **Borrowing Operations**: Stake collateral and borrow with private amounts
6. **Liquidation Process**: Reveal identity only to debt collectors during default

## Key Features Implemented

✅ **Smart Contracts**: TestToken, LiquidityPool, and zkID contracts  
✅ **CLI Interface**: Comprehensive command-line tools for contract interaction  
✅ **Contract Deployment**: Automated token and pool initialization  
✅ **State Querying**: Contract state inspection and transaction history  
✅ **Privacy Protection**: Zero-knowledge proof integration  
🚧 **Frontend Integration**: Web interface (in development)  
🚧 **Multi-Asset Support**: Cross-asset collateralization (planned)  

## Documentation

- [Running Guide](./RUNNING.md) - Detailed setup and usage instructions
- [Token Pool Initialization](./cli/TOKEN_POOL_INITIALIZATION.md) - Contract deployment guide
- [Query Tokens](./cli/QUERY_TOKENS.md) - Contract state querying documentation

## Learn More

- [Midnight Network Documentation](https://docs.midnight.network)
- [Compact Language Reference](https://docs.midnight.network/compact)
- [Zero-Knowledge Proofs Guide](https://docs.midnight.network/zk-proofs)
- [Bun Documentation](https://bun.sh/docs)
- [Hono Documentation](https://hono.dev/docs)

## License

MIT License - see [LICENSE](./LICENSE) for details.
