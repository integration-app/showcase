"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useToken } from "@/app/token-provider"
import { useRouter } from "next/navigation"

export function PersonalTokenButton() {
  const { hasToken, clearToken } = useToken()
  const router = useRouter()

  const handleLogout = () => {
    clearToken()
    router.push('/personal-token')
  }

  if (!hasToken) return null

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={handleLogout} 
      title="Clear Personal Token"
    >
      <LogOut className="h-5 w-5" />
    </Button>
  )
}
