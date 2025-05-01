export interface CustomerSliceState {
  loading: boolean;
  loadingDiscord: boolean;
  error: string | null;
  errorDiscord: string | null;
  customerId: string | null;
  data: Customer;
}

export interface Customer {
  fullName: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  interests: string[];
  avatar?: string | null;
  username?: string | null;
  isFuriaGuild?: boolean | null;
}

export interface CustomerResponse {
  acknowledged: boolean;
  insertedId: string;
}
