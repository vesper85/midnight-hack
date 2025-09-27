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
const borrowMarketData: BorrowMarketAsset[] = [
  {
    id: "lend-borrow",
    asset: "LEND",
    icon: "🔷",
    price: "$0.33",
    availableLiquidity: "125,000 LEND",
    variableBorrowApr: "0.01%",
    stableBorrowApr: "0.05%",
    maxLtv: "50%",
    liquidationThreshold: "65%",
    utilization: "0.00%",
    canBorrow: true,
  },
  {
    id: "link-borrow",
    asset: "LINK",
    icon: "🔗",
    price: "$9.73",
    availableLiquidity: "50,000 LINK",
    variableBorrowApr: "4.38%",
    stableBorrowApr: "5.12%",
    maxLtv: "65%",
    liquidationThreshold: "80%",
    utilization: "27.85%",
    canBorrow: true,
  },
  {
    id: "usdc-borrow",
    asset: "USDC",
    icon: "💰",
    price: "$0.99",
    availableLiquidity: "2,500,000 USDC",
    variableBorrowApr: "3.17%",
    stableBorrowApr: "3.85%",
    maxLtv: "75%",
    liquidationThreshold: "85%",
    utilization: "23.35%",
    canBorrow: true,
  },
  {
    id: "tusd-borrow",
    asset: "TUSD",
    icon: "💵",
    price: "$1.00",
    availableLiquidity: "800,000 TUSD",
    variableBorrowApr: "1.53%",
    stableBorrowApr: "2.10%",
    maxLtv: "1%",
    liquidationThreshold: "10%",
    utilization: "10.77%",
    canBorrow: false, // Very low LTV makes it impractical
  },
  {
    id: "usdt-borrow",
    asset: "USDT",
    icon: "💲",
    price: "$1.00",
    availableLiquidity: "1,800,000 USDT",
    variableBorrowApr: "4.72%",
    stableBorrowApr: "5.25%",
    maxLtv: "0%",
    liquidationThreshold: "0%",
    utilization: "41.00%",
    canBorrow: false, // Cannot be borrowed (0% LTV)
  },
  {
    id: "eth-borrow",
    asset: "ETH",
    icon: "🔷",
    price: "$398.96",
    availableLiquidity: "15,000 ETH",
    variableBorrowApr: "0.72%",
    stableBorrowApr: "1.25%",
    maxLtv: "75%",
    liquidationThreshold: "80%",
    utilization: "7.04%",
    canBorrow: true,
  },
  {
    id: "wbtc-borrow",
    asset: "WBTC",
    icon: "🟠",
    price: "$11.69k",
    availableLiquidity: "500 WBTC",
    variableBorrowApr: "0.20%",
    stableBorrowApr: "0.75%",
    maxLtv: "60%",
    liquidationThreshold: "70%",
    utilization: "2.04%",
    canBorrow: true,
  },
  {
    id: "dai-borrow",
    asset: "DAI",
    icon: "🟡",
    price: "$1.01",
    availableLiquidity: "3,200,000 DAI",
    variableBorrowApr: "6.52%",
    stableBorrowApr: "7.15%",
    maxLtv: "75%",
    liquidationThreshold: "80%",
    utilization: "60.28%",
    canBorrow: true,
  },
  {
    id: "ren-borrow",
    asset: "REN",
    icon: "🔵",
    price: "$0.22",
    availableLiquidity: "75,000 REN",
    variableBorrowApr: "0.00%",
    stableBorrowApr: "0.25%",
    maxLtv: "50%",
    liquidationThreshold: "65%",
    utilization: "0.05%",
    canBorrow: true,
  },
]

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
