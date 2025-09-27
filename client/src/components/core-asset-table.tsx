"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"

// Asset data interface
interface Asset {
  id: string
  name: string
  symbol: string
  logo: string
  totalSupplied: number
  supplyApy: number
  totalBorrowed: number
  borrowedApy: number
}

// Mock data for demonstration
const mockAssets: Asset[] = [
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    totalSupplied: 125000000,
    supplyApy: 3.25,
    totalBorrowed: 85000000,
    borrowedApy: 5.75,
  },
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    totalSupplied: 2100000,
    supplyApy: 2.85,
    totalBorrowed: 1500000,
    borrowedApy: 4.95,
  },
  {
    id: "usdc",
    name: "USD Coin",
    symbol: "USDC",
    logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    totalSupplied: 500000000,
    supplyApy: 4.15,
    totalBorrowed: 350000000,
    borrowedApy: 6.25,
  },
  {
    id: "dai",
    name: "Dai Stablecoin",
    symbol: "DAI",
    logo: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png",
    totalSupplied: 200000000,
    supplyApy: 3.95,
    totalBorrowed: 140000000,
    borrowedApy: 5.85,
  },
  {
    id: "usdt",
    name: "Tether USD",
    symbol: "USDT",
    logo: "https://cryptologos.cc/logos/tether-usdt-logo.png",
    totalSupplied: 750000000,
    supplyApy: 3.75,
    totalBorrowed: 520000000,
    borrowedApy: 6.05,
  },
  {
    id: "link",
    name: "Chainlink",
    symbol: "LINK",
    logo: "https://cryptologos.cc/logos/chainlink-link-logo.png",
    totalSupplied: 45000000,
    supplyApy: 2.65,
    totalBorrowed: 28000000,
    borrowedApy: 4.45,
  },
  {
    id: "uni",
    name: "Uniswap",
    symbol: "UNI",
    logo: "https://cryptologos.cc/logos/uniswap-uni-logo.png",
    totalSupplied: 35000000,
    supplyApy: 3.15,
    totalBorrowed: 22000000,
    borrowedApy: 5.35,
  },
  {
    id: "aave",
    name: "Aave",
    symbol: "AAVE",
    logo: "https://cryptologos.cc/logos/aave-aave-logo.png",
    totalSupplied: 12000000,
    supplyApy: 2.95,
    totalBorrowed: 8500000,
    borrowedApy: 4.75,
  },
  {
    id: "comp",
    name: "Compound",
    symbol: "COMP",
    logo: "https://cryptologos.cc/logos/compound-comp-logo.png",
    totalSupplied: 8000000,
    supplyApy: 2.45,
    totalBorrowed: 5500000,
    borrowedApy: 4.25,
  },
  {
    id: "mkr",
    name: "Maker",
    symbol: "MKR",
    logo: "https://cryptologos.cc/logos/maker-mkr-logo.png",
    totalSupplied: 950000,
    supplyApy: 1.85,
    totalBorrowed: 650000,
    borrowedApy: 3.65,
  },
  {
    id: "snx",
    name: "Synthetix",
    symbol: "SNX",
    logo: "https://cryptologos.cc/logos/synthetix-snx-logo.png",
    totalSupplied: 18000000,
    supplyApy: 3.45,
    totalBorrowed: 12000000,
    borrowedApy: 5.95,
  },
  {
    id: "crv",
    name: "Curve DAO Token",
    symbol: "CRV",
    logo: "https://cryptologos.cc/logos/curve-dao-token-crv-logo.png",
    totalSupplied: 25000000,
    supplyApy: 2.75,
    totalBorrowed: 16000000,
    borrowedApy: 4.55,
  },
]

// Format large numbers for display
function formatNumber(num: number): string {
  if (num >= 1e9) {
    return `$${(num / 1e9).toFixed(2)}B`
  }
  if (num >= 1e6) {
    return `$${(num / 1e6).toFixed(2)}M`
  }
  if (num >= 1e3) {
    return `$${(num / 1e3).toFixed(2)}K`
  }
  return `$${num.toFixed(2)}`
}

// Column definitions
const columns: ColumnDef<Asset>[] = [
  {
    accessorKey: "asset",
    header: "Asset",
    cell: ({ row }) => {
      const asset = row.original
      return (
        <div className="flex items-center space-x-3">
          <img
            src={asset.logo}
            alt={asset.name}
            className="h-8 w-8 rounded-full"
            onError={(e) => {
              // Fallback to a placeholder if image fails to load
              const target = e.target as HTMLImageElement
              target.src = `https://via.placeholder.com/32/6366f1/ffffff?text=${asset.symbol.charAt(0)}`
            }}
          />
          <div>
            <div className="font-medium text-foreground">{asset.name}</div>
            <div className="text-sm text-muted-foreground">{asset.symbol}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "totalSupplied",
    header: "Total Supplied",
    cell: ({ row }) => {
      const amount = row.getValue("totalSupplied") as number
      return <div className="font-medium">{formatNumber(amount)}</div>
    },
  },
  {
    accessorKey: "supplyApy",
    header: "Supply APY",
    cell: ({ row }) => {
      const apy = row.getValue("supplyApy") as number
      return (
        <div className="font-medium text-green-600 dark:text-green-400">
          {apy.toFixed(2)}%
        </div>
      )
    },
  },
  {
    accessorKey: "totalBorrowed",
    header: "Total Borrowed",
    cell: ({ row }) => {
      const amount = row.getValue("totalBorrowed") as number
      return <div className="font-medium">{formatNumber(amount)}</div>
    },
  },
  {
    accessorKey: "borrowedApy",
    header: "Borrow APY (Variable)",
    cell: ({ row }) => {
      const apy = row.getValue("borrowedApy") as number
      return (
        <div className="font-medium text-orange-600 dark:text-orange-400">
          {apy.toFixed(2)}%
        </div>
      )
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const asset = row.original
      return (
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            // TODO: Navigate to asset detail page when route is created
            console.log(`View details for ${asset.name} (${asset.symbol})`)
          }}
        >
          Details
        </Button>
      )
    },
  },
]

export function CoreAssetTable() {
  return (
      <DataTable columns={columns} data={mockAssets} />
  )
}