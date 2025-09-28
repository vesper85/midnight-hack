import { createFileRoute } from "@tanstack/react-router";
import { CoreAssetTable } from "@/components/core-asset-table";
import { TokenInfoCard } from "@/components/token-info-card";
import { Search, RefreshCw, TrendingUp, TrendingDown } from "lucide-react";
import { useTokenPools } from "@/hooks/useTokenPools";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: tokenPools, refetch, isFetching } = useTokenPools();

  console.log('tokenPools', tokenPools);

  // Calculate totals from token pools data
  const totalSupplied = tokenPools?.reduce((sum, pool) => sum + pool.totalSupplied, 0) || 0;
  const totalBorrowed = tokenPools?.reduce((sum, pool) => sum + pool.totalBorrowed, 0) || 0;
  const totalAvailable = totalSupplied - totalBorrowed;

  const formatNumber = (num: number): string => {
    if (num >= 1e9) {
      return `$${(num / 1e9).toFixed(2)}B`;
    }
    if (num >= 1e6) {
      return `$${(num / 1e6).toFixed(2)}M`;
    }
    if (num >= 1e3) {
      return `$${(num / 1e3).toFixed(2)}K`;
    }
    return `$${num.toFixed(2)}`;
  };

  return (
    <section className="w-full h-full flex flex-col gap-y-6">
      {/* Market Overview Cards */}
      <div className="grid grid-cols-3 gap-10">
        <Card className="bg-gradient-to-b from-secondary/20 via-25% via-secondary/40 to-secondary/70">
          <CardContent className="p-4">
            <div className="flex items-center gap-x-2 mb-2">
              <TrendingUp className="size-5 text-green-500" />
              <h2 className="text-lg text-muted-foreground">Total market size</h2>
            </div>
            <p className="flex items-center gap-x-0.5 text-4xl">
              <span className="text-muted-foreground">$</span>
              <span>{formatNumber(totalSupplied)}</span>
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-b from-secondary/20 via-25% via-secondary/40 to-secondary/70">
          <CardContent className="p-4">
            <div className="flex items-center gap-x-2 mb-2">
              <TrendingUp className="size-5 text-blue-500" />
              <h2 className="text-lg text-muted-foreground">Total available</h2>
            </div>
            <p className="flex items-center gap-x-0.5 text-4xl">
              <span className="text-muted-foreground">$</span>
              <span>{formatNumber(totalAvailable)}</span>
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-b from-secondary/20 via-25% via-secondary/40 to-secondary/70">
          <CardContent className="p-4">
            <div className="flex items-center gap-x-2 mb-2">
              <TrendingDown className="size-5 text-orange-500" />
              <h2 className="text-lg text-muted-foreground">Total borrows</h2>
            </div>
            <p className="flex items-center gap-x-0.5 text-4xl">
              <span className="text-muted-foreground">$</span>
              <span>{formatNumber(totalBorrowed)}</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Token Pools Overview */}
      {tokenPools && tokenPools.length > 0 && (
        <div className="w-full">
          <h2 className="text-2xl font-medium mb-4">Token Pools Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tokenPools.map((token) => (
              <TokenInfoCard key={token.id} token={token} />
            ))}
          </div>
        </div>
      )}

      {/* Core Assets Table */}
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Core Assets</CardTitle>
            <div className="flex items-center gap-x-4">
              <div className="flex items-center gap-x-2 bg-secondary p-2 rounded-md w-full max-w-sm px-4">
                <Search className="size-4" />
                <input className="bg-none border-none w-full foucs:border-none foucs:ring-0 focus:outline-none" placeholder="Search assets for lending or borrowing" />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                disabled={isFetching}
                className="flex items-center gap-x-2"
              >
                <RefreshCw className={`size-4 ${isFetching ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CoreAssetTable />
        </CardContent>
      </Card>
    </section>
  );
}

export default Index;
