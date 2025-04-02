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
import { VirtualWindow } from '@/components/virtual-window';
import { cn } from '@/lib/utils';
import { AdminControls } from '@/components/admin-contols';
import { Toaster } from '@/components/ui/sonner';

export const metadata = {
  title: {
    default: 'Use Case Template',
    template: '%s | Use Case Template',
  },
  description: 'Integration.app use case template application',
};

const FRAME_MARGIN_AROUND = '10rem';
const FRAME_MARGIN_TOP = '10rem';
const FRAME_WINDOW_HEADER_HEIGHT = '32px';

const FRAME_HEIGHT =
  'h-[calc(100vh-var(--frame-margin-around)/2-var(--frame-margin-top))]';
const CONTENT_MAX_HEIGHT =
  'max-h-[calc(100vh-var(--frame-margin-around)/2-var(--frame-margin-top)-var(--frame-window-header-height))]';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        className='absolute -z-10 inset-0 h-full w-full
    bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)]
    bg-[size:20px_20px]'
      />
      <div
        className={cn(
          'm-[calc(var(--frame-margin-around)/2)] mt-[calc(var(--frame-margin-top))] relative',
          FRAME_HEIGHT,
        )}
        style={
          {
            '--frame-margin-around': FRAME_MARGIN_AROUND,
            '--frame-margin-top': FRAME_MARGIN_TOP,
            '--frame-window-header-height': FRAME_WINDOW_HEADER_HEIGHT,
          } as React.CSSProperties
        }
      >
        <AdminControls />
        <VirtualWindow>
          <ProtectedRoute>
            <CustomerProvider>
              <IntegrationProvider>
                <SidebarProvider className='min-h-auto'>
                  <AppSidebar
                    className={cn('sticky h-full', CONTENT_MAX_HEIGHT)}
                  />
                  <SidebarInset
                    className={cn('overflow-hidden', CONTENT_MAX_HEIGHT)}
                  >
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

                    <div className='flex flex-1 flex-col gap-4 p-4 pt-0 overflow-scroll'>
                      {children}
                    </div>
                  </SidebarInset>
                </SidebarProvider>
              </IntegrationProvider>
            </CustomerProvider>
          </ProtectedRoute>
          <Toaster />
        </VirtualWindow>
      </div>
    </>
  );
}
