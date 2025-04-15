'use client';

import { TextCursorInput } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ConfigureDataSourceModal } from './configure-data-source-modal';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function DataSourceConfigurationTrigger({
  dataSourceId,
  integrationId,
}: {
  dataSourceId: string;
  integrationId?: string;
}) {
  return (
    <Tooltip>
      <ConfigureDataSourceModal id={dataSourceId} integrationId={integrationId}>
        <TooltipTrigger asChild>
          <Button variant='outline' onClick={() => {}}>
            <TextCursorInput />
          </Button>
        </TooltipTrigger>
      </ConfigureDataSourceModal>
      <TooltipContent side='right'>Configure with custom UI</TooltipContent>
    </Tooltip>
  );
}
