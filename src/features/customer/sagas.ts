import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { actions } from "./slice";
import { Customer, CustomerResponse } from "./types";
import axios, { AxiosResponse } from "axios";
import { APIResponse } from "../common/types";
import { API_BASE_URL } from "../../constants/api";

function* saveCustomer() {
  yield put(actions.setLoading(true));
  try {
    const customer: Customer = yield select((state) => state.customer.data);

    const response: AxiosResponse<APIResponse<CustomerResponse>> = yield call(
      axios.post,
      `${API_BASE_URL}/customer`,
      customer,
    );

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

    yield call(axios.put, `${API_BASE_URL}/customer/discord/${customerId}`);
  } catch (error) {
    yield put(actions.setErrorDiscord(String(error)));
  } finally {
    yield put(actions.setLoadingDiscord(false));
  }
}

export function* customerSagas() {
  yield all([
    takeEvery(actions.saveCustomerRequest.type, saveCustomer),
    takeEvery(actions.saveDiscordRequest.type, saveCustomerDiscord),
  ]);
}
