import { createFileRoute } from "@tanstack/react-router";
import beaver from "@/assets/beaver.svg";
import { Button } from "@/components/ui/button";
import { hcWithType } from "server/dist/client";
import { useConnectWallet } from "@/providers/connect-wallet-provider";

export const Route = createFileRoute("/")({
	component: Index,
});

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

const client = hcWithType(SERVER_URL);

// type ResponseType = Awaited<ReturnType<typeof client.hello.$get>>;

function Index() {
	const { connectWallet, isConnected, isInstalled, isLoading, installWallet, disconnectWallet, address, error } = useConnectWallet();

	return (
		<div className="max-w-xl mx-auto flex flex-col gap-6 items-center justify-center min-h-screen">
			<a
				href="https://github.com/stevedylandev/bhvr"
				target="_blank"
				rel="noopener"
			>
				<img
					src={beaver}
					className="w-16 h-16 cursor-pointer"
					alt="beaver logo"
				/>
			</a>
			<h1 className="text-5xl font-black">bhvr</h1>
			<h2 className="text-2xl font-bold">Bun + Hono + Vite + React</h2>
			<p>A typesafe fullstack monorepo with Lace wallet</p>
			
			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
					{error}
				</div>
			)}

			<div className="flex items-center gap-4">
				{
					isInstalled ? (
						<Button onClick={isConnected ? disconnectWallet : connectWallet} disabled={isLoading}>
							{isLoading ? "Connecting..." : (isConnected ? "Disconnect Lace" : "Connect Lace")}
						</Button>
					) : (
						<Button onClick={installWallet}>Install Lace Wallet</Button>
					)
				}
			</div>
			
			{isConnected && (
				<div className="bg-gray-100 p-4 rounded-md w-full max-w-md">
					<h3 className="font-semibold mb-2">Lace Wallet Status</h3>
					<div className="text-sm space-y-1">
						<div>Connected: <span className="font-mono">{isConnected.toString()}</span></div>
						<div>Installed: <span className="font-mono">{isInstalled.toString()}</span></div>
						<div>Loading: <span className="font-mono">{isLoading.toString()}</span></div>
						{address && <div>Address: <span className="font-mono text-xs break-all">{address}</span></div>}
					</div>
				</div>
			)}
		</div>
	);
}

export default Index;