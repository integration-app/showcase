"use client"

import { IntegrationAppProvider } from "@integration-app/react"
import { getUserAuthHeaders } from "./customer-provider"

export function IntegrationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const fetchToken = async () => {
    console.log('fetch token')
    const response = await fetch("/api/integration-token", {
      headers: getUserAuthHeaders(),
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch integration token")
    }
    return data.token
  }

  return (
    <IntegrationAppProvider fetchToken={fetchToken} apiUri={process.env.NEXT_PUBLIC_INTEGRATION_APP_API_URL}>
      {children}
    </IntegrationAppProvider>
  )
}
