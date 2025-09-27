import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ConnectWalletProvider } from "../providers/connect-wallet-provider";

export const Route = createRootRoute({
  component: () => (
    <ConnectWalletProvider>
      <div className="p-4 md:p-10">
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    </ConnectWalletProvider>
  ),
});
