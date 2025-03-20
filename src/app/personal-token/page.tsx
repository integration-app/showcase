"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useToken } from "@/app/token-provider"

export default function PersonalTokenPage() {
  const [token, setToken] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const fromPath = searchParams.get('from') || '/'
  const { setToken: saveToken, hasToken } = useToken()

  // If token already exists, redirect to intended destination
  useEffect(() => {
    if (hasToken) {
      router.push(fromPath)
    }
  }, [hasToken, router, fromPath])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!token.trim()) {
      setError("Please enter a valid personal token")
      return
    }
    
    // Use the token provider to save the token
    saveToken(token.trim())
    
    // Redirect to original destination or homepage
    router.push(fromPath)
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Personal Token Required</CardTitle>
          <CardDescription>
            Please enter your personal token to access this application
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="token">Personal Token</Label>
                <Input
                  id="token"
                  placeholder="Enter your personal token"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
