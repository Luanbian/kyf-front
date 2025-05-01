"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomerSliceState } from "./types";

export const initialState: CustomerSliceState = {
  loading: false,
  loadingDiscord: false,
  error: null,
  errorDiscord: null,
  customerId: "",
  data: {
    fullName: "",
    email: "",
    phone: "",
    cpf: "",
    birthdate: "",
    interests: [],
    avatar: null,
    username: null,
    isFuriaGuild: null,
  },
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    saveCustomerRequest: () => {},
    saveDiscordRequest: () => {},
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setLoadingDiscord(state, action: PayloadAction<boolean>) {
      state.loadingDiscord = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setErrorDiscord(state, action: PayloadAction<string | null>) {
      state.errorDiscord = action.payload;
    },
    setCustomerId(state, action: PayloadAction<string>) {
      state.customerId = action.payload;
    },
    setCustomerData(state, action: PayloadAction<CustomerSliceState["data"]>) {
      state.data = action.payload;
    },
  },
});

export const { actions } = customerSlice;
export default customerSlice.reducer;
