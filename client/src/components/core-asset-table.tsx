"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button, buttonVariants } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Link } from "@tanstack/react-router"
import { cn } from "@/lib/utils"
import { useTokenPools } from "@/hooks/useTokenPools"
import { type TokenPoolInfo } from "@/lib/token-api"
import { Loader2 } from "lucide-react"

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
const columns: ColumnDef<TokenPoolInfo>[] = [
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
              target.src = '/eth.png'
            }}
          />
          <div>
            <div className="font-medium text-foreground">{asset.name}</div>
            <div className="text-sm text-muted-foreground">{asset.symbol}</div>
            {asset.error && (
              <div className="text-xs text-red-500">Error: {asset.error}</div>
            )}
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
        <Link
          to={'/$id'}
          params={{ id: asset.id }}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Details
        </Link>
      )
    },
  },
]

export function CoreAssetTable() {
  const { data: tokenPools, isLoading, error } = useTokenPools()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading token pools...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8 text-red-500">
        Error loading token pools: {error.message}
      </div>
    )
  }

  if (!tokenPools || tokenPools.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 text-muted-foreground">
        No token pools found
      </div>
    )
  }

  return <DataTable columns={columns} data={tokenPools} />
}