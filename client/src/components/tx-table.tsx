"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";

// Types for transaction data
export type Transaction = {
  id: string;
  date: string;
  type: "Supply" | "Withdraw" | "Borrow" | "Repay";
  asset: string;
  icon: string;
  amount: string;
  amountUsd: string;
  txHash: string;
  status: "Completed" | "Pending" | "Failed";
};

// Sample transaction data based on the image
const transactionData: Transaction[] = [
  {
    id: "tx-1",
    date: "31 May 2023",
    type: "Repay",
    asset: "USDT",
    icon: "💲",
    amount: "+50,000.00 USDT",
    amountUsd: "$50,000.00",
    txHash: "0x8864...2207",
    status: "Completed",
  },
  {
    id: "tx-2",
    date: "31 May 2023",
    type: "Withdraw",
    asset: "WBTC",
    icon: "🟠",
    amount: "-1.90 WBTC",
    amountUsd: "-$22,211.00",
    txHash: "0x8090...4e5e",
    status: "Completed",
  },
  {
    id: "tx-3",
    date: "26 May 2023",
    type: "Supply",
    asset: "BAL",
    icon: "⚫",
    amount: "+177.38 BAL",
    amountUsd: "+$1,064.28",
    txHash: "0x3254...a6ff",
    status: "Completed",
  },
  {
    id: "tx-4",
    date: "26 May 2023",
    type: "Withdraw",
    asset: "MKR",
    icon: "🟢",
    amount: "-2.88 MKR",
    amountUsd: "-$2,073.60",
    txHash: "0x0e6c...4e47",
    status: "Completed",
  },
  {
    id: "tx-5",
    date: "26 May 2023",
    type: "Supply",
    asset: "MKR",
    icon: "🟢",
    amount: "+2.88 MKR",
    amountUsd: "+$2,073.60",
    txHash: "0x3e75...35ee",
    status: "Completed",
  },
  {
    id: "tx-6",
    date: "10 May 2023",
    type: "Supply",
    asset: "WBTC",
    icon: "🟠",
    amount: "+0.9926120 WBTC",
    amountUsd: "+$26,780.44",
    txHash: "0xe340...4399",
    status: "Completed",
  },
  {
    id: "tx-7",
    date: "10 May 2023",
    type: "Borrow",
    asset: "USDT",
    icon: "💲",
    amount: "-4,620.00 USDT",
    amountUsd: "-$4,620.00",
    txHash: "0x8138...8199",
    status: "Completed",
  },
];

// Helper function to get transaction type styling using CSS variables
function getTransactionTypeStyle(type: Transaction["type"]) {
  switch (type) {
    case "Supply":
      return "text-chart-2"; // Green from CSS variables
    case "Repay":
      return "text-chart-2"; // Green from CSS variables
    case "Withdraw":
      return "text-chart-1"; // Orange/yellow from CSS variables
    case "Borrow":
      return "text-chart-1"; // Orange/yellow from CSS variables
    default:
      return "text-foreground";
  }
}

// Helper function to get amount styling
function getAmountStyle(amount: string) {
  if (amount.startsWith("+")) {
    return "text-chart-2"; // Green for positive amounts
  } else if (amount.startsWith("-")) {
    return "text-chart-1"; // Orange for negative amounts
  }
  return "text-foreground";
}

const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div className="font-medium text-muted-foreground">
        {row.getValue("date")}
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as Transaction["type"];
      return (
        <div className={`font-medium ${getTransactionTypeStyle(type)}`}>
          {type}
        </div>
      );
    },
  },
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
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue("amount") as string;
      return (
        <div className={`font-medium ${getAmountStyle(amount)}`}>
          {amount}
        </div>
      );
    },
  },
  {
    accessorKey: "amountUsd",
    header: "Amount (USD)",
    cell: ({ row }) => {
      const amountUsd = row.getValue("amountUsd") as string;
      return (
        <div className={`font-medium ${getAmountStyle(amountUsd)}`}>
          {amountUsd}
        </div>
      );
    },
  },
  {
    accessorKey: "txHash",
    header: "Transaction Hash",
    cell: ({ row }) => (
      <div className="font-mono text-sm text-muted-foreground">
        {row.getValue("txHash")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Transaction["status"];
      let statusStyle = "bg-muted text-muted-foreground";
      
      if (status === "Completed") {
        statusStyle = "bg-secondary text-secondary-foreground";
      } else if (status === "Pending") {
        statusStyle = "bg-accent text-accent-foreground";
      } else if (status === "Failed") {
        statusStyle = "bg-destructive/10 text-destructive";
      }

      return (
        <div className="flex justify-end">
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusStyle}`}>
            {status}
          </span>
        </div>
      );
    },
  },
];

export function TransactionTable() {
  return <DataTable columns={transactionColumns} data={transactionData} />;
}
