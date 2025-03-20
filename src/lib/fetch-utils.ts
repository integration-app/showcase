import { ensureAuth } from './auth';

export const getAuthHeaders = () => {
  const auth = ensureAuth();
  return {
    'x-auth-id': auth.customerId,
    'x-customer-name': auth.customerName || '',
  };
};

export const authenticatedFetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(url, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.') as Error & { status?: number };
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export const engineApiAdminFetcher = async <T>(path: string): Promise<T> => {
  const url = new URL(path, process.env.NEXT_PUBLIC_INTEGRATION_APP_API_URL)
  const res = await fetch(url, {
    headers: {

    },
  });

  if (!res.ok) {
    const error = new Error('Admin request: An error occurred while fetching the data.') as Error & { status?: number };
    error.status = res.status;
    throw error;
  }

  return res.json();
};
