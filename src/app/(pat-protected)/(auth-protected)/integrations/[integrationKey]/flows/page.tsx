import { Metadata } from 'next';
import { FlowsList } from './components/flows-list';
import { OpenGhButton } from '@/components/open-gh-button';

export const metadata: Metadata = {
  title: 'Flows',
};

export default async function Flows({
  params,
}: {
  params: Promise<{ integrationKey: string }>;
}) {
  const { integrationKey } = await params;

  return (
    <div className='px-4 py-6 sm:px-0 flex flex-col gap-4'>
      <div className='flex flex-row justify-between items-center'>
        <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
          Flows
        </h1>
        <OpenGhButton metaUrl={import.meta.url} />
      </div>
      <FlowsList integrationKey={integrationKey} />
    </div>
  );
}
