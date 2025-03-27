import {
  ActionRunResponse,
  DataInput,
  Integration,
  useAction,
  useIntegrationApp,
} from '@integration-app/react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCallback, useState } from 'react';
import { ChevronDown, Loader } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { OpenGhButton } from '@/components/open-gh-button';

export function ExecuteActionModal({
  id,
  isOpen,
  onOpenChange,
}: {
  id: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { action, loading: actionLoading, error: actionError } = useAction(id);
  const integrationApp = useIntegrationApp();

  const [selectedIntegration, setSelectedIntegration] = useState<
    Integration | undefined
  >(action?.appliedToIntegrations?.[0]?.integration);
  const [selectIntegrationMissing, setSelectIntegrationMissing] =
    useState<boolean>(false);

  const [input, setInput] = useState({});
  const [executionLoading, setExecutionLoading] = useState(false);
  const [executionResult, setExecutionResult] = useState<
    ActionRunResponse | undefined
  >(undefined);
  const [executionError, setExecutionError] = useState<Error | undefined>(
    undefined,
  );

  const handleExecute = useCallback(async () => {
    if (!selectedIntegration) {
      setSelectIntegrationMissing(true);
      return;
    }

    try {
      setSelectIntegrationMissing(false);
      setExecutionResult(undefined);
      setExecutionLoading(true);
      setExecutionError(undefined);

      const result = await integrationApp
        .connection(selectedIntegration.key)
        .action(action!.key)
        .run(input);

      setExecutionResult(result);
    } catch (error) {
      console.error(error);
      setExecutionError(error as Error);
    } finally {
      setExecutionLoading(false);
    }
  }, [action, input, integrationApp, selectedIntegration]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(value) => {
        onOpenChange(value);
        if (!value) {
          setExecutionResult(undefined);
          setSelectedIntegration(undefined);
        }
      }}
      modal
    >
      <DialogContent className='sm:max-w-3xl'>
        <DialogHeader>
          <div className='flex flex-row justify-between pr-10 items-baseline'>
            <DialogTitle>Run action: {action?.name}</DialogTitle>
            <OpenGhButton metaUrl={import.meta.url} />
          </div>

          {!actionLoading && !actionError && !action?.inputSchema && (
            <Alert className='mt-2'>
              <AlertTitle>Please note</AlertTitle>
              <AlertDescription>
                This action has no input schema, but you can still execute it.
              </AlertDescription>
            </Alert>
          )}
        </DialogHeader>

        <div className='flex gap-6 flex-col sm:flex-row'>
          {action?.inputSchema && (
            <>
              <div className='flex-1 flex flex-col gap-2'>
                <h2 className='font-semibold'>Input schema</h2>
                <DataInput
                  schema={action?.inputSchema}
                  value={input}
                  onChange={setInput}
                />
              </div>
              <Separator orientation='vertical' className='hidden sm:block' />
              <Separator orientation='horizontal' className='block sm:hidden' />
            </>
          )}

          <div className='flex-1 flex flex-col gap-2'>
            <h2 className='font-semibold'>Run results</h2>
            {!executionError && (
              <ScrollArea className='max-h-60 h-full flex-1 min-h-20 border rounded-md p-2'>
                <pre className='whitespace-break-spaces text-sm'>
                  {executionResult && JSON.stringify(executionResult, null, 2)}
                </pre>
              </ScrollArea>
            )}
            {!!executionError && (
              <Alert className='mt-2'>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{executionError.message}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        <DialogFooter className='flex-row justify-end'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={selectIntegrationMissing ? 'destructive' : 'outline'}
              >
                {selectedIntegration ? (
                  <>{selectedIntegration.name}</>
                ) : (
                  'Select Connection'
                )}
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuLabel>Select Connection</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={selectedIntegration?.key}
                onValueChange={(key) => {
                  setSelectedIntegration(
                    action?.appliedToIntegrations?.find(
                      ({ integration }) => integration.key === key,
                    )?.integration,
                  );
                  setSelectIntegrationMissing(false);
                }}
              >
                {action?.appliedToIntegrations?.map(({ integration }) => (
                  <DropdownMenuRadioItem
                    key={integration.id}
                    value={integration.key}
                  >
                    {integration.name}
                  </DropdownMenuRadioItem>
                ))}
                {!action?.appliedToIntegrations?.length && (
                  <DropdownMenuRadioItem disabled value={''}>
                    No connections
                  </DropdownMenuRadioItem>
                )}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={handleExecute}
            disabled={actionLoading || executionLoading}
          >
            Run
            {executionLoading && <Loader className='ml-2 animate-spin' />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
