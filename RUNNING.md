# Running the Midnight TestToken Standalone Node

This guide provides step-by-step instructions for setting up and running the Midnight TestToken project with a standalone node environment.

## Prerequisites

### System Requirements
- **Node.js**: Version 18+ (recommended: 20+)
- **Bun**: Version 1.2.4+ (package manager)
- **Docker & Docker Compose**: For running the standalone blockchain environment
- **Git**: For version control

### Global Dependencies

Install the following global dependencies:

```bash
# Install Bun (if not already installed)
curl -fsSL https://bun.sh/install | bash

# Install Midnight Compact Compiler
# Note: This requires the Midnight Network development environment
# Follow the official Midnight Network documentation to install the compact compiler
# The compiler should be available in your PATH as 'compact'

# Verify installations
bun --version
docker --version
docker compose version
compact --version  # Should show Midnight Compact compiler version
```

## Project Structure

```
midnight-hack/
├── contracts/          # Smart contracts (Compact language)
│   ├── src/
│   │   ├── TestToken.compact      # Main TestToken contract
│   │   └── managed/TestToken/     # Compiled contract artifacts
├── cli/                # Command-line interface
│   ├── src/
│   │   ├── testtoken-cli.ts       # Main CLI interface
│   │   ├── testtoken-api.ts       # Contract interaction API
│   │   ├── config.ts              # Configuration management
│   │   └── simple-standalone-testtoken.ts
│   └── standalone.yml             # Docker compose configuration
├── client/             # Web frontend (React)
├── server/             # Backend API (Hono)
└── shared/             # Shared types and utilities
```

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd midnight-hack

# Install all dependencies using Bun
bun install

# This will:
# - Install root dependencies
# - Install workspace dependencies (client, server, shared, cli, contracts)
# - Build shared and server packages
# - Set up the monorepo structure
```

### 2. Compile the TestToken Contract

The TestToken contract must be compiled before running the CLI:

```bash
# Navigate to contracts directory
cd contracts

# Compile the TestToken contract
# This requires the Midnight Compact compiler to be installed
bun run compact

# Alternatively, run the full build process
bun run build
```

**What happens during compilation:**
- The `TestToken.compact` file is compiled to TypeScript/JavaScript
- Zero-knowledge circuit files (`.zkir`, `.bzkir`) are generated
- Prover and verifier keys are created in the `keys/` directory
- Contract metadata is generated in `compiler/contract-info.json`

### 3. Start the Standalone Environment

The standalone environment runs a complete Midnight blockchain locally using Docker:

```bash
# Navigate to CLI directory
cd cli

# Start the standalone environment with Docker
# This will pull and start the required containers:
# - Midnight Node (blockchain)
# - Indexer (for querying blockchain data)
# - Proof Server (for zero-knowledge proof generation)
docker compose -f standalone.yml up -d

# Wait for containers to be ready (usually 30-60 seconds)
# You can check the status with:
docker compose -f standalone.yml ps
```

### 4. Run the TestToken CLI

Once the standalone environment is running:

```bash
# Option 1: Run with automatic container discovery
bun run standalone-testtoken

# Option 2: Run with pre-configured ports (faster startup)
bun run simple-standalone-testtoken

# Option 3: Build and run (recommended for production)
bun run start-standalone-testtoken
```

## Using the TestToken CLI

When you run the CLI, you'll see an interactive menu:

```
You can do one of the following:
  1. Deploy a new TestToken contract
  2. Join an existing TestToken contract  
  3. Exit
```

### Deploying a New Token

1. Choose option `1` to deploy a new contract
2. Enter token details:
   - **Token name**: Enter as a number (e.g., `1234`)
   - **Token symbol**: Enter as a number (e.g., `5678`) 
   - **Initial supply**: Enter the initial token supply (e.g., `1000000`)

3. The system will:
   - Deploy the TestToken contract to the blockchain
   - Initialize the token with your specified parameters
   - Display the contract address and transaction details

### Available Operations

After deployment, you can perform various operations:
- **Mint tokens**: Create new tokens (owner only)
- **Faucet**: Get free tokens (anyone can use)
- **Burn tokens**: Destroy tokens (owner only)
- **Query balance**: Check token balances
- **View transaction history**: See all contract interactions

## Configuration

### Environment Configuration

The CLI supports different environments:

- **Standalone**: Local Docker environment (recommended for development)
- **Testnet**: Midnight Network testnet
- **Local Testnet**: Local testnet setup

Configuration is managed in `cli/src/config.ts`:

```typescript
export const contractConfig = {
  privateStateStoreName: 'testtoken-private-state',
  zkConfigPath: path.resolve(currentDir, '..', '..', 'contracts', 'src', 'managed', 'TestToken'),
};
```

### Docker Services

The `standalone.yml` defines three services:

- **midnight-node**: Blockchain node (port 9944)
- **indexer**: Data indexing service (port 8088)  
- **proof-server**: Zero-knowledge proof generation (port 6300)

## Troubleshooting

### Common Issues

1. **"compact command not found"**
   - Install the Midnight Compact compiler following official documentation
   - Ensure it's in your system PATH

2. **"Contract compilation failed"**
   - Verify the Compact compiler is correctly installed
   - Check that `contracts/src/TestToken.compact` exists and is valid

3. **"Docker containers not starting"**
   - Ensure Docker is running
   - Check available disk space and memory
   - Try: `docker compose -f standalone.yml down && docker compose -f standalone.yml up -d`

4. **"Connection refused" errors**
   - Wait for containers to fully initialize (30-60 seconds)
   - Check container logs: `docker compose -f standalone.yml logs`

5. **"ENOENT: no such file or directory" errors**
   - Ensure contracts are compiled: `cd contracts && bun run compact`
   - Verify the contract artifacts exist in `contracts/src/managed/TestToken/`

### Logs and Debugging

- CLI logs are stored in `cli/logs/`
- Docker container logs: `docker compose -f standalone.yml logs [service-name]`
- Enable debug mode by setting environment variables in your shell

## Development Workflow

### Adding New Contract Functions

1. Modify `contracts/src/TestToken.compact`
2. Recompile: `cd contracts && bun run compact`
3. Update CLI integration in `cli/src/testtoken-api.ts`
4. Test with the standalone environment

### Contract Dependencies

When adding new contract dependencies:

1. Add to `contracts/package.json`
2. Install: `bun install`
3. Update import statements in the `.compact` file
4. Recompile the contract

### Example: Adding a Transfer Function

```compact
// In TestToken.compact
export circuit transfer(to: ZswapCoinPublicKey, amount: Uint<128>): [] {
  // Implementation here
}
```

Then update the CLI API to expose this function to users.

## Production Deployment

For production deployment:

1. Use testnet or mainnet instead of standalone
2. Set appropriate environment variables
3. Use secure wallet seeds and private keys
4. Monitor contract interactions and gas usage
5. Implement proper error handling and recovery

## Additional Resources

- [Midnight Network Documentation](https://docs.midnight.network)
- [Compact Language Reference](https://docs.midnight.network/compact)
- [Zero-Knowledge Proofs Guide](https://docs.midnight.network/zk-proofs)

---

**Note**: This project is based on the Midnight Network example-counter template and has been adapted for TestToken functionality. Always refer to the latest Midnight Network documentation for the most current development practices.
