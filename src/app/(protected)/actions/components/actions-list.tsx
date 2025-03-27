'use client';

import { useActions } from '@integration-app/react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { ActionConnections } from './action-connections';
import { ActionMenu } from './action-menu';

export function ActionsList() {
  const { actions, loading, error } = useActions();

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>State</TableHead>
            <TableHead>Deployed</TableHead>
            <TableHead>Connections</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {actions.length === 0 && !loading && (
            <TableRow>
              <TableCell
                colSpan={4}
                className='text-center text-muted-foreground'
              >
                No actions found
              </TableCell>
            </TableRow>
          )}

          <>
            {actions.map((action) => (
              <TableRow key={action.id}>
                <TableCell className='font-medium'>{action.name}</TableCell>
                {/* @ts-expect-error bad types on action state */}
                <TableCell>{action.state}</TableCell>
                <TableCell>
                  <Badge variant={action.isDeployed ? 'success' : 'secondary'}>
                    {action.isDeployed ? 'Deployed' : 'Not Deployed'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <ActionConnections id={action.id} />
                </TableCell>
                <TableCell>
                  <ActionMenu id={action.id} />
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
                  <Skeleton className='h-6 w-[150px]' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-6 w-[100px]' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-6 w-[100px]' />
                </TableCell>
              </TableRow>
            ))}

          {error && (
            <TableRow>
              <TableCell colSpan={4} className='text-center text-red-500'>
                Error loading actions
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
