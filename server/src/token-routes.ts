import { Hono } from 'hono';
import { TestToken } from '@midnight-ntwrk/contract';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { NetworkId, setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';


// Define interfaces for type safety
interface TokenInfo {
  name: string;
  symbol: string;
  address: string;
  isInitialized: boolean;
  totalSupply?: string;
  owner?: string;
  error?: string;
  logo: string
}

// Set network ID for server-side
setNetworkId(NetworkId.Undeployed);

const app = new Hono();

// Configuration for Midnight network
const config = {
  indexer: 'http://127.0.0.1:8088/api/v1/graphql',
  indexerWS: 'ws://127.0.0.1:8088/api/v1/graphql/ws',
  node: 'http://127.0.0.1:9944',
  proofServer: 'http://127.0.0.1:6300',
};

// Known token addresses
const KNOWN_TOKEN_ADDRESSES = [
  {
    name: 'USDC Token',
    address: '0200e218d5b9484b9075fba633fde852eb52c3f7ebdc40d52740429cb6f4ae950bf9',
    symbol: '2001',
    expectedName: '1001'
  },
  {
    name: 'WETH Token', 
    address: '0200b3aa84e965b9b047d4dbff9315bc09eb199f8cb3838071b23be5421331f9a3a9',
    symbol: '2002',
    expectedName: '1002'
  },
  {
    name: 'WBTC Token',
    address: '0200e2f0f80d68414c660009eccad5889280ebaac32902b6d9adf972e48ba087ed45',
    symbol: '2003', 
    expectedName: '1003'
  }
];

// Custom JSON serializer that handles BigInt values
const safeJsonStringify = (obj: any, space?: number): string => {
  return JSON.stringify(obj, (_key, value) => {
    if (typeof value === 'bigint') {
      return value.toString();
    }
    if (value && typeof value === 'object' && value.bytes) {
      return Buffer.from(value.bytes).toString('hex');
    }
    return value;
  }, space);
};

// Query token information from the chain
async function queryTokenInfo(address: string): Promise<TokenInfo> {
  try {
    console.log(`🔍 Querying token at address: ${address}`);
    
    const publicDataProvider = indexerPublicDataProvider(config.indexer, config.indexerWS);
    const contractState = await publicDataProvider.queryContractState(address);
    
    if (!contractState) {
      console.warn(`⚠️  No contract state found for address: ${address}`);
      return {
        name: 'Unknown Token',
        symbol: 'UNK',
        address,
        isInitialized: false,
        error: 'No contract state found'
      };
    }
    
    console.log(`✅ Contract state found for address: ${address}`);
    console.log(`📊 Raw contract state: ${safeJsonStringify(contractState, 2)}`);
    
    // Try to parse the ledger state using TestToken.ledger
    let ledgerState;
    try {
      ledgerState = TestToken.ledger(contractState.data);
      console.log(`📈 Parsed ledger state: ${safeJsonStringify(ledgerState, 2)}`);
    } catch (parseError) {
      console.warn(`⚠️  Could not parse ledger state for address ${address}: ${parseError instanceof Error ? parseError.message : String(parseError)}`);
      ledgerState = null;
    }
    
    const knownToken = KNOWN_TOKEN_ADDRESSES.find(token => token.address === address);
    
    const tokenInfo: TokenInfo = {
      name: knownToken?.name || 'Unknown Token',
      symbol: knownToken?.symbol || 'UNK',
      address: address,
      isInitialized: !!contractState
    };
    
    // Extract token information from the ledger state if available
    if (ledgerState) {
        console.log('ledgerState', ledgerState);
      // Based on TestToken contract structure: tokenName, tokenSymbol, totalSupply, owner
      if (ledgerState.totalSupply !== undefined) {
        tokenInfo.totalSupply = ledgerState.totalSupply.toString();
      }
      if (ledgerState.owner !== undefined) {
        // Convert owner to string if it's an object with bytes
        if (typeof ledgerState.owner === 'object' && ledgerState.owner.bytes) {
          tokenInfo.owner = Buffer.from(ledgerState.owner.bytes).toString('hex');
        } else {
          tokenInfo.owner = String(ledgerState.owner);
        }
      }
    }
    
    return tokenInfo;
  } catch (error) {
    console.error(`❌ Error querying token at address ${address}:`, error);
    return {
      name: 'Error',
      symbol: 'ERR',
      address,
      isInitialized: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Get all token pools
app.get('/api/token-pools', async (c) => {
  try {
    console.log('🔍 Starting to fetch all token pools...');
    const pools = [];

    for (const token of KNOWN_TOKEN_ADDRESSES) {
      console.log(`\n📋 Processing ${token.name}...`);
      
      const tokenInfo = await queryTokenInfo(token.address);
      
      // For now, we'll use placeholder pool data since we need to query liquidity pools separately
      // In a real implementation, you would query the liquidity pool contracts
      const poolData = {
        totalSupplied: Math.floor(Math.random() * 1000000000) + 100000000, // Random for demo
        supplyApy: Math.random() * 5 + 1, // Random APY between 1-6%
        totalBorrowed: Math.floor(Math.random() * 500000000) + 50000000, // Random for demo
        borrowedApy: Math.random() * 3 + 3, // Random APY between 3-6%
      };

      // Convert symbol to display values
      const getDisplayName = (symbol: string) => {
        const nameMap: Record<string, string> = {
          '2001': 'USD Coin',
          '2002': 'Wrapped Ethereum',
          '2003': 'Wrapped Bitcoin',
        };
        return nameMap[symbol] || symbol;
      };

      const getDisplaySymbol = (symbol: string) => {
        const symbolMap: Record<string, string> = {
          '2001': 'USDC',
          '2002': 'WETH',
          '2003': 'WBTC',
        };
        return symbolMap[symbol] || symbol;
      };

      const getTokenLogo = (symbol: string) => {
        const logoMap: Record<string, string> = {
          '2001': 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=040', // USDC - using ETH logo as placeholder
          '2002': '/eth.png', // WETH
          '2003': 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=040', // WBTC - using ETH logo as placeholder
        };
        return logoMap[symbol] || '/eth.png';
      };

      pools.push({
        id: token.symbol,
        name: getDisplayName(token.symbol),
        symbol: getDisplaySymbol(token.symbol),
        address: token.address,
        logo: getTokenLogo(token.symbol),
        totalSupplied: poolData.totalSupplied,
        supplyApy: poolData.supplyApy,
        totalBorrowed: poolData.totalBorrowed,
        borrowedApy: poolData.borrowedApy,
        totalSupply: tokenInfo.totalSupply,
        isInitialized: tokenInfo.isInitialized,
        error: tokenInfo.error
      });
    }

    console.log(`✅ Successfully fetched ${pools.length} token pools`);
    return c.json({ data: pools });
  } catch (error) {
    console.error('❌ Error fetching token pools:', error);
    return c.json({ error: 'Failed to fetch token pools' }, 500);
  }
});

// Query specific token by address
app.get('/api/token/:address', async (c) => {
  const address = c.req.param('address');
  
  try {
    const tokenInfo = await queryTokenInfo(address);

    if (tokenInfo.error) {
      return c.json({ error: tokenInfo.error }, 404);
    }

    // For now, we'll use placeholder pool data
    const poolData = {
      totalSupplied: Math.floor(Math.random() * 1000000000) + 100000000,
      supplyApy: Math.random() * 5 + 1,
      totalBorrowed: Math.floor(Math.random() * 500000000) + 50000000,
      borrowedApy: Math.random() * 3 + 3,
    };

    const getDisplayName = (symbol: string) => {
      const nameMap: Record<string, string> = {
        '2001': 'USD Coin',
        '2002': 'Wrapped Ethereum',
        '2003': 'Wrapped Bitcoin',
      };
      return nameMap[symbol] || symbol;
    };

    const getDisplaySymbol = (symbol: string) => {
      const symbolMap: Record<string, string> = {
        '2001': 'USDC',
        '2002': 'WETH',
        '2003': 'WBTC',
      };
      return symbolMap[symbol] || symbol;
    };

    const getTokenLogo = (symbol: string) => {
      const logoMap: Record<string, string> = {
        '2001': '/eth.png',
        '2002': '/eth.png',
        '2003': '/eth.png',
      };
      return logoMap[symbol] || '/eth.png';
    };

    const pool = {
      id: tokenInfo.symbol,
      name: getDisplayName(tokenInfo.symbol),
      symbol: getDisplaySymbol(tokenInfo.symbol),
      address: tokenInfo.address,
      logo: getTokenLogo(tokenInfo.symbol),
      totalSupplied: poolData.totalSupplied,
      supplyApy: poolData.supplyApy,
      totalBorrowed: poolData.totalBorrowed,
      borrowedApy: poolData.borrowedApy,
      totalSupply: tokenInfo.totalSupply,
      isInitialized: tokenInfo.isInitialized,
      error: tokenInfo.error
    };

    return c.json({ data: pool });
  } catch (error) {
    console.error('❌ Error fetching token by address:', error);
    return c.json({ error: 'Failed to fetch token' }, 500);
  }
});

export default app;
