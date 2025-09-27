import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ConnectWalletProvider } from "../providers/connect-wallet-provider";
import { Nav } from "@/components/nav";
import { ThemeProvider } from "@/components/theme-provider";

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider defaultTheme="dark">
    <div className="max-w-7xl mx-auto dark">
      <ConnectWalletProvider>
        <Nav />
        <div className="p-4 md:p-10">
          <Outlet />
          <TanStackRouterDevtools />
        </div>
      </ConnectWalletProvider>
    </div>
    </ThemeProvider>
  ),
});
