"use client"

import { createContext, useContext, useEffect, useState } from "react"
import type { CustomerDetails } from "@/lib/customer-details-storage"
import { ensureCustomerDetails, storeCustomerDetails } from "@/lib/customer-details-storage"

interface CustomerContextType {
  customerId: string | null
  customerName: string | null
  setCustomerName: (name: string) => void
}

const CustomerContext = createContext<CustomerContextType>({
  customerId: null,
  customerName: null,
  setCustomerName: () => {},
})

export function useCustomer() {
  return useContext(CustomerContext)
}

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const [details, setCustomerDetails] = useState<CustomerDetails | null>(null)

  useEffect(() => {
    const currentDetails = ensureCustomerDetails()
    setCustomerDetails(currentDetails)
  }, [])

  const setCustomerName = (name: string) => {
    if (!details) return
    const newDetails = { ...details, customerName: name }
    storeCustomerDetails(newDetails)
    // TODO: ping API to update the name immediately
    setCustomerDetails(newDetails)
  }

  return (
    <CustomerContext.Provider
      value={{
        customerId: details?.customerId ?? null,
        customerName: details?.customerName ?? null,
        setCustomerName,
      }}
    >
      {children}
    </CustomerContext.Provider>
  )
}

// Helper function to get auth headers for API calls
export function getUserAuthHeaders(): HeadersInit {
  const details = ensureCustomerDetails()
  return {
    "x-auth-id": details.customerId,
    "x-customer-name": details.customerName || "",
  }
}
