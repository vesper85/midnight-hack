import { useConnectWallet } from "@/providers/connect-wallet-provider";
import { Button } from "./ui/button";

export function ConnectWallet() {
  const {
    connectWallet,
    isConnected,
    isInstalled,
    isLoading,
    installWallet,
    disconnectWallet,
  } = useConnectWallet();
  return (
    <>
      {isInstalled ? (
        <Button
          size="sm"
          onClick={isConnected ? disconnectWallet : connectWallet}
          disabled={isLoading}
        >
          {isLoading
            ? "Connecting..."
            : isConnected
              ? "Disconnect Lace"
              : "Connect Lace"}
        </Button>
      ) : (
        <Button onClick={installWallet}>Install Lace Wallet</Button>
      )}
    </>
  );
}
