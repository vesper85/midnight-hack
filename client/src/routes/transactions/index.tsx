import { TransactionTable } from "@/components/tx-table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/transactions/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-gradient-to-b from-secondary/20 via-25% via-secondary/40 to-secondary/70 rounded-lg p-4">
      <h2 className="text-xl font-medium">Transactions</h2>
      <TransactionTable />
    </div>
  );
}
