import { IntegrationAppClient } from '@integration-app/sdk';
import { WorkspaceAuthDetails, generateIntegrationToken } from '../integration-token';
import type { CustomerDetails } from '../customer-details-storage';

export class IntegrationClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'IntegrationClientError';
  }
}

export async function getIntegrationAppClient(auth: CustomerDetails & WorkspaceAuthDetails): Promise<IntegrationAppClient> {
  try {
    // Generate a fresh token for the customer
    const token = await generateIntegrationToken(auth);

    // Create a new client instance with the fresh token
    // We create a new instance each time to ensure we're using a fresh token
    const client = new IntegrationAppClient({
      token,
      apiUri: process.env.NEXT_PUBLIC_INTEGRATION_APP_API_URL,
      uiUri: process.env.NEXT_PUBLIC_INTEGRATION_APP_UI_URL
    });

    return client;
  } catch (error) {
    console.error('Failed to initialize Integration.app client:', error);
    throw new IntegrationClientError(
      error instanceof Error ? error.message : 'Failed to initialize Integration.app client'
    );
  }
}
