import { v4 as uuidv4 } from 'uuid';

const CUSTOMER_ID_KEY = 'integration_customer_id';
const CUSTOMER_NAME_KEY = 'integration_customer_name';

export type CustomerDetails = {
  customerId: string;
  customerName: string | null;
};

export function getStoredCustomerDetails(): CustomerDetails | null {
  if (typeof window === 'undefined') return null;
  
  const customerId = localStorage.getItem(CUSTOMER_ID_KEY);
  const customerName = localStorage.getItem(CUSTOMER_NAME_KEY);
  
  if (!customerId) return null;
  
  return {
    customerId,
    customerName
  };
}

export function storeCustomerDetails(details: CustomerDetails): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(CUSTOMER_ID_KEY, details.customerId);
  if (details.customerName) {
    localStorage.setItem(CUSTOMER_NAME_KEY, details.customerName);
  } else {
    localStorage.removeItem(CUSTOMER_NAME_KEY);
  }
}

export function generateAndStoreCustomerDetails(): CustomerDetails {
  const details = {
    customerId: uuidv4(),
    customerName: null
  };
  storeCustomerDetails(details);
  return details;
}

export function ensureCustomerDetails(): CustomerDetails {
  const existingCustomerDetails = getStoredCustomerDetails();
  if (existingCustomerDetails) return existingCustomerDetails;
  return generateAndStoreCustomerDetails();
}

export function clearCustomerDetails(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CUSTOMER_ID_KEY);
  localStorage.removeItem(CUSTOMER_NAME_KEY);
} 