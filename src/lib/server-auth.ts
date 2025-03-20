import { NextRequest } from 'next/server'
import type { CustomerDetails } from './customer-details-storage'

export function getAuthFromRequest(request: NextRequest): CustomerDetails {
    return {
        customerId: request.headers.get('x-auth-id') ?? '',
        customerName: request.headers.get('x-customer-name') ?? null
    }
} 