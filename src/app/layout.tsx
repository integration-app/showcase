import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { inter } from "@/lib/fonts";
import { ConsoleAuthProvider } from "@/components/providers/console-auth-provider";
import { WorkspaceProvider } from "@/components/providers/workspace-provider";

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
        className={`${inter.className} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ConsoleAuthProvider>
            <WorkspaceProvider>
              {children}
            </WorkspaceProvider>
          </ConsoleAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
