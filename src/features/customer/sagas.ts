import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, select, takeEvery } from "redux-saga/effects";
import axios, { AxiosError, AxiosResponse } from "axios";
import { actions } from "./slice";
import { Customer, CustomerResponse, CustomerUpdatedResponse } from "./types";
import { APIResponse } from "../common/types";
import { API_BASE_URL } from "../../constants/api";

function* saveCustomer() {
  yield put(actions.setError(null));
  yield put(actions.setLoading(true));
  try {
    const customer: Customer = yield select((state) => state.customer.data);

    const response: AxiosResponse<APIResponse<CustomerUpdatedResponse>> =
      yield call(axios.post, `${API_BASE_URL}/customer`, customer);

    yield put(actions.setCustomerId(response.data.data.insertedId));
    localStorage.clear();
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.message
        : "Algo deu errado, tente novamente mais tarde";
    yield put(actions.setError(errorMessage));
  } finally {
    yield put(actions.setLoading(false));
  }
}

function* saveCustomerDiscord() {
  yield put(actions.setErrorDiscord(null));
  yield put(actions.setLoadingDiscord(true));
  try {
    const customerId: string = yield select(
      (state) => state.customer.customerId,
    );

    const authToken = localStorage.getItem("authToken");
    yield call(
      axios.put,
      `${API_BASE_URL}/customer/discord/${customerId}`,
      { auth: authToken },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.message
        : "Algo deu errado, tente novamente mais tarde";
    yield put(actions.setErrorDiscord(errorMessage));
  } finally {
    yield put(actions.setLoadingDiscord(false));
  }
}

function* getCustomer() {
  yield put(actions.setError(null));
  yield put(actions.setLoading(true));
  try {
    const customerId: string = yield select(
      (state) => state.customer.customerId,
    );

    const response: AxiosResponse<APIResponse<CustomerResponse>> = yield call(
      axios.get,
      `${API_BASE_URL}/customer/${customerId}`,
    );
    const { data } = response.data;

    const customerData: Customer = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      cpf: data.cpf,
      birthDate: data.birthDate,
      interests: data.interests,
      discordId: data.discord?.id,
      avatar: data.discord?.avatar,
      username: data.discord?.username,
      discordEmail: data.discord?.email,
      isFuriaGuild: data.discord?.isFuriaGuild,
      extractedDocument: data.documents?.cpf,
      address: {
        street: data.address?.street || "",
        number: data.address?.number || "",
        complement: data.address?.complement || "",
        city: data.address?.city || "",
        state: data.address?.state || "",
        zipCode: data.address?.zipCode || "",
      },
    };

    const calcFanPoints = () => {
      const fieldsWithPoints = [
        { field: customerData.fullName, points: 5 },
        { field: customerData.email, points: 5 },
        { field: customerData.phone, points: 5 },
        { field: customerData.cpf, points: 5 },
        { field: customerData.birthDate, points: 5 },
        { field: customerData.interests, points: 15 },
        { field: customerData.username, points: 10 },
        { field: customerData.isFuriaGuild, points: 30 },
        { field: customerData.extractedDocument, points: 10 },
        { field: customerData.address?.state, points: 10 },
      ];

      return fieldsWithPoints.reduce((total, { field, points }) => {
        return field ? total + points : total;
      }, 0);
    };

    yield put(actions.setFanPoints(calcFanPoints()));
    yield put(actions.setCustomerData(customerData));
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.message
        : "Algo deu errado, tente novamente mais tarde";
    yield put(actions.setError(errorMessage));
  } finally {
    yield put(actions.setLoading(false));
  }
}

function* saveDocument(action: PayloadAction<File>) {
  yield put(actions.setError(null));
  yield put(actions.setLoading(true));
  try {
    const customerId: string = yield select(
      (state) => state.customer.customerId,
    );

    const formData = new FormData();
    formData.append("document", action.payload);

    const response: AxiosResponse<APIResponse<CustomerResponse["documents"]>> =
      yield call(
        axios.post,
        `${API_BASE_URL}/documents/${customerId}`,
        formData,
      );
    const { data } = response.data;

    yield put(actions.setExtractedDocument(data.cpf));
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.message
        : "Algo deu errado, tente novamente mais tarde";
    yield put(actions.setError(errorMessage));
  } finally {
    yield put(actions.setLoading(false));
  }
}

export function* customerSagas() {
  yield all([
    takeEvery(actions.saveCustomerRequest.type, saveCustomer),
    takeEvery(actions.saveDiscordRequest.type, saveCustomerDiscord),
    takeEvery(actions.getCustomerRequest.type, getCustomer),
    takeEvery(actions.saveUploadedDocument.type, saveDocument),
  ]);
}
