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

export function SupplyTable() {
  return <DataTable columns={supplyColumns} data={supplyData} />;
}
