"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { usePathname, useRouter } from "next/navigation"

const TOKEN_KEY = 'personal_token'

interface TokenContextType {
  token: string | null
  hasToken: boolean
  setToken: (token: string) => void
  clearToken: () => void
}

const TokenContext = createContext<TokenContextType>({
  token: null,
  hasToken: false,
  setToken: () => {},
  clearToken: () => {},
})

export function useToken() {
  return useContext(TokenContext)
}

// Component to protect routes
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { hasToken } = useToken()
  const router = useRouter()
  const pathname = usePathname()
  const isTokenPage = pathname === '/personal-token'

  useEffect(() => {
    if (!hasToken && !isTokenPage && typeof window !== 'undefined') {
      // Redirect to token page if no token and not already on token page
      router.push(`/personal-token?from=${encodeURIComponent(pathname)}`)
    }
  }, [hasToken, isTokenPage, pathname, router])

  // If we're on the token page or have a token, render children
  return hasToken || isTokenPage ? <>{children}</> : null
}

export function TokenProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize token from localStorage on mount
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem(TOKEN_KEY)
      setTokenState(storedToken)
      setIsLoading(false)
    }
  }, [])

  const setToken = (newToken: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, newToken)
      setTokenState(newToken)
    }
  }

  const clearToken = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY)
      setTokenState(null)
    }
  }

  return (
    <TokenContext.Provider
      value={{
        token,
        hasToken: !!token,
        setToken,
        clearToken,
      }}
    >
      {!isLoading && (
        <ProtectedRoute>
          {children}
        </ProtectedRoute>
      )}
    </TokenContext.Provider>
  )
}

// Helper functions for server components or middleware
export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

export function hasToken(): boolean {
  if (typeof window === 'undefined') return false
  return !!localStorage.getItem(TOKEN_KEY)
}
