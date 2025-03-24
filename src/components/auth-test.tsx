"use client"

import { useCustomer } from "@/components/providers/customer-provider"

export function AuthTest() {
  const { customerId, customerName } = useCustomer()

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg space-y-4">
      <div>
        <h2 className="text-lg font-semibold mb-2">Test Customer</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-4">
          This customer id and name will be used to connect external apps and
          run integrations.
        </p>
        <p className="font-mono text-sm">
          Customer ID: {customerId || "Loading..."}
        </p>
        <p>Name: {customerName || "Not set"}</p>
      </div>
    </div>
  )
}
