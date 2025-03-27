'use client';

import { createContext, useContext } from 'react';
import { useConsoleEntry } from '@/hooks/use-console-entry';
import { Loader, CircleX } from 'lucide-react';

export interface CurrentCustomer {
  customerId: string | undefined;
  customerName: string | undefined;
}

const CustomerContext = createContext<CurrentCustomer>({
  customerId: undefined,
  customerName: undefined,
});

export function useCustomer() {
  return useContext(CustomerContext);
}

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isError } = useConsoleEntry();

  if (isLoading) {
    return (
      <div className='w-screen h-screen flex justify-center items-center flex-col gap-4'>
        <Loader className='size-14 opacity-50 animate-spin' />
        <h1 className='text-xl'>Loading</h1>
      </div>
    );
  }

  if (!isLoading && isError) {
    return (
      <div className='w-screen h-screen flex justify-center items-center flex-col gap-4'>
        <CircleX className='size-14' />
        <h1 className='text-xl'>Failed to load customer</h1>
      </div>
    );
  }

  return (
    <CustomerContext.Provider
      value={{
        customerId: user?.id ?? undefined,
        customerName: user?.name ?? undefined,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}
