'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { OVERLAY_LINK_STYLES } from '@/helpers/common-styles';
import { cn } from '@/lib/utils';
import { useIntegrationApp, useIntegrations } from '@integration-app/react';
import type { Integration as IntegrationAppIntegration } from '@integration-app/sdk';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
          className='flex items-center space-x-4 p-4 bg-card text-card-foreground border rounded-lg relative group hover:border-primary'
        >
          <div className='shrink-0'>
            <Avatar size='lg' variant='square'>
              <AvatarImage src={integration.logoUri} />
              <AvatarFallback size='lg' variant='square'>
                {integration.name[0]}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className='flex-1 min-w-0 flex flex-col gap-2'>
            <Link
              href={`/integrations/${integration.key}`}
              className={cn(
                'text-xl leading-none font-semibold flex flex-row gap-1 items-center group-hover:underline',
                OVERLAY_LINK_STYLES,
              )}
            >
              {integration.name}
              <ArrowRight className='group-hover:opacity-100 opacity-10 transition-opacity' />
            </Link>
            <Badge variant='secondary'>{integration.key}</Badge>
          </div>
          <Button
            className='z-10'
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
