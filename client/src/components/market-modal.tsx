import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";

type Asset = {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  totalSupplied: number;
};

type TabEnum = "lend" | "borrow";

type Position = {
  id: string;
};

export function MarketModal({
  trigger,
  asset,
  defaultTab,
}: {
  trigger: React.ReactNode;
  asset: Asset;
  defaultTab?: TabEnum;
}) {
  const [currentTab, setCurrentTab] = useState<TabEnum>(defaultTab || "lend");
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-none w-full p-0 border-none">
        <div className="bg-gradient-to-b w-full from-secondary/20 via-25% via-secondary/40 to-secondary/70 rounded-lg p-4 space-y-10">
          <DialogHeader className="w-full flex items-center gap-x-4 flex-row">
            <img
              src={asset.logo}
              alt={asset.name}
              className="h-12 w-12 rounded-full"
            />
            <DialogTitle>
              {asset.name} ({asset.symbol})
            </DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <Tabs
              value={currentTab}
              defaultValue={defaultTab}
              onValueChange={(value) => setCurrentTab(value as TabEnum)}
            >
              <TabsList className="w-full h-14">
                <TabsTrigger className="h-14" value="lend">
                  Lend
                </TabsTrigger>
                <TabsTrigger className="h-14" value="borrow">
                  Borrow
                </TabsTrigger>
              </TabsList>
              <TabsContent value="lend" className="flex flex-col gap-y-6 mt-4">
                <SelectPosition positions={[]} tab="lend" />
                <AmountInput amount={0} setAmount={() => {}} maxAmount={0} />
                <SupplyAction amount={0} position={{} as Position} />
              </TabsContent>
              <TabsContent
                value="borrow"
                className="flex flex-col gap-y-6 mt-4"
              >
                <SelectPosition positions={[]} tab="borrow" />
                <AmountInput amount={0} setAmount={() => {}} maxAmount={0} />
                <BorrowAction amount={0} position={{} as Position} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="w-full bg-gradient-to-t from-secondary/20 via-25% via-secondary/40 to-secondary/70 rounded-lg p-4 mt-4 items-start flex">
          {currentTab === "lend" ? <LendFooter /> : <BorrowFooter />}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function SelectPosition({
  positions,
  tab,
}: {
  positions: Position[];
  tab: TabEnum;
}) {
  return (
    <Select>
      <SelectTrigger className="h-14 w-full">
        <SelectValue placeholder="Select Position" />
      </SelectTrigger>
      <SelectContent>
        {positions.length > 0 ? (
          positions.map((position) => (
            <SelectItem key={position.id} value={position.id}>
              {position.id}
            </SelectItem>
          ))
        ) : tab === "lend" ? (
          <Button variant="ghost" size="sm">
            Create Position
          </Button>
        ) : null}
      </SelectContent>
    </Select>
  );
}

export function AmountInput({
  amount,
  setAmount,
  maxAmount,
}: {
  amount: number;
  setAmount: (amount: number) => void;
  maxAmount: number;
}) {
  const validateAmount = (value: string | number): number => {
    // Convert to string if it's a number
    const stringValue = typeof value === "number" ? value.toString() : value;

    if (!stringValue || stringValue.trim() === "") return 0;

    const numberRegex = /^-?\d*\.?\d+$/;
    if (!numberRegex.test(stringValue.trim())) return 0;

    const numericValue = parseFloat(stringValue);

    // Check if parsing resulted in NaN
    if (Number.isNaN(numericValue)) return 0;

    // Check if it's a valid finite number
    if (!Number.isFinite(numericValue)) return 0;

    // Check if it's positive (assuming amounts should be positive)
    if (numericValue <= 0) return 0;

    if (numericValue > maxAmount) return maxAmount;

    return numericValue;
  };
  return (
    <div className="h-28 p-4 border rounded-md w-full flex flex-col justify-between gap-y-3">
      <div className="flex items-center justify-between">
        <input
        className="h-full text-xl focus:outline-none focus:border-none focus:ring-0"
          type="text"
          value={amount}
          onChange={(e) => {
            const validValue = validateAmount(e.target.value);
            setAmount(validValue);
          }}
        />
        <Button variant="ghost" size="sm" onClick={() => setAmount(maxAmount)}>
          Max
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">$0</p>
    </div>
  );
}

export function BorrowFooter() {
  return (
    <div className="flex flex-col gap-y-4 w-full">
      <div className="flex items-center justify-between">
        <p>Health Factor</p>
        <p>0</p>
      </div>
      <div className="flex items-center justify-between">
        <p>Borrow Fee</p>
        <p>0.0000 USDC</p>
      </div>
      <div className="flex items-center justify-between">
        <p>Borrowed</p>
        <p>0.0000 USDC</p>
      </div>
    </div>
  );
}

export function LendFooter() {
  return (
    <div className="flex flex-col gap-y-4 w-full">
      <div className="flex items-center justify-between">
        <p>Balance</p>
        <p>0</p>
      </div>
      <div className="flex items-center justify-between">
        <p>Health Factor</p>
        <p>0</p>
      </div>
      <div className="flex items-center justify-between">
        <p>Supplied</p>
        <p>0.0000 USDC</p>
      </div>
    </div>
  );
}

function SupplyAction({}: { amount: number; position: Position }) {
  return (
    <Button variant="default" className="h-14" size="lg">
      Supply
    </Button>
  );
}

function BorrowAction({}: { amount: number; position: Position }) {
  return (
    <Button variant="default" className="h-14" size="lg">
      Borrow
    </Button>
  );
}
