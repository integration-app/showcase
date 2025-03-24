import { Header } from "@/components/header";
import { IntegrationProvider } from "@/components/providers/integration-provider";
import { CustomerProvider } from "@/components/providers/customer-provider";
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
  );
}
