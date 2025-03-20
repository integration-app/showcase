import useSWR from "swr";

import { engineApiAdminFetcher } from "@/lib/fetch-utils";
import { ConsoleEntry } from "@/types/console-entry";

export function useConsoleEntry(): Partial<ConsoleEntry> & {
  isLoading: boolean;
  isError: boolean;
} {
  const { data, error, isLoading } = useSWR<ConsoleEntry>(
    "/console-self",
    (url) => engineApiAdminFetcher<ConsoleEntry>(url),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return {
    user: data?.user,
    isLoading,
    isError: !!error,
  };
}
