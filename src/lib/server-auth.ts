import { NextRequest } from 'next/server'
import type { CustomerDetails } from './customer-details-storage'
import { WorkspaceAuthDetails } from './integration-token'

export function getAuthFromRequest(request: NextRequest): CustomerDetails & WorkspaceAuthDetails {
    return {
        customerId: request.headers.get('x-auth-id') ?? '',
        customerName: request.headers.get('x-customer-name') ?? null,
        workspaceKey: request.headers.get('x-workspace-key') ?? null,
        workspaceSecret: request.headers.get('x-workspace-secret') ?? null,
    }
} 