import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ConnectWalletProvider } from "../providers/connect-wallet-provider";
import { Nav } from "@/components/nav";
import { ThemeProvider } from "@/components/theme-provider";
import { LoadingScreen } from "@/components/loading-screen";
import { useState, useEffect } from "react";
import { FloatingPaths } from "@/components/ui/floating-paths";

function RootComponent() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
  
  }, []);

  if (isLoading) {
    return (
      <ThemeProvider defaultTheme="dark">
        <LoadingScreen />
      </ThemeProvider>
    );
  }

  return (
    <div className="min-h-screen relative">
    <ThemeProvider defaultTheme="dark">
      <div className="max-w-7xl mx-auto ">
        <ConnectWalletProvider>
          <Nav />
          <div className="p-4 md:p-10">
            <Outlet />
            <TanStackRouterDevtools />
          </div>
        </ConnectWalletProvider>
        <FloatingPaths position={1}  />
      </div>
    </ThemeProvider>
    </div>

  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
