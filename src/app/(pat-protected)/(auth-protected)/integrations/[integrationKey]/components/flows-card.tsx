'use client';

import { usePathname } from 'next/navigation';
import { LinkCard } from './link-card';
import { useFlows } from '@integration-app/react';

export const FlowsCard = ({
  integrationId,
  isConencted,
}: {
  integrationId: string;
  isConencted: boolean;
}) => {
  const pathname = usePathname();
  const { flows, loading } = useFlows({ integrationId });

  return (
    <LinkCard
      disabled={!isConencted}
      loading={loading}
      href={`${pathname}/#`}
      itemName='Flows'
      itemsCount={flows?.length}
      description='Access and edit available flows'
    />
  );
};
