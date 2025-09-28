import { SupplyTable } from "@/components/supply-table";
import { BorrowTable } from "@/components/borrow-table";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SupplyMarket } from "@/components/supply-market";
import { BorrowMarket } from "@/components/borrow-market";

export const Route = createFileRoute("/portfolio/")({
  component: RouteComponent,
});

function RouteComponent() {
  const borrows = [];
  const supplies = [];
  return (
    <section className="w-full h-full flex flex-col gap-y-6">
      <h1 className="text-2xl font-medium">Portfolio</h1>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <div className="flex flex-col gap-y-1">
            <h2 className="text-sm text-muted-foreground">Net Worth</h2>
            <p className="flex items-center gap-x-0.5 text-xl">
              <span className="text-muted-foreground">$</span>
              <span>100,000</span>
            </p>
          </div>
          <div className="flex flex-col gap-y-1">
            <h2 className="text-sm text-muted-foreground">Net APY</h2>
            <p className="flex items-center gap-x-0.5 text-xl">--</p>
          </div>
        </div>
        <Link
          className={cn(buttonVariants({ variant: "secondary" }))}
          to="/transactions"
        >
          Transaction
        </Link>
      </div>
      <div className="flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-10">
          <div className="p-4 bg-gradient-to-b from-secondary/20 via-25% via-secondary/40 to-secondary/70 min-h-[200px] rounded-md flex flex-col gap-y-4">
            <h2 className="text-xl font-medium">Your Supplies</h2>
            <div className="flex flex-col gap-y-2">
              {supplies?.length != 0 ? (
                <p className="text-xs font-medium text-muted-foreground">
                  Nothing supplied yet
                </p>
              ) : (
                <SupplyTable />
              )}
            </div>
          </div>
          <div className="p-4 bg-gradient-to-b from-secondary/20 via-25% via-secondary/40 to-secondary/70 flex flex-col gap-y-4 min-h-[200px]">
            <h2 className="text-xl font-medium">Your borrows </h2>
            <div className="flex flex-col gap-y-2">
              {borrows?.length == 0 ? (
                <p className="text-xs font-medium text-muted-foreground">
                  Nothing borrowed yet
                </p>
              ) : (
                <BorrowTable />
              )}
            </div>
          </div>
          <div className="rounded-lg bg-gradient-to-b from-secondary/20 via-25% via-secondary/40 to-secondary/70 p-4">
            <SupplyMarket />
          </div>
          <div className="rounded-lg bg-gradient-to-b from-secondary/20 via-25% via-secondary/40 to-secondary/70 p-4">
            <BorrowMarket />
          </div>
        </div>
      </div>
    </section>
  );
}
