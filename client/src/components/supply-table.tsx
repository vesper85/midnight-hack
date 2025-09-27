"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";

// Types for supply table data
export type SupplyAsset = {
  id: string;
  asset: string;
  icon: string;
  supplied: string;
  suppliedUsd: string;
  supplyApy: string;
  collateralFactor: string;
  collateral: string;
  canDisable: boolean;
};

// Sample data based on the image
const supplyData: SupplyAsset[] = [
  {
    id: "eth-supply",
    asset: "ETH",
    icon: "🔷", // You can replace with actual icon components
    supplied: "0.20 ETH",
    suppliedUsd: "$80.29",
    supplyApy: "0.06%",
    collateralFactor: "75%",
    collateral: "75%",
    canDisable: true,
  },
];

// Market info data - enhanced for borrowing
export type MarketAsset = {
  id: string;
  asset: string;
  icon: string;
  price: string;
  supplyApy: string;
  collateralFactor: string;
  borrowApy: string;
  utilization: string;
  availableLiquidity: string;
  maxLtv: string;
  liquidationThreshold: string;
};

const marketData: MarketAsset[] = [
  {
    id: "lend",
    asset: "LEND",
    icon: "🔷",
    price: "$0.33",
    supplyApy: "0.00%",
    collateralFactor: "50%",
    borrowApy: "0.01%",
    utilization: "0.00%",
    availableLiquidity: "125,000",
    maxLtv: "50%",
    liquidationThreshold: "65%",
  },
  {
    id: "link",
    asset: "LINK",
    icon: "🔗",
    price: "$9.73",
    supplyApy: "1.24%",
    collateralFactor: "65%",
    borrowApy: "4.38%",
    utilization: "27.85%",
    availableLiquidity: "50,000",
    maxLtv: "65%",
    liquidationThreshold: "80%",
  },
  {
    id: "usdc",
    asset: "USDC",
    icon: "💰",
    price: "$0.99",
    supplyApy: "0.98%",
    collateralFactor: "75%",
    borrowApy: "3.17%",
    utilization: "23.35%",
    availableLiquidity: "2.5M",
    maxLtv: "75%",
    liquidationThreshold: "85%",
  },
  {
    id: "tusd",
    asset: "TUSD",
    icon: "💵",
    price: "$1.00",
    supplyApy: "0.16%",
    collateralFactor: "1%",
    borrowApy: "1.53%",
    utilization: "10.77%",
    availableLiquidity: "800K",
    maxLtv: "1%",
    liquidationThreshold: "10%",
  },
  {
    id: "usdt",
    asset: "USDT",
    icon: "💲",
    price: "$1.00",
    supplyApy: "2.29%",
    collateralFactor: "0%",
    borrowApy: "4.72%",
    utilization: "41.00%",
    availableLiquidity: "1.8M",
    maxLtv: "0%",
    liquidationThreshold: "0%",
  },
  {
    id: "eth",
    asset: "ETH",
    icon: "🔷",
    price: "$398.96",
    supplyApy: "0.06%",
    collateralFactor: "75%",
    borrowApy: "0.72%",
    utilization: "7.04%",
    availableLiquidity: "15,000",
    maxLtv: "75%",
    liquidationThreshold: "80%",
  },
  {
    id: "wbtc",
    asset: "WBTC",
    icon: "🟠",
    price: "$11.69k",
    supplyApy: "0.00%",
    collateralFactor: "60%",
    borrowApy: "0.20%",
    utilization: "2.04%",
    availableLiquidity: "500",
    maxLtv: "60%",
    liquidationThreshold: "70%",
  },
  {
    id: "dai",
    asset: "DAI",
    icon: "🟡",
    price: "$1.01",
    supplyApy: "4.73%",
    collateralFactor: "75%",
    borrowApy: "6.52%",
    utilization: "60.28%",
    availableLiquidity: "3.2M",
    maxLtv: "75%",
    liquidationThreshold: "80%",
  },
  {
    id: "ren",
    asset: "REN",
    icon: "🔵",
    price: "$0.22",
    supplyApy: "0.00%",
    collateralFactor: "50%",
    borrowApy: "0.00%",
    utilization: "0.05%",
    availableLiquidity: "75,000",
    maxLtv: "50%",
    liquidationThreshold: "65%",
  },
];

const supplyColumns: ColumnDef<SupplyAsset>[] = [
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
    accessorKey: "supplied",
    header: "Supplied",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("supplied")}</div>
    ),
  },
  {
    accessorKey: "suppliedUsd",
    header: "Supplied ($)",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("suppliedUsd")}</div>
    ),
  },
  {
    accessorKey: "supplyApy",
    header: "Supply APY",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("supplyApy")}</div>
    ),
  },
  {
    accessorKey: "collateralFactor",
    header: "Collateral factor",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("collateralFactor")}</div>
    ),
  },
  {
    id: "collateral",
    header: "Collateral",
    cell: ({ row }) => (
      <div className="flex items-center justify-end">
        <Button
          variant="secondary"
          size="sm"
          disabled={!row.original.canDisable}
        >
          DISABLE
        </Button>
      </div>
    ),
  },
];

const marketColumns: ColumnDef<MarketAsset>[] = [
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
    accessorKey: "supplyApy",
    header: "Supply APY",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("supplyApy")}</div>
    ),
  },
  {
    accessorKey: "borrowApy",
    header: "Borrow APY",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("borrowApy")}</div>
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
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("utilization")}</div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" size="sm">
          SUPPLY
        </Button>
        <Button
          variant="default"
          size="sm"
          disabled={row.original.maxLtv === "0%"}
        >
          BORROW
        </Button>
      </div>
    ),
  },
];

export function SupplyTable() {
  return <DataTable columns={supplyColumns} data={supplyData} />;
}
