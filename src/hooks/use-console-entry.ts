import useSWR from "swr";

import { personalAccessTokenAuthFetcher } from "@/lib/fetch-utils";
import { ConsoleEntry } from "@/types/console-entry";
import { useConsoleAuth } from "@/components/providers/console-auth-provider";

export function useConsoleEntry(): Partial<ConsoleEntry> & {
  isLoading: boolean;
  isError: boolean;
} {
  const { token } = useConsoleAuth()

  const { data, error, isLoading } = useSWR<ConsoleEntry>(
    token ? ["/console-self", token] : null,
    ([url]) => personalAccessTokenAuthFetcher<ConsoleEntry>(url),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return {
    user: data?.user,
    workspaces: data?.workspaces,
    isLoading,
    isError: !!error,
  };
}
