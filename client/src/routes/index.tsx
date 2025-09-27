import { createFileRoute } from "@tanstack/react-router";
import { CoreAssetTable } from "@/components/core-asset-table";
import { Search } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <section className="w-full h-full flex flex-col gap-y-6">
      <div className="grid grid-cols-3 gap-10">
        <div className="flex flex-col gap-y-1 bg-gradient-to-b from-secondary/20 via-25% via-secondary/40 to-secondary/70 p-4 rounded-md">
          <h2 className="text-lg text-muted-foreground">Total market size </h2>
          <p className="flex items-center gap-x-0.5 text-4xl">
            <span className="text-muted-foreground">$</span>
            <span>100,000</span>
          </p>
        </div>
        <div className="flex flex-col gap-y-1 bg-gradient-to-b from-secondary/20 via-25% via-secondary/40 to-secondary/70 p-4 rounded-md">
          <h2 className="text-lg text-muted-foreground">Total available</h2>
          <p className="flex items-center gap-x-0.5 text-4xl">
            <span className="text-muted-foreground">$</span>
            <span>100,000</span>
          </p>
        </div>
        <div className="flex flex-col gap-y-1 bg-gradient-to-b from-secondary/20 via-25% via-secondary/40 to-secondary/70 p-4 rounded-md">
          <h2 className="text-lg text-muted-foreground">Total borrows</h2>
          <p className="flex items-center gap-x-0.5 text-4xl">
            <span className="text-muted-foreground">$</span>
            <span>100,000</span>
          </p>
        </div>
      </div>
      <div className="w-full p-4 bg-gradient-to-b from-secondary/20 via-25% via-secondary/40 to-secondary/70 rounded-md flex flex-col gap-y-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium">Core Assets</h2>
          <div className="flex items-center gap-x-2 bg-secondary p-2 rounded-md w-full max-w-sm px-4">
            <Search className="size-4" />
            <input className="bg-none border-none w-full foucs:border-none foucs:ring-0 focus:outline-none" placeholder="Search assets for lending or borrowing" />
          </div>
        </div>
        <CoreAssetTable />
      </div>
    </section>
  );
}

export default Index;
