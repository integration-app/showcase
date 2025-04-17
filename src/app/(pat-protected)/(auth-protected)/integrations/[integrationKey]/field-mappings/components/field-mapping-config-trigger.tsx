'use client';

import { TextCursorInput } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ConfigureFieldMappingModal } from './configure-field-mapping-modal';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function FieldMappingConfigurationTrigger({
  fieldMappingId,
  integrationId,
}: {
  fieldMappingId: string;
  integrationId?: string;
}) {
  return (
    <Tooltip>
      <ConfigureFieldMappingModal
        fieldMappingId={fieldMappingId}
        integrationId={integrationId}
      >
        <TooltipTrigger asChild>
          <Button variant='outline' onClick={() => {}}>
            <TextCursorInput />
          </Button>
        </TooltipTrigger>
      </ConfigureFieldMappingModal>
      <TooltipContent side='right'>Configure with custom UI</TooltipContent>
    </Tooltip>
  );
}
