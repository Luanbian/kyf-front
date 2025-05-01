export interface CustomerSliceState {
  loading: boolean;
  loadingDiscord: boolean;
  error: string | null;
  errorDiscord: string | null;
  customerId: string | null;
  fanPoints: number;
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

export interface CustomerUpdatedResponse {
  acknowledged: boolean;
  insertedId: string;
}

export interface CustomerResponse {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  interests: string[];
  discord: {
    id: string;
    username: string;
    avatar: string;
    globalName: string;
    email: string;
    isFuriaGuild: boolean;
  };
}
