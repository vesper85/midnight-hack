// Token API functions for querying chain data via server API

export interface TokenInfo {
  name: string;
  symbol: string;
  address: string;
  totalSupply?: bigint;
  owner?: string;
  isInitialized?: boolean;
  error?: string;
}

export interface TokenPoolInfo {
  id: string;
  name: string;
  symbol: string;
  address: string;
  logo: string;
  totalSupplied: number;
  supplyApy: number;
  totalBorrowed: number;
  borrowedApy: number;
  totalSupply?: bigint;
  isInitialized?: boolean;
  error?: string;
}

// API base URL - in production this would be your deployed server URL
const API_BASE_URL = 'http://localhost:3000';

// Query token information from the server API
export async function queryTokenInfo(address: string): Promise<TokenInfo> {
  try {
    console.log(`🔍 Querying token at address: ${address}`);
    
    const response = await fetch(`${API_BASE_URL}/api/token/${address}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      return {
        name: 'Error',
        symbol: 'ERR',
        address,
        error: errorData.error || 'Failed to fetch token info'
      };
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`❌ Error querying token at address ${address}:`, error);
    return {
      name: 'Error',
      symbol: 'ERR',
      address,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Get all token pools for the Core Assets table
export async function getTokenPools(): Promise<TokenPoolInfo[]> {
  try {
    console.log('🔍 Starting to fetch all token pools...');
    
    const response = await fetch(`${API_BASE_URL}/api/token-pools`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`✅ Successfully fetched ${data.data.length} token pools`);
    return data.data;
  } catch (error) {
    console.error('❌ Error fetching token pools:', error);
    return [];
  }
}

// Query specific token by address
export async function getTokenByAddress(address: string): Promise<TokenPoolInfo | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/token/${address}`);
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('❌ Error fetching token by address:', error);
    return null;
  }
}
