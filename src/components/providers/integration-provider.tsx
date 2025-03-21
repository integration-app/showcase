"use client";

import { IntegrationAppProvider } from "@integration-app/react";
import { getUserAuthHeaders } from "./customer-provider";
import { getWorkspaceHeaders } from "@/lib/workspace-storage";
import { useCurrentWorkspace } from "./workspace-provider";
import { SWRConfig } from "swr";

export function IntegrationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { workspace } = useCurrentWorkspace();

  const fetchToken = async () => {
    const response = await fetch("/api/integration-token", {
      headers: {
        ...getUserAuthHeaders(),
        ...getWorkspaceHeaders(),
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch integration token");
    }
    return data.token;
  };

  // TODO: key hack is used here to reset the cache that was related to another workspace and auth is based on workspace
  return (
    <SWRConfig key={workspace?.key} value={{ provider: () => new Map() }}>
      <IntegrationAppProvider
        fetchToken={fetchToken}
        apiUri={process.env.NEXT_PUBLIC_INTEGRATION_APP_API_URL}
        uiUri={process.env.NEXT_PUBLIC_INTEGRATION_APP_UI_URL}
      >
        {children}
      </IntegrationAppProvider>
    </SWRConfig>
  );
}
