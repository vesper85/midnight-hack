"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"

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

// Sample supply market data - user's wallet assets available for supply
const supplyMarketData: SupplyMarketAsset[] = [
  {
    id: "eth-wallet",
    asset: "ETH",
    icon: "🔷",
    walletBalance: "2.45 ETH",
    walletBalanceUsd: "$977.65",
    price: "$398.96",
    supplyApy: "0.06%",
    collateralFactor: "75%",
    canSupply: true,
  },
  {
    id: "usdc-wallet",
    asset: "USDC",
    icon: "💰",
    walletBalance: "1,250.00 USDC",
    walletBalanceUsd: "$1,237.50",
    price: "$0.99",
    supplyApy: "0.98%",
    collateralFactor: "75%",
    canSupply: true,
  },
  {
    id: "dai-wallet",
    asset: "DAI",
    icon: "🟡",
    walletBalance: "750.50 DAI",
    walletBalanceUsd: "$757.51",
    price: "$1.01",
    supplyApy: "4.73%",
    collateralFactor: "75%",
    canSupply: true,
  },
  {
    id: "link-wallet",
    asset: "LINK",
    icon: "🔗",
    walletBalance: "25.00 LINK",
    walletBalanceUsd: "$243.25",
    price: "$9.73",
    supplyApy: "1.24%",
    collateralFactor: "65%",
    canSupply: true,
  },
  {
    id: "wbtc-wallet",
    asset: "WBTC",
    icon: "🟠",
    walletBalance: "0.05 WBTC",
    walletBalanceUsd: "$584.50",
    price: "$11.69k",
    supplyApy: "0.00%",
    collateralFactor: "60%",
    canSupply: true,
  },
  {
    id: "usdt-wallet",
    asset: "USDT",
    icon: "💲",
    walletBalance: "500.00 USDT",
    walletBalanceUsd: "$500.00",
    price: "$1.00",
    supplyApy: "2.29%",
    collateralFactor: "0%",
    canSupply: false, // Cannot be used as collateral
  },
]

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
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Supply Market</h2>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Total Wallet Balance: <span className="font-medium text-foreground">$4,300.41</span></span>
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
