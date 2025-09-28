import { useQuery } from '@tanstack/react-query';
import { getTokenPools, type TokenPoolInfo } from '@/lib/token-api';

export function useTokenPools() {
  return useQuery<TokenPoolInfo[]>({
    queryKey: ['tokenPools'],
    queryFn: getTokenPools,
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Refetch every minute
  });
}

export function useTokenPool(address: string) {
  return useQuery<TokenPoolInfo | null>({
    queryKey: ['tokenPool', address],
    queryFn: () => import('@/lib/token-api').then(api => api.getTokenByAddress(address)),
    enabled: !!address,
    staleTime: 30000,
  });
}
