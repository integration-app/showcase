import { ThemeProvider } from '@/components/providers/theme-provider';
import { inter } from '@/lib/fonts';
import { ConsoleAuthProvider } from '@/components/providers/console-auth-provider';
import { WorkspaceProvider } from '@/components/providers/workspace-provider';

import './globals.css';
import '@integration-app/react/styles.css';

export const metadata = {
  title: {
    default: 'Showcase',
    template: '%s | Showcase',
  },
  description: 'Integration.app Showcase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased min-h-svh overflow-hidden bg-background`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem={false}
          forcedTheme='loght'
        >
          <ConsoleAuthProvider>
            <WorkspaceProvider>{children}</WorkspaceProvider>
          </ConsoleAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
