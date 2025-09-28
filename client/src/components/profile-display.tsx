import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { ProfileModal } from "./profile-modal"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Wallet, Activity, Shield, Hash } from "lucide-react"

interface ProfileData {
  walletAddress: string
  name: string
  email: string
  healthFactor: number
}

interface ProfileDisplayProps {
  className?: string
}

export function ProfileDisplay({ className }: ProfileDisplayProps) {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [isKYCed, setIsKYCed] = useState(false)

  // Generate a mock ZK ID hash based on profile data
  function generateZkIdHash(profileData: ProfileData): string {
    const dataString = `${profileData?.walletAddress}${profileData?.name}${profileData?.email}${profileData?.healthFactor}`
    // Simple hash generation for demo purposes
    let hash = 0
    for (let i = 0; i < dataString.length; i++) {
      const char = dataString.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    // Convert to hex and pad to create a realistic looking hash
    const hexHash = Math.abs(hash).toString(16).padStart(8, '0')
    return `0x${hexHash}${'a'.repeat(56 - hexHash.length)}` // 64 char hex string
  }

  function handleProfileCreate(profileData: ProfileData) {
    setProfile(profileData)
  }

  function formatAddress(address: string): string {
    if (address.length <= 10) return address
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  function getHealthFactorColor(healthFactor: number): string {
    if (healthFactor >= 80) return "text-green-500"
    if (healthFactor >= 50) return "text-yellow-500"
    return "text-red-500"
  }

  function getHealthFactorBadgeVariant(healthFactor: number): "default" | "secondary" | "destructive" {
    if (healthFactor >= 80) return "default"
    if (healthFactor >= 50) return "secondary"
    return "destructive"
  }

//   if (!profile) {
//     return (
//       <Card className={className}>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <User className="h-5 w-5" />
//             Profile
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="flex flex-col items-center justify-center py-8">
//           <div className="text-center space-y-4">
//             <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
//               <User className="h-8 w-8 text-muted-foreground" />
//             </div>
//             <div className="space-y-2">
//               <p className="text-muted-foreground">No profile created yet</p>
//               <ProfileModal onProfileCreate={handleProfileCreate}>
//                 <Button>Create Profile</Button>
//               </ProfileModal>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     )
//   }

  const zkIdHash = generateZkIdHash(profile as ProfileData)

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile
          </div>
          <ProfileModal onProfileCreate={handleProfileCreate}>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </ProfileModal>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{profile?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{profile?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Wallet className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Wallet Address</p>
              <p className="font-medium font-mono">
                {formatAddress(profile?.walletAddress ?? '')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Activity className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <div>
                <p className="text-sm text-muted-foreground">Health Factor</p>
                <p className={`font-medium ${getHealthFactorColor(profile?.healthFactor ?? 0)}`}>
                  {profile?.healthFactor}%
                </p>
              </div>
              <Badge variant={getHealthFactorBadgeVariant(profile?.healthFactor ?? 0)}>
                {profile?.healthFactor ?? 0 >= 80 ? "Excellent" : 
                 profile?.healthFactor ?? 0 >= 50 ? "Good" : "Poor"}
              </Badge>
            </div>
          </div>
        </div>

        {/* ZK ID Hash */}
        <div className="border-t pt-4">
          <div className="flex items-center gap-3">
            <Hash className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">ZK ID Hash</p>
              <p className="font-mono text-xs break-all bg-muted p-2 rounded">
                {zkIdHash}
              </p>
            </div>
          </div>
        </div>

        {/* KYC Switch */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">KYC Status</p>
                <p className="text-sm text-muted-foreground">
                  {isKYCed ? "Verified" : "Not verified"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {isKYCed ? "On" : "Off"}
              </span>
              <Switch
                checked={isKYCed}
                onCheckedChange={setIsKYCed}
                aria-label="Toggle KYC status"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
