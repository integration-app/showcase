import { IntegrationProvider } from '@/components/providers/integration-provider';
import { CustomerProvider } from '@/components/providers/customer-provider';
import { AppSidebar } from '@/components/app-sidebar';

import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { ProtectedRoute } from './protected-route';
import { Breadcrumbs } from '@/components/breadcrumbs';

export const metadata = {
  title: {
    default: 'Use Case Template',
    template: '%s | Use Case Template',
  },
  description: 'Integration.app use case template application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <CustomerProvider>
        <IntegrationProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
                <div className='flex items-center gap-2 px-4'>
                  <SidebarTrigger className='-ml-1' />
                  <Separator
                    orientation='vertical'
                    className='mr-2 data-[orientation=vertical]:h-4'
                  />
                  <Breadcrumbs />
                </div>
              </header>
              <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </IntegrationProvider>
      </CustomerProvider>
    </ProtectedRoute>
  );
}
