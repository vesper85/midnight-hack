import { createContext, useContext, useEffect, useState } from "react"

declare global {
    interface Window {
        midnight?: {
            mnLace?: {
                isEnabled: () => Promise<any>
                enable: () => Promise<any>
                name?: string
                icon?: string
                apiVersion?: string
                supportedExtensions?: any[]
            }
        }
    }
}

interface ServiceConfig {
    nodeUri: string
    indexerUri: string
    proofServerUri: string
}

interface ConnectWalletContextType {
    connectWallet: () => Promise<void>
    disconnectWallet: () => void
    isInstalled: boolean
    isConnected: boolean
    address: string
    serviceConfig: ServiceConfig | null
    error: string | null
    isLoading: boolean
    installWallet: () => Promise<void>
}

export const ConnectWalletContext = createContext<ConnectWalletContextType>({
    connectWallet: async () => {},
    disconnectWallet: () => {},
    isInstalled: false,
    isConnected: false,
    address: "",
    serviceConfig: null,
    error: null,
    isLoading: false,
    installWallet: async () => {},
})

interface ConnectWalletProviderProps {
    children: React.ReactNode
}

export function ConnectWalletProvider({ children }: ConnectWalletProviderProps) {
    const [isInstalled, setIsInstalled] = useState(false)
    const [isConnected, setIsConnected] = useState(false)
    const [address, setAddress] = useState("")
    const [serviceConfig, setServiceConfig] = useState<ServiceConfig | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    // Expose current state to window for console debugging
    const currentState = {
        isInstalled,
        isConnected,
        address,
        serviceConfig,
        error,
        isLoading
    }
    ;(window as any).walletState = currentState

    // Add debugging helpers to window
    ;(window as any).debugWallet = {
        state: currentState,
        api: (window as any).walletAPI || null,
        checkMidnight: () => window.midnight,
        checkMnLace: () => window.midnight?.mnLace,
        isWalletAvailable: () => !!(window.midnight?.mnLace),
        help: () => {
            console.log(`
🔍 WALLET DEBUG HELPERS:
- window.debugWallet.state          → Current wallet state
- window.debugWallet.api            → WalletAPI (null if not connected)
- window.debugWallet.checkMidnight() → Check if window.midnight exists  
- window.debugWallet.checkMnLace()   → Check if window.midnight.mnLace exists
- window.debugWallet.isWalletAvailable() → Boolean if wallet is available
- window.walletState                 → Live state (updates automatically)
- window.walletAPI                   → WalletAPI (only after connection)

📋 STEPS TO GET WALLETAPI:
1. Make sure Midnight Lace wallet is installed
2. Click "Connect Wallet" button in your app
3. Approve connection in wallet popup
4. Then check: window.walletAPI
            `)
        }
    }

    useEffect(() => {
        const checkWalletConnection = async () => {
            console.log("=== WALLET STATE DEBUG ===")
            console.log("💡 TIP: Type 'window.debugWallet.help()' in console for debug commands")
            console.log("💡 TIP: window.walletAPI only available AFTER connecting wallet")
            console.log("Current State:", {
                isInstalled,
                isConnected,
                address,
                serviceConfig,
                error,
                isLoading
            })
            console.log("Checking Midnight Lace wallet connection")
            console.log("window.midnight:", window.midnight)
            console.log("window.midnight?.mnLace:", window.midnight?.mnLace)
            
            if (window.midnight?.mnLace) {
                const mnLace = window.midnight.mnLace
                console.log("Midnight Lace wallet found!", mnLace)
                setIsInstalled(true)

                try {
                    const existingWalletApi = await mnLace.isEnabled()
                    console.log("isEnabled result:", existingWalletApi)
                    if (existingWalletApi) {
                        setIsConnected(true)
                        console.log("Wallet already enabled")
                        console.log("Updated State - isConnected:", true)
                    }
                } catch (err) {
                    console.error('Error checking wallet connection:', err)
                    setError('Failed to check wallet connection')
                    console.log("Updated State - error:", 'Failed to check wallet connection')
                }
            } else {
                console.log("Midnight Lace wallet NOT found")
                setIsInstalled(false)
                console.log("Updated State - isInstalled:", false)
            }
        }

        setTimeout(checkWalletConnection, 100)
    }, [])


    const installWallet = async () => {
        window.open('https://www.lace.io/', '_blank')
    }

    const connectWallet = async () => {
        console.log("=== CONNECT WALLET STARTED ===")
        console.log("State before connection:", {
            isInstalled,
            isConnected,
            address,
            serviceConfig,
            error,
            isLoading
        })
        
        if (!window.midnight || !window.midnight.mnLace) {
            setError('Midnight Lace wallet not installed. Please install from https://www.lace.io/')
            console.log("Updated State - error:", 'Midnight Lace wallet not installed')
            return
        }

        setIsLoading(true)
        setError(null)
        console.log("Updated State - isLoading:", true, "error:", null)

        try {
            const mnLace = window.midnight.mnLace
            
            const walletApi = await mnLace.enable()
            console.log("Midnight Lace wallet API:", walletApi)
            console.log("WalletAPI structure:", JSON.stringify(walletApi, null, 2))
            
            // Expose walletAPI to global window for console access
            ;(window as any).walletAPI = walletApi
            ;(window as any).debugWallet.api = walletApi
            console.log("✅ walletAPI is now available in browser console!")
            console.log("✅ Try: window.walletAPI or window.debugWallet.api")
            console.log("✅ For help: window.debugWallet.help()")
            
            setIsConnected(true)
            console.log("Updated State - isConnected:", true)
            
            // Log the wallet API structure to see what's available
            console.log("Available methods:", Object.keys(walletApi))
            
            // Get address using CIP30 standard methods
            try {
                const addresses = await walletApi.getUsedAddresses()
                if (addresses && addresses.length > 0) {
                    setAddress(addresses[0])
                }
            } catch (addrErr) {
                console.warn('Could not get used addresses, trying change address:', addrErr)
                try {
                    const changeAddress = await walletApi.getChangeAddress()
                    if (changeAddress) {
                        setAddress(changeAddress)
                    }
                } catch (changeErr) {
                    console.warn('Could not get change address:', changeErr)
                }
            }
            
            // Midnight Lace wallet doesn't have serviceUriConfig - removing this call
            console.log("Midnight Lace wallet connected successfully")
            
            // Configure providers and connect to liquidity pool contract
            try {
                console.log("=== CONFIGURING CONTRACT PROVIDERS ===")
                
                // Import the necessary modules dynamically to avoid bundling issues
                const { configureProviders } = await import('../lib/api')
                const { LiquidityPool } = await import('@midnight-ntwrk/contract')
                const { findDeployedContract } = await import('@midnight-ntwrk/midnight-js-contracts')
                
                // Configure providers with wallet and config
                const config = {
                    indexer: process.env.VITE_INDEXER_URL || 'http://localhost:8080',
                    indexerWS: process.env.VITE_INDEXER_WS_URL || 'ws://localhost:8080/ws',
                    proofServer: process.env.VITE_PROOF_SERVER_URL || 'http://localhost:8081',
                    node: process.env.VITE_NODE_URL || 'http://localhost:8082'
                }
                
                const apiProviders = await configureProviders(walletApi, config)
                
                // Create liquidity pool contract instance
                const liquidityPoolContract = new LiquidityPool.Contract({})
                
                // Static contract address - replace with your actual deployed contract address
                const LIQUIDITY_POOL_CONTRACT_ADDRESS = "0200aa44b2a13362cf0f36ce909cb51035140fd743c9d842395094d7b50e667f8c9f"
                
                // Find the deployed contract instead of deploying new one
                const deployedContract = await findDeployedContract(apiProviders, {
                    contractAddress: LIQUIDITY_POOL_CONTRACT_ADDRESS,
                    contract: liquidityPoolContract,
                    privateStateId: 'liquidityPoolPrivateState',
                    initialPrivateState: {},
                })
                
                console.log("✅ Connected to liquidity pool contract:", LIQUIDITY_POOL_CONTRACT_ADDRESS)
                
                // Example: Call provideLiquidity with some amount
                const liquidityAmount = 1000n // Provide 1000 units of liquidity
                console.log(`Calling provideLiquidity with amount: ${liquidityAmount}`)
                
                const provideLiquidityResult = await deployedContract.callTx.provideLiquidity(liquidityAmount)
                console.log("✅ ProvideLiquidity transaction successful:", provideLiquidityResult)
                
                // Expose contract to window for debugging
                ;(window as any).liquidityPoolContract = deployedContract
                console.log("✅ Liquidity pool contract available as window.liquidityPoolContract")
                
            } catch (contractErr) {
                console.error('Error connecting to liquidity pool contract:', contractErr)
                // Don't fail the wallet connection if contract interaction fails
            }
            
        } catch (err) {
            console.error('Error connecting to Midnight Lace wallet:', err)
            setError('Failed to connect to Midnight Lace wallet. Please try again.')
            setIsConnected(false)
        } finally {
            setIsLoading(false)
            console.log("=== CONNECT WALLET FINISHED ===")
            console.log("Final State:", {
                isInstalled,
                isConnected,
                address,
                serviceConfig,
                error,
                isLoading: false
            })
            console.log("✅ Current state is always available as 'window.walletState'")
        }
    }

    const disconnectWallet = () => {
        console.log("=== DISCONNECT WALLET ===")
        console.log("State before disconnect:", {
            isInstalled,
            isConnected,
            address,
            serviceConfig,
            error,
            isLoading
        })
        
        setIsConnected(false)
        setAddress("")
        setServiceConfig(null)
        setError(null)
        
        console.log("State after disconnect:", {
            isInstalled,
            isConnected: false,
            address: "",
            serviceConfig: null,
            error: null,
            isLoading
        })
    }

    return (
        <ConnectWalletContext.Provider
            value={{
                connectWallet,
                disconnectWallet,
                isInstalled,
                isConnected,
                address,
                serviceConfig,
                error,
                isLoading,
                installWallet,
            }}
        >
            {children}
        </ConnectWalletContext.Provider>
    )
}


export function useConnectWallet() {
    return useContext(ConnectWalletContext)
}