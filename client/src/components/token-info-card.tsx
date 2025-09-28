import { type TokenPoolInfo } from "@/lib/token-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TokenInfoCardProps {
  token: TokenPoolInfo;
}

export function TokenInfoCard({ token }: TokenInfoCardProps) {
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

  const formatBigInt = (value?: bigint): string => {
    if (!value) return "N/A";
    return value.toString();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <img
            src={token.logo}
            alt={token.name}
            className="h-12 w-12 rounded-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/eth.png';
            }}
          />
          <div>
            <CardTitle className="text-xl">{token.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{token.symbol}</p>
            {token.error && (
              <p className="text-xs text-red-500">Error: {token.error}</p>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Total Supplied</h4>
            <p className="text-lg font-semibold">{formatNumber(token.totalSupplied)}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Supply APY</h4>
            <p className="text-lg font-semibold text-green-600 dark:text-green-400">
              {token.supplyApy.toFixed(2)}%
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Total Borrowed</h4>
            <p className="text-lg font-semibold">{formatNumber(token.totalBorrowed)}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Borrow APY</h4>
            <p className="text-lg font-semibold text-orange-600 dark:text-orange-400">
              {token.borrowedApy.toFixed(2)}%
            </p>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Token Details</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Contract Address:</span>
              <span className="font-mono text-xs break-all">{token.address}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Supply:</span>
              <span className="font-mono">{formatBigInt(token.totalSupply)}</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <span className={token.isInitialized ? "text-green-600" : "text-red-600"}>
                {token.isInitialized ? "Initialized" : "Not Initialized"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
