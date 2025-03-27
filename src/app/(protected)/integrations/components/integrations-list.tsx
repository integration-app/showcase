'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useIntegrationApp, useIntegrations } from '@integration-app/react';
import type { Integration as IntegrationAppIntegration } from '@integration-app/sdk';

export function IntegrationList() {
  const integrationApp = useIntegrationApp();
  const { integrations, refresh, loading } = useIntegrations();

  const handleConnect = async (integration: IntegrationAppIntegration) => {
    try {
      await integrationApp.integration(integration.key).openNewConnection();
      refresh();
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  const handleDisconnect = async (integration: IntegrationAppIntegration) => {
    if (!integration.connection?.id) return;
    try {
      await integrationApp.connection(integration.connection.id).archive();
      refresh();
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  return (
    <ul className='space-y-4 mt-8'>
      {loading && <span>Loading</span>}
      {!loading && !integrations.length && <span>No integrations found</span>}
      {integrations.map((integration) => (
        <li
          key={integration.key}
          className='group flex items-center space-x-4 p-4 bg-card text-card-foreground border rounded-lg'
        >
          <div className='shrink-0'>
            <Avatar size='lg' variant='square'>
              <AvatarImage src={integration.logoUri} />
              <AvatarFallback size='lg' variant='square'>
                {integration.name[0]}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className='flex-1 min-w-0'>
            <h3 className='text-lg leading-none font-semibold truncate'>
              {integration.name}
            </h3>
          </div>
          <Button
            variant={integration.connection ? 'destructive' : 'default'}
            onClick={() =>
              integration.connection
                ? handleDisconnect(integration)
                : handleConnect(integration)
            }
          >
            {integration.connection ? 'Disconnect' : 'Connect'}
          </Button>
        </li>
      ))}
    </ul>
  );
}
