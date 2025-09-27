import { createContext, useContext, useEffect, useState } from "react"

declare global {
    interface Window {
        cardano?: {
            lace?: {
                isEnabled: () => Promise<any>
                enable: () => Promise<any>
                name: string
                icon: string
                apiVersion: string
                supportedExtensions: any[]
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

    useEffect(() => {
        const checkWalletConnection = async () => {
            console.log("Checking Lace wallet connection")
            console.log("window.cardano:", window.cardano)
            console.log("window.cardano?.lace:", window.cardano?.lace)
            
            if (window.cardano?.lace) {
                const mnLace = window.cardano.lace
                console.log("Lace wallet found!", mnLace)
                setIsInstalled(true)

                try {
                    const existingWalletApi = await mnLace.isEnabled()
                    console.log("isEnabled result:", existingWalletApi)
                    if (existingWalletApi) {
                        setIsConnected(true)
                        console.log("Wallet already enabled")
                    }
                } catch (err) {
                    console.error('Error checking wallet connection:', err)
                    setError('Failed to check wallet connection')
                }
            } else {
                console.log("Lace wallet NOT found")
                setIsInstalled(false)
            }
        }

        setTimeout(checkWalletConnection, 100)
    }, [])


    const installWallet = async () => {
        window.open('https://www.lace.io/', '_blank')
    }

    const connectWallet = async () => {
        if (!window.cardano || !window.cardano.lace) {
            setError('Lace wallet not installed. Please install from https://www.lace.io/')
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const mnLace = window.cardano.lace
            
            const walletApi = await mnLace.enable()
            console.log("Lace wallet API:", walletApi)
            setIsConnected(true)
            
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
            
            // Lace wallet doesn't have serviceUriConfig - removing this call
            console.log("Lace wallet connected successfully")
            
        } catch (err) {
            console.error('Error connecting to Lace wallet:', err)
            setError('Failed to connect to Lace wallet. Please try again.')
            setIsConnected(false)
        } finally {
            setIsLoading(false)
        }
    }

    const disconnectWallet = () => {
        setIsConnected(false)
        setAddress("")
        setServiceConfig(null)
        setError(null)
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