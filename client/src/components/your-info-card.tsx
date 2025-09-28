import { Wallet } from "lucide-react";
import { Button } from "./ui/button";

export function YourInfoCard() {
  return (
    <div className="flex flex-col gap-y-10 bg-gradient-to-b from-secondary/20 via-25% via-secondary/40 to-secondary/70 p-4 rounded-md">
      <h2 className="text-lg font-medium">Your Info</h2>
      <div className="pb-4 border-b flex items-center gap-x-4">
        <Wallet />
        <div className="flex flex-col gap-y-0.5">
          <p>Wallet Balance</p>
          <p className="flex items-center gap-x-0.5">
            {" "}
            <span className="text-lg">10</span>
            <span className="text-muted-foreground">USDC</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-y-0.5">
        <h2 className="text-sm">Avalable to supply</h2>
        <div className="flex justify-between items-center">
          <p>
            1000 <span className="text-muted-foreground">USDC</span>
          </p>
          <Button variant={"secondary"}>Supply</Button>
        </div>
      </div>
      <div className="flex flex-col gap-y-0.5">
        <h2 className="text-sm">Avalable to borrow</h2>
        <div className="flex justify-between items-center">
          <p>
            1000 <span className="text-muted-foreground">USDC</span>
          </p>
          <Button variant={"secondary"}>Borrow</Button>
        </div>
      </div>
    </div>
  );
}
