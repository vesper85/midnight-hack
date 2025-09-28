"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"

// Types for borrow market data
export type BorrowMarketAsset = {
  id: string
  asset: string
  icon: string
  price: string
  availableLiquidity: string
  variableBorrowApr: string
  stableBorrowApr: string
  maxLtv: string
  liquidationThreshold: string
  utilization: string
  canBorrow: boolean
}

// Sample borrow market data - all assets available for borrowing
const borrowMarketData: BorrowMarketAsset[] = []

// Columns for borrow market
const borrowMarketColumns: ColumnDef<BorrowMarketAsset>[] = [
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
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("price")}</div>
    ),
  },
  {
    accessorKey: "availableLiquidity",
    header: "Available Liquidity",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("availableLiquidity")}</div>
    ),
  },
  {
    accessorKey: "variableBorrowApr",
    header: "Variable APR",
    cell: ({ row }) => (
      <div className="font-medium text-orange-600">{row.getValue("variableBorrowApr")}</div>
    ),
  },
  {
    accessorKey: "stableBorrowApr",
    header: "Stable APR",
    cell: ({ row }) => (
      <div className="font-medium text-blue-600">{row.getValue("stableBorrowApr")}</div>
    ),
  },
  {
    accessorKey: "maxLtv",
    header: "Max LTV",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("maxLtv")}</div>
    ),
  },
  {
    accessorKey: "liquidationThreshold",
    header: "Liquidation Threshold",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("liquidationThreshold")}</div>
    ),
  },
  {
    accessorKey: "utilization",
    header: "Utilization",
    cell: ({ row }) => {
      const utilization = parseFloat(row.getValue("utilization"))
      const utilizationColor = utilization > 80 ? "text-red-600" : utilization > 50 ? "text-orange-600" : "text-green-600"
      return (
        <div className={`font-medium ${utilizationColor}`}>
          {row.getValue("utilization")}
        </div>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={!row.original.canBorrow}
        >
          Variable
        </Button>
        <Button
          variant="default"
          size="sm"
          disabled={!row.original.canBorrow}
        >
          Stable
        </Button>
      </div>
    ),
  },
]

export function BorrowMarket() {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Borrow Market</h2>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Available Borrow Power: <span className="font-medium text-foreground">$1,245.50</span></span>
          <span>•</span>
          <span>Health Factor: <span className="font-medium text-green-600">2.45</span></span>
        </div>
      </div>
      <div className="rounded-lg border">
        <DataTable columns={borrowMarketColumns} data={borrowMarketData} />
      </div>
    </div>
  )
}
