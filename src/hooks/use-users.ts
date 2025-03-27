import useSWR from 'swr';
import { UsersResponse } from '@/types/user';
import { authenticatedFetcher, buildAuthHeaders } from '@/lib/fetch-utils';
import { useCustomer } from '@/components/providers/customer-provider';

export function useUsers() {
  const { customerId, customerName } = useCustomer();

  const { data, error, isLoading, mutate } = useSWR<UsersResponse>(
    '/api/users',
    (url) =>
      authenticatedFetcher<UsersResponse>(url, { customerId, customerName }),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    },
  );

  const importUsers = async () => {
    try {
      const response = await fetch('/api/users/import', {
        method: 'POST',
        headers: buildAuthHeaders({ customerId, customerName }),
      });

      if (!response.ok) {
        throw new Error('Failed to import users');
      }

      // Refresh the users list
      await mutate();

      return true;
    } catch (error) {
      console.error('Error importing users:', error);
      throw error;
    }
  };

  return {
    users: data?.users ?? [],
    isLoading,
    isError: error,
    mutate,
    importUsers,
  };
}
