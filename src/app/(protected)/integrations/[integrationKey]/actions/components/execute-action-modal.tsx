'use client';

import {
  ActionRunResponse,
  DataInput,
  useAction,
  useIntegrationApp,
} from '@integration-app/react';
import JsonView from '@uiw/react-json-view';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useCallback, useState } from 'react';
import { ArrowLeft, Loader } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { OpenGhButton } from '@/components/open-gh-button';
import { Tabs, TabsContent } from '@/components/ui/tabs';

export function ExecuteActionModal({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { action, loading: actionLoading, error: actionError } = useAction(id);
  const integrationApp = useIntegrationApp();

  const [tab, setTab] = useState<'input' | 'result'>('input');

  const [input, setInput] = useState({});
  const [executionLoading, setExecutionLoading] = useState(false);
  const [executionResult, setExecutionResult] = useState<
    ActionRunResponse | undefined
  >(undefined);
  const [executionError, setExecutionError] = useState<Error | undefined>(
    undefined,
  );

  const handleExecute = useCallback(async () => {
    if (!action?.integration?.key) {
      toast.warning('Integration key is missing.');
      return;
    }

    try {
      setTab('result');
      setExecutionResult(undefined);
      setExecutionLoading(true);
      setExecutionError(undefined);

      const result = await integrationApp
        .connection(action.integration.key)
        .action(action.key)
        .run(input);

      setExecutionResult(result);
    } catch (error) {
      console.error(error);
      setExecutionError(error as Error);
    } finally {
      setExecutionLoading(false);
    }
  }, [action, input, integrationApp]);

  return (
    <Dialog
      onOpenChange={(value) => {
        if (!value) {
          setExecutionResult(undefined);
          setInput({});
          setTab('input');
        }
      }}
      modal
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <Tabs defaultValue='input' value={tab}>
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

          <TabsContent value='input'>
            <div className='flex gap-6 flex-col sm:flex-row'>
              {action?.inputSchema && (
                <div className='flex-1 flex flex-col gap-2'>
                  <h2 className='font-semibold'>Input</h2>
                  <DataInput
                    schema={action?.inputSchema}
                    value={input}
                    onChange={setInput}
                  />
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value='result'>
            <div className='flex-1 flex flex-col gap-2'>
              {!executionError && (
                <>
                  <div className='flex-1 flex flex-col gap-2'>
                    <h2 className='font-semibold'>Output</h2>
                    <ScrollArea className='max-h-80 overflow-scroll h-full flex-1 min-h-40 border rounded-md p-2'>
                      {executionResult && (
                        <JsonView value={executionResult?.output || {}} />
                      )}
                    </ScrollArea>
                  </div>
                  <div className='flex-1 flex flex-col gap-2'>
                    <h2 className='font-semibold'>Logs</h2>
                    <ScrollArea className='max-h-80 overflow-scroll h-full flex-1 min-h-40 border rounded-md p-2'>
                      {executionResult && (
                        <JsonView value={executionResult?.logs || {}} />
                      )}
                    </ScrollArea>
                  </div>
                </>
              )}
              {!!executionError && (
                <Alert className='mt-2'>
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{executionError.message}</AlertDescription>
                </Alert>
              )}
            </div>
          </TabsContent>

          <DialogFooter className='flex-row justify-end'>
            <TabsContent value='result'>
              <Button
                onClick={() => {
                  setTab('input');
                }}
                variant='outline'
              >
                <ArrowLeft />
                Edit input
              </Button>
            </TabsContent>
            <Button
              onClick={handleExecute}
              disabled={actionLoading || executionLoading}
            >
              Run
              {executionLoading && <Loader className='ml-2 animate-spin' />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Tabs>
    </Dialog>
  );
}

const mock = {
  key: 'hubspot',
  state: 'READY',
  errors: [],
  isDeactivated: false,
  id: '67c05c5f0872bad5078153b9',
  name: 'HubSpot',
  uuid: '3e1241b5-f221-4de1-a7af-ee319d8ca503',
  authOptions: [
    {
      key: '',
      title: 'Default Authentication',
      type: 'oauth2',
    },
  ],
  connectorId: '62471fad996d5c297ae43f5f',
  parametersSchema: {
    type: 'object',
    properties: {
      clientId: {
        type: 'string',
      },
      clientSecret: {
        type: 'string',
      },
      scopes: {
        type: 'array',
        items: {
          type: 'string',
          allowCustom: true,
          enum: [
            'oauth',
            'cms.domains.read',
            'cms.domains.write',
            'cms.functions.read',
            'cms.functions.write',
            'cms.knowledge_base.articles.read',
            'cms.knowledge_base.articles.write',
            'cms.knowledge_base.articles.publish',
            'cms.knowledge_base.settings.read',
            'cms.knowledge_base.settings.write',
            'cms.performance.read',
            'crm.lists.read',
            'crm.lists.write',
            'crm.objects.companies.read',
            'crm.objects.companies.write',
            'crm.objects.contacts.read',
            'crm.objects.contacts.write',
            'crm.objects.custom.read',
            'crm.objects.custom.write',
            'crm.objects.deals.read',
            'crm.objects.deals.write',
            'crm.objects.feedback_submissions.read',
            'crm.objects.goals.read',
            'crm.objects.line_items.read',
            'crm.objects.line_items.write',
            'crm.objects.marketing_events.read',
            'crm.objects.marketing_events.write',
            'crm.objects.owners.read',
            'crm.objects.quotes.read',
            'crm.objects.quotes.write',
            'crm.schemas.companies.read',
            'crm.schemas.companies.write',
            'crm.schemas.contacts.read',
            'crm.schemas.contacts.write',
            'crm.schemas.custom.read',
            'crm.schemas.deals.read',
            'crm.schemas.deals.write',
            'crm.schemas.line_items.read',
            'crm.schemas.quotes.read',
            'settings.billing.write',
            'settings.currencies.read',
            'settings.currencies.write',
            'settings.users.read',
            'settings.users.write',
            'settings.users.teams.read',
            'settings.users.teams.write',
            'account-info.security.read',
            'accounting',
            'actions',
            'analytics.behavioral_events.send',
            'automation',
            'behavioral_events.event_definitions.read_write',
            'business_units_view.read',
            'business-intelligence',
            'collector.graphql_query.execute',
            'collector.graphql_schema.read',
            'communication_preferences.read',
            'communication_preferences.read_write',
            'communication_preferences.write',
            'content',
            'conversations.read',
            'conversations.visitor_identification.tokens.create',
            'conversations.write',
            'crm.export',
            'crm.import',
            'ctas.read',
            'e-commerce',
            'external_integrations.forms.access',
            'files',
            'files.ui_hidden.read',
            'forms',
            'forms-uploaded-files',
            'hubdb',
            'integration-sync',
            'media_bridge.read',
            'media_bridge.write',
            'sales-email-read',
            'social',
            'tickets',
            'timeline',
            'transactional-email',
          ],
        },
      },
      optionalScopes: {
        type: 'array',
        items: {
          type: 'string',
          allowCustom: true,
          enum: [
            'cms.domains.read',
            'cms.domains.write',
            'cms.functions.read',
            'cms.functions.write',
            'cms.knowledge_base.articles.read',
            'cms.knowledge_base.articles.write',
            'cms.knowledge_base.articles.publish',
            'cms.knowledge_base.settings.read',
            'cms.knowledge_base.settings.write',
            'cms.performance.read',
            'crm.lists.read',
            'crm.lists.write',
            'crm.objects.companies.read',
            'crm.objects.companies.write',
            'crm.objects.contacts.read',
            'crm.objects.contacts.write',
            'crm.objects.custom.read',
            'crm.objects.custom.write',
            'crm.objects.deals.read',
            'crm.objects.deals.write',
            'crm.objects.feedback_submissions.read',
            'crm.objects.goals.read',
            'crm.objects.line_items.read',
            'crm.objects.line_items.write',
            'crm.objects.marketing_events.read',
            'crm.objects.marketing_events.write',
            'crm.objects.owners.read',
            'crm.objects.quotes.read',
            'crm.objects.quotes.write',
            'crm.schemas.companies.read',
            'crm.schemas.companies.write',
            'crm.schemas.contacts.read',
            'crm.schemas.contacts.write',
            'crm.schemas.custom.read',
            'crm.schemas.deals.read',
            'crm.schemas.deals.write',
            'crm.schemas.line_items.read',
            'crm.schemas.quotes.read',
            'settings.billing.write',
            'settings.currencies.read',
            'settings.currencies.write',
            'settings.users.read',
            'settings.users.write',
            'settings.users.teams.read',
            'settings.users.teams.write',
            'account-info.security.read',
            'accounting',
            'actions',
            'analytics.behavioral_events.send',
            'automation',
            'behavioral_events.event_definitions.read_write',
            'business_units_view.read',
            'business-intelligence',
            'collector.graphql_query.execute',
            'collector.graphql_schema.read',
            'communication_preferences.read',
            'communication_preferences.read_write',
            'communication_preferences.write',
            'content',
            'conversations.read',
            'conversations.visitor_identification.tokens.create',
            'conversations.write',
            'crm.export',
            'crm.import',
            'ctas.read',
            'e-commerce',
            'external_integrations.forms.access',
            'files',
            'files.ui_hidden.read',
            'forms',
            'forms-uploaded-files',
            'hubdb',
            'integration-sync',
            'media_bridge.read',
            'media_bridge.write',
            'sales-email-read',
            'social',
            'tickets',
            'timeline',
            'transactional-email',
          ],
        },
      },
    },
  },
  hasDefaultParameters: false,
  hasMissingParameters: false,
  hasDocumentation: true,
  hasOperations: true,
  hasData: true,
  hasEvents: true,
  hasGlobalWebhooks: true,
  hasUdm: true,
  areParametersCustomized: true,
  baseUri:
    's3://integration-app-connectors/public/415fdf0b-456c-4a63-b85f-fde073785c85',
  logoUri: 'https://static.integration.app/connectors/hubspot/logo.png',
  appUuid: 'c04f4af3-1704-4693-86a4-9af453205335',
  dataCollectionsCount: 35,
  operationsCount: 646,
  eventsCount: 1,
  authType: 'oauth2',
  connection: {
    state: 'READY',
    errors: [],
    isDeactivated: false,
    id: '67e42a10f8d0ddb2de8d54b0',
    name: 'HubSpot',
    userId: '67bf877986399b73cfc6da0c',
    isTest: true,
    integrationId: '67c05c5f0872bad5078153b9',
    authOptionKey: '',
    disconnected: false,
    createdAt: '2025-03-26T16:23:44.864Z',
    updatedAt: '2025-03-27T10:28:00.872Z',
    lastActiveAt: '2025-03-27T10:28:00.872Z',
  },
};
