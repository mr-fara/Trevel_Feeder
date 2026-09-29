export interface EnquiryPayload {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  destination?: string;
  travelDate?: string;
  returnDate?: string;
  passengers?: string;
  tripType?: string;
  message?: string;
  source?: string;
}

export interface TransferPayload {
  airport: string;
  destination: string;
  arrivalDate: string;
  arrivalTime?: string;
  flightNumber?: string;
  passengers: number;
  vehicleType: string;
  fullName: string;
  email: string;
  phone: string;
}

interface ApiEnvelope<T> {
  data: T;
}

interface ApiErrorEnvelope {
  error?: {message?: string};
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {'Content-Type': 'application/json', ...init?.headers},
  });
  const payload = await response.json() as ApiEnvelope<T> | ApiErrorEnvelope;

  if (!response.ok) {
    const message = 'error' in payload ? payload.error?.message : undefined;
    throw new Error(message || `Request failed (${response.status})`);
  }

  return (payload as ApiEnvelope<T>).data;
}

export function apiGet<T>(url: string): Promise<T> {
  return request<T>(url);
}

export function apiPost<T>(url: string, body: unknown): Promise<T> {
  return request<T>(url, {method: 'POST', body: JSON.stringify(body)});
}