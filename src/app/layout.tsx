import { ThemeProvider } from "@/components/providers/theme-provider";
import { inter } from "@/lib/fonts";
import { ConsoleAuthProvider } from "@/components/providers/console-auth-provider";
import { WorkspaceProvider } from "@/components/providers/workspace-provider";
import { ModeToggle } from "@/components/mode-toggle";

import "./globals.css";
import '@integration-app/react/styles.css'

export const metadata = {
  title: {
    default: "Use Case Template",
    template: "%s | Use Case Template",
  },
  description: "Integration.app use case template application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased min-h-svh bg-background`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ConsoleAuthProvider>
            <WorkspaceProvider>
              {children}
              <ModeToggle />
            </WorkspaceProvider>
          </ConsoleAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
