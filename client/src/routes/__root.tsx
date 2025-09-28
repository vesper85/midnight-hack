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
    // Check if the document is already loaded
    if (document.readyState === 'complete') {
      // Add a small delay to ensure all React components are mounted
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 100);
      return () => clearTimeout(timer);
    }

    // Listen for when all resources (including JS, CSS, images) are loaded
    function handleLoad() {
      // Add a small delay to ensure React hydration is complete
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }

    // Listen for the load event
    window.addEventListener('load', handleLoad);

    // Also listen for DOMContentLoaded as a fallback
    function handleDOMContentLoaded() {
      // Wait a bit longer for JS modules to load
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
    };
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
