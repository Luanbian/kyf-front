import Cookies from "js-cookie";
import { all, call, put, select, takeEvery } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { actions } from "./slice";
import { Customer, CustomerResponse, CustomerUpdatedResponse } from "./types";
import { APIResponse } from "../common/types";
import { API_BASE_URL } from "../../constants/api";

function* saveCustomer() {
  yield put(actions.setLoading(true));
  try {
    const customer: Customer = yield select((state) => state.customer.data);

    const response: AxiosResponse<APIResponse<CustomerUpdatedResponse>> =
      yield call(axios.post, `${API_BASE_URL}/customer`, customer);

    yield put(actions.setCustomerId(response.data.data.insertedId));
  } catch (error) {
    yield put(actions.setError(String(error)));
  } finally {
    yield put(actions.setLoading(false));
  }
}

function* saveCustomerDiscord() {
  yield put(actions.setLoadingDiscord(true));
  try {
    const customerId: string = yield select(
      (state) => state.customer.customerId,
    );

    const authToken = Cookies.get("authToken");
    yield call(
      axios.put,
      `${API_BASE_URL}/customer/discord/${customerId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
  } catch (error) {
    yield put(actions.setErrorDiscord(String(error)));
  } finally {
    yield put(actions.setLoadingDiscord(false));
  }
}

function* getCustomer() {
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
      avatar: data.discord?.avatar,
      username: data.discord?.username,
      isFuriaGuild: data.discord?.isFuriaGuild,
    };

    yield put(actions.setCustomerData(customerData));
  } catch (error) {
    yield put(actions.setError(String(error)));
  } finally {
    yield put(actions.setLoading(false));
  }
}

export function* customerSagas() {
  yield all([
    takeEvery(actions.saveCustomerRequest.type, saveCustomer),
    takeEvery(actions.saveDiscordRequest.type, saveCustomerDiscord),
    takeEvery(actions.getCustomerRequest.type, getCustomer),
  ]);
}
