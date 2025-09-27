"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";

// Types for borrow table data
export type BorrowAsset = {
  id: string;
  asset: string;
  icon: string;
  borrowed: string;
  borrowedUsd: string;
  borrowApr: string;
  borrowType: "Variable" | "Stable";
  healthFactor: string;
  liquidationThreshold: string;
  accruedInterest: string;
  canRepay: boolean;
};

// Enhanced market asset type for borrowable assets
export type BorrowableMarketAsset = {
  id: string;
  asset: string;
  icon: string;
  price: string;
  availableLiquidity: string;
  variableBorrowApr: string;
  stableBorrowApr: string;
  loanToValue: string;
  liquidationThreshold: string;
  utilization: string;
};

// Sample borrow data - user's current borrowed positions
const borrowData: BorrowAsset[] = [
  {
    id: "dai-borrow",
    asset: "DAI",
    icon: "🟡",
    borrowed: "500.00 DAI",
    borrowedUsd: "$505.00",
    borrowApr: "6.52%",
    borrowType: "Variable",
    healthFactor: "1.85",
    liquidationThreshold: "80%",
    accruedInterest: "12.50 DAI",
    canRepay: true,
  },
  {
    id: "usdc-borrow",
    asset: "USDC",
    icon: "💰",
    borrowed: "300.00 USDC",
    borrowedUsd: "$297.00",
    borrowApr: "3.17%",
    borrowType: "Stable",
    healthFactor: "2.10",
    liquidationThreshold: "85%",
    accruedInterest: "4.25 USDC",
    canRepay: true,
  },
];

// Sample borrowable market data
const borrowableMarketData: BorrowableMarketAsset[] = [
  {
    id: "lend",
    asset: "LEND",
    icon: "🔷",
    price: "$0.33",
    availableLiquidity: "125,000 LEND",
    variableBorrowApr: "0.01%",
    stableBorrowApr: "0.05%",
    loanToValue: "50%",
    liquidationThreshold: "65%",
    utilization: "0.00%",
  },
  {
    id: "link",
    asset: "LINK",
    icon: "🔗",
    price: "$9.73",
    availableLiquidity: "50,000 LINK",
    variableBorrowApr: "4.38%",
    stableBorrowApr: "5.12%",
    loanToValue: "65%",
    liquidationThreshold: "80%",
    utilization: "27.85%",
  },
  {
    id: "usdc",
    asset: "USDC",
    icon: "💰",
    price: "$0.99",
    availableLiquidity: "2,500,000 USDC",
    variableBorrowApr: "3.17%",
    stableBorrowApr: "3.85%",
    loanToValue: "75%",
    liquidationThreshold: "85%",
    utilization: "23.35%",
  },
  {
    id: "tusd",
    asset: "TUSD",
    icon: "💵",
    price: "$1.00",
    availableLiquidity: "800,000 TUSD",
    variableBorrowApr: "1.53%",
    stableBorrowApr: "2.10%",
    loanToValue: "1%",
    liquidationThreshold: "10%",
    utilization: "10.77%",
  },
  {
    id: "usdt",
    asset: "USDT",
    icon: "💲",
    price: "$1.00",
    availableLiquidity: "1,800,000 USDT",
    variableBorrowApr: "4.72%",
    stableBorrowApr: "5.25%",
    loanToValue: "0%",
    liquidationThreshold: "0%",
    utilization: "41.00%",
  },
  {
    id: "eth",
    asset: "ETH",
    icon: "🔷",
    price: "$398.96",
    availableLiquidity: "15,000 ETH",
    variableBorrowApr: "0.72%",
    stableBorrowApr: "1.25%",
    loanToValue: "75%",
    liquidationThreshold: "80%",
    utilization: "7.04%",
  },
  {
    id: "wbtc",
    asset: "WBTC",
    icon: "🟠",
    price: "$11.69k",
    availableLiquidity: "500 WBTC",
    variableBorrowApr: "0.20%",
    stableBorrowApr: "0.75%",
    loanToValue: "60%",
    liquidationThreshold: "70%",
    utilization: "2.04%",
  },
  {
    id: "dai",
    asset: "DAI",
    icon: "🟡",
    price: "$1.01",
    availableLiquidity: "3,200,000 DAI",
    variableBorrowApr: "6.52%",
    stableBorrowApr: "7.15%",
    loanToValue: "75%",
    liquidationThreshold: "80%",
    utilization: "60.28%",
  },
  {
    id: "ren",
    asset: "REN",
    icon: "🔵",
    price: "$0.22",
    availableLiquidity: "75,000 REN",
    variableBorrowApr: "0.00%",
    stableBorrowApr: "0.25%",
    loanToValue: "50%",
    liquidationThreshold: "65%",
    utilization: "0.05%",
  },
];

// Columns for user's borrowed assets
const borrowColumns: ColumnDef<BorrowAsset>[] = [
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
    accessorKey: "borrowed",
    header: "Borrowed",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("borrowed")}</div>
    ),
  },
  {
    accessorKey: "borrowedUsd",
    header: "Borrowed ($)",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("borrowedUsd")}</div>
    ),
  },
  {
    accessorKey: "borrowApr",
    header: "Borrow APR",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("borrowApr")}</div>
    ),
  },
  {
    accessorKey: "borrowType",
    header: "Rate Type",
    cell: ({ row }) => (
      <div className="font-medium">
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.original.borrowType === "Variable"
              ? "bg-blue-100 text-blue-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {row.getValue("borrowType")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "healthFactor",
    header: "Health Factor",
    cell: ({ row }) => {
      const healthFactor = parseFloat(row.getValue("healthFactor"));
      const isHealthy = healthFactor >= 1.5;
      return (
        <div
          className={`font-medium ${
            isHealthy ? "text-green-600" : "text-red-600"
          }`}
        >
          {row.getValue("healthFactor")}
        </div>
      );
    },
  },
  {
    accessorKey: "liquidationThreshold",
    header: "Liquidation Threshold",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("liquidationThreshold")}</div>
    ),
  },
  {
    accessorKey: "accruedInterest",
    header: "Accrued Interest",
    cell: ({ row }) => (
      <div className="font-medium text-orange-600">
        {row.getValue("accruedInterest")}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" size="sm" disabled={!row.original.canRepay}>
          REPAY
        </Button>
      </div>
    ),
  },
];

// Columns for borrowable market assets
const borrowableMarketColumns: ColumnDef<BorrowableMarketAsset>[] = [
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
      <div className="font-medium">{row.getValue("variableBorrowApr")}</div>
    ),
  },
  {
    accessorKey: "stableBorrowApr",
    header: "Stable APR",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("stableBorrowApr")}</div>
    ),
  },
  {
    accessorKey: "loanToValue",
    header: "Max LTV",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("loanToValue")}</div>
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
      <div className="flex items-center justify-end">
        <Button
          variant="default"
          size="sm"
          disabled={row.original.loanToValue === "0%"}
        >
          BORROW
        </Button>
      </div>
    ),
  },
];

export function BorrowTable() {
  return <DataTable columns={borrowColumns} data={borrowData} />;
}
