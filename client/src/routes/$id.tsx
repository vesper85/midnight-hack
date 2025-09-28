import { InfoBarchart } from "@/components/info-barchart";
import { buttonVariants } from "@/components/ui/button";
import { YourInfoCard } from "@/components/your-info-card";
import { cn } from "@/lib/utils";
import { createFileRoute, Link } from "@tanstack/react-router";

export const asset = {
  id: "eth",
  name: "Ethereum",
  symbol: "ETH",
  logo: "/eth.png",
  totalSupplied: 125000000,
  supplyApy: 3.25,
  totalBorrowed: 85000000,
  borrowedApy: 5.75,
};

export const Route = createFileRoute("/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="w-full h-full flex flex-col gap-y-20">
      <Link
        className={cn(buttonVariants({ variant: "secondary" }), "w-max")}
        to="/"
      >
        Go back
      </Link>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <img
            src={asset.logo}
            alt={asset.name}
            className="h-12 w-12 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-medium">{asset.name}</h1>
            <p className="text-sm text-muted-foreground">ETH</p>
          </div>
        </div>
        <div className="flex items-center gap-10">
          <div className="flex flex-col gap-y-1">
            <h2 className="text-sm text-muted-foreground">Net Worth</h2>
            <p className="flex items-center gap-x-0.5 text-xl">
              <span className="text-muted-foreground">$</span>
              <span>100,000</span>
            </p>
          </div>
          <div className="flex flex-col gap-y-1">
            <h2 className="text-sm text-muted-foreground">Utilization Rate</h2>
            <p className="flex items-center gap-x-0.5 text-xl">--</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <h2 className="text-sm text-muted-foreground">
              Available liquidity
            </h2>
            <p className="flex items-center gap-x-0.5 text-xl">
              <span className="text-muted-foreground">$</span>
              <span>100,000</span>
            </p>
          </div>
          <div className="flex flex-col gap-y-1">
            <h2 className="text-sm text-muted-foreground">Oracle price</h2>
            <p className="flex items-center gap-x-0.5 text-xl">
              <span className="text-muted-foreground">$</span>
              <span>100,000</span>
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-6">
        <div className="flex flex-col gap-y-20 rounded-md bg-gradient-to-b from-secondary/20 via-25% via-secondary/40 to-secondary/70 p-4 col-span-4">
          <h1 className="text-2xl font-medium">
            Reserve status & configuration
          </h1>
          <div className="grid grid-cols-6 items-center">
            <div className="col-span-1">
              <h2 className="text-muted-foreground">Supply Info</h2>
            </div>
            <div className="col-span-5 w-full flex items-center gap-x-20">
              <div className="w-[140px]">
                <InfoBarchart />
              </div>
              <div className="flex items-center gap-x-20">
                <div className="flex flex-col gap-y-1">
                  <h2 className="text-sm text-muted-foreground">
                    Oracle price
                  </h2>
                  <p className="flex items-center gap-x-0.5 text-xl">
                    <span className="text-muted-foreground">$</span>
                    <span>100,000</span>
                  </p>
                </div>
                <div className="flex flex-col gap-y-1">
                  <h2 className="text-sm text-muted-foreground">
                    Utilization Rate
                  </h2>
                  <p className="flex items-center gap-x-0.5 text-xl">--</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6 items-center">
            <div className="col-span-1">
              <h2 className="text-muted-foreground">Borrow Info</h2>
            </div>
            <div className="col-span-5 w-full flex items-center gap-x-20">
              <div className="w-[140px]">
                <InfoBarchart />
              </div>
              <div className="flex items-center gap-x-20">
                <div className="flex flex-col gap-y-1">
                  <h2 className="text-sm text-muted-foreground">
                    Oracle price
                  </h2>
                  <p className="flex items-center gap-x-0.5 text-xl">
                    <span className="text-muted-foreground">$</span>
                    <span>100,000</span>
                  </p>
                </div>
                <div className="flex flex-col gap-y-1">
                  <h2 className="text-sm text-muted-foreground">
                    Utilization Rate
                  </h2>
                  <p className="flex items-center gap-x-0.5 text-xl">--</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <YourInfoCard />
        </div>
      </div>
    </section>
  );
}
