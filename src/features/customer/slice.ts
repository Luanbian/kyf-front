"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomerSliceState } from "./types";

export const initialState: CustomerSliceState = {
  loading: false,
  loadingDiscord: false,
  error: null,
  errorDiscord: null,
  customerId: "",
  fanPoints: 0,
  data: {
    fullName: "",
    email: "",
    phone: "",
    cpf: "",
    birthDate: "",
    interests: [],
    avatar: null,
    username: null,
    isFuriaGuild: null,
    extractedDocument: null,
    address: {
      street: "",
      number: "",
      complement: "",
      city: "",
      state: "",
      zipCode: "",
    },
  },
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    saveUploadedDocument: (_, _action) => {},
    saveCustomerRequest: () => {},
    saveDiscordRequest: () => {},
    getCustomerRequest: () => {},
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
    setFanPoints(state, action: PayloadAction<number>) {
      state.fanPoints = action.payload;
    },
    setExtractedDocument(
      state,
      action: PayloadAction<CustomerSliceState["data"]["extractedDocument"]>,
    ) {
      state.data.extractedDocument = action.payload;
    },
  },
});

export const { actions } = customerSlice;
export default customerSlice.reducer;
