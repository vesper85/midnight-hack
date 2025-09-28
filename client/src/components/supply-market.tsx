"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { useTokenPools } from "@/hooks/useTokenPools"
import { useMemo } from "react"
import type { TokenPoolInfo } from "@/lib/token-api"

// Types for supply market data (user's wallet assets)
export type SupplyMarketAsset = {
  id: string
  asset: string
  icon: string
  walletBalance: string
  walletBalanceUsd: string
  price: string
  supplyApy: string
  collateralFactor: string
  canSupply: boolean
}

function formatTokenPoolForSupplyMarket(tokenPool: TokenPoolInfo): SupplyMarketAsset {
  // Calculate a mock price based on total supplied (for demonstration)
  const mockPrice = tokenPool.totalSupplied > 0 ? (tokenPool.totalSupplied * 0.1).toFixed(2) : "1.00"
  
  // Get collateral factor based on token type (mock values)
  const getCollateralFactor = (symbol: string) => {
    switch (symbol.toUpperCase()) {
      case 'ETH':
      case 'WETH':
        return "75%"
      case 'USDC':
      case 'USDT':
      case 'DAI':
        return "75%"
      case 'WBTC':
        return "60%"
      case 'LINK':
        return "65%"
      default:
        return "50%"
    }
  }

  // Get icon based on token symbol
  const getTokenIcon = (symbol: string) => {
    switch (symbol.toUpperCase()) {
      case 'ETH':
      case 'WETH':
        return "🔷"
      case 'USDC':
        return "💰"
      case 'USDT':
        return "💲"
      case 'DAI':
        return "🟡"
      case 'WBTC':
        return "🟠"
      case 'LINK':
        return "🔗"
      default:
        return "🪙"
    }
  }

  return {
    id: `${tokenPool.address}-wallet`,
    asset: tokenPool.symbol,
    icon: getTokenIcon(tokenPool.symbol),
    walletBalance: `0.00 ${tokenPool.symbol}`, // Set wallet balance to 0 as requested
    walletBalanceUsd: "$0.00", // Set USD balance to 0 as requested
    price: `$${mockPrice}`,
    supplyApy: `${tokenPool.supplyApy.toFixed(2)}%`,
    collateralFactor: getCollateralFactor(tokenPool.symbol),
    canSupply: true, // All tokens can be supplied by default
  }
}

// Columns for supply market
const supplyMarketColumns: ColumnDef<SupplyMarketAsset>[] = [
  {
    accessorKey: "asset",
    header: "Asset",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="text-lg">{row.original.icon}</span>
        <span className="font-medium">{row.getValue("asset")}</span>
      </div>
    ),
  },
  {
    accessorKey: "walletBalance",
    header: "Wallet Balance",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("walletBalance")}</div>
    ),
  },
  {
    accessorKey: "walletBalanceUsd",
    header: "Balance ($)",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("walletBalanceUsd")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("price")}</div>
    ),
  },
  {
    accessorKey: "supplyApy",
    header: "Supply APY",
    cell: ({ row }) => (
      <div className="font-medium text-green-600">{row.getValue("supplyApy")}</div>
    ),
  },
  {
    accessorKey: "collateralFactor",
    header: "Collateral Factor",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("collateralFactor")}</div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-end">
        <Button
          variant="default"
          size="sm"
          disabled={!row.original.canSupply}
        >
          SUPPLY
        </Button>
      </div>
    ),
  },
]

export function SupplyMarket() {
  const { data: tokenPools, isLoading, error } = useTokenPools()

  // Transform token pool data for supply market table
  const supplyMarketData = useMemo(() => {
    if (!tokenPools) return []
    return tokenPools.map(formatTokenPoolForSupplyMarket)
  }, [tokenPools])

  // Calculate total wallet balance (always $0.00 since all wallet balances are 0)
  const totalWalletBalance = "$0.00"

  if (isLoading) {
    return (
      <div className="w-full space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Supply Market</h2>
        </div>
        <div className="rounded-lg border p-8 text-center">
          <p className="text-muted-foreground">Loading token pools...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Supply Market</h2>
        </div>
        <div className="rounded-lg border p-8 text-center">
          <p className="text-red-500">Error loading token pools</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Supply Market</h2>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Total Wallet Balance: <span className="font-medium text-foreground">{totalWalletBalance}</span></span>
        </div>
      </div>
      <div className="rounded-lg border">
        <DataTable columns={supplyMarketColumns} data={supplyMarketData} />
      </div>
      <p className="text-sm text-muted-foreground">
        Supply your assets to earn interest and use them as collateral for borrowing.
      </p>
    </div>
  )
}
