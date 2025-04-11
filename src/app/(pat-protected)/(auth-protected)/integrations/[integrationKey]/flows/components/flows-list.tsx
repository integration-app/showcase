'use client';

import {
  useFlows,
  useIntegration,
  useIntegrationApp,
} from '@integration-app/react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { FlowExecutionTrigger } from './flow-menu';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Cog, Workflow } from 'lucide-react';

export function FlowsList({ integrationKey }: { integrationKey: string }) {
  const client = useIntegrationApp();
  const { integration } = useIntegration(integrationKey);
  const { flows, loading, error } = useFlows({
    integrationId: integration?.id || '',
  });

  return (
    <TooltipProvider delayDuration={0}>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name & Key</TableHead>
              <TableHead>Configure</TableHead>
              <TableHead>Run</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flows.length === 0 && !loading && !error && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className='text-center text-muted-foreground'
                >
                  No flows found
                </TableCell>
              </TableRow>
            )}

            <>
              {flows.map((flow) => (
                <TableRow key={flow.id}>
                  <TableCell className='font-medium'>
                    {flow.name} <Badge variant='secondary'>{flow.key}</Badge>
                  </TableCell>
                  <TableCell className='flex gap-2'>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant='outline'
                          onClick={() => {
                            client
                              .connection(integrationKey)
                              .flow(flow.key)
                              .openConfiguration();
                          }}
                        >
                          <Cog />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side='left'>
                        Configure parameters
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant='outline'
                          onClick={() => {
                            client
                              .connection(integrationKey)
                              .flow(flow.key)
                              .openEditor();
                          }}
                        >
                          <Workflow />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side='right'>Edit flow</TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <FlowExecutionTrigger flowId={flow.id} />
                  </TableCell>
                </TableRow>
              ))}
            </>

            {loading &&
              Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className='h-6 w-[200px]' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-6 w-[100px]' />
                  </TableCell>
                </TableRow>
              ))}

            {error && (
              <TableRow>
                <TableCell colSpan={4} className='text-center text-red-500'>
                  Error loading flows
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  );
}
