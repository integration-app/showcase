'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import { Fragment } from 'react';

const mapping: Record<string, string> = {
  '': 'Showcase',
  integrations: 'Integrations',
  users: 'Users',
  actions: 'Actions',
};

export const Breadcrumbs = () => {
  const segments = useSelectedLayoutSegments();
  const patched = ['', ...segments];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {patched.map((segment, index, source) => (
          <Fragment key={segment}>
            {index > 0 && <BreadcrumbSeparator className='hidden md:block' />}
            {index === source.length - 1 ? (
              <BreadcrumbItem>
                <BreadcrumbPage>{mapping[segment] || ''}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <BreadcrumbLink asChild>
                <Link
                  href={
                    patched.toSpliced(index, source.length - index).join('/') ||
                    '/'
                  }
                >
                  {mapping[segment] || ''}
                </Link>
              </BreadcrumbLink>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
