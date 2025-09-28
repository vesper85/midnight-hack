import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useConnectWallet } from "@/providers/connect-wallet-provider"

interface ProfileData {
  walletAddress: string
  name: string
  email: string
  healthFactor: number
}

interface ProfileModalProps {
  onProfileCreate: (profile: ProfileData) => void
  children: React.ReactNode
}

export function ProfileModal({ onProfileCreate, children }: ProfileModalProps) {
  const { address } = useConnectWallet()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    healthFactor: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validateForm() {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.healthFactor.trim()) {
      newErrors.healthFactor = "Health factor is required"
    } else {
      const healthFactorNum = Number(formData.healthFactor)
      if (isNaN(healthFactorNum) || healthFactorNum < 0 || healthFactorNum > 100) {
        newErrors.healthFactor = "Health factor must be a number between 0 and 100"
      }
    }

    if (!address) {
      newErrors.wallet = "Please connect your wallet first"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const profileData: ProfileData = {
      walletAddress: address,
      name: formData.name.trim(),
      email: formData.email.trim(),
      healthFactor: Number(formData.healthFactor),
    }

    onProfileCreate(profileData)
    setIsOpen(false)
    setFormData({ name: "", email: "", healthFactor: "" })
    setErrors({})
  }

  function handleInputChange(field: keyof typeof formData, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Profile</DialogTitle>
          <DialogDescription>
            Set up your profile information. Your wallet address will be automatically filled.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="wallet-address" className="text-sm font-medium">
              Wallet Address
            </label>
            <Input
              id="wallet-address"
              value={address || "Please connect wallet"}
              disabled
              className="bg-muted"
            />
            {errors.wallet && (
              <p className="text-sm text-destructive">{errors.wallet}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="health-factor" className="text-sm font-medium">
              Health Factor
            </label>
            <Input
              id="health-factor"
              type="number"
              placeholder="Enter health factor (0-100)"
              min="0"
              max="100"
              step="0.01"
              value={formData.healthFactor}
              onChange={(e) => handleInputChange("healthFactor", e.target.value)}
              aria-invalid={!!errors.healthFactor}
            />
            {errors.healthFactor && (
              <p className="text-sm text-destructive">{errors.healthFactor}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!address}>
              Create Profile
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
