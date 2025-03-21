import "./globals.css";
import { ThemeProvider } from "@/app/providers";
import { Header } from "@/components/header";
import { inter } from "@/app/fonts";
import { IntegrationProvider } from "../components/providers/integration-provider";
import { CustomerProvider } from "../components/providers/customer-provider";
import { ConsoleAuthProvider } from "../components/providers/console-auth-provider";
import { WorkspaceProvider } from "@/components/providers/workspace-provider";
import { ProtectedRoute } from "./protected-route";

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
              <ProtectedRoute>
                <CustomerProvider>
                  <Header />
                  <IntegrationProvider>
                    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                      {children}
                    </main>
                  </IntegrationProvider>
                </CustomerProvider>
              </ProtectedRoute>
            </WorkspaceProvider>
          </ConsoleAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
