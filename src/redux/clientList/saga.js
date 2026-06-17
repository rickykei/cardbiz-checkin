import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { getDateWithFormat } from 'helpers/Utils';
import axios from 'axios';
import { servicePath2 } from 'constants/defaultValues';
import clientListData from 'data/client.list.json';
import { CLIENT_LIST_GET_LIST, CLIENT_LIST_ADD_ITEM } from '../contants';

import {
  getClientListSuccess,
  getClientListError,
  addClientItemSuccess,
  addClientItemError,
} from './actions';
 
const apiUrl = `${servicePath2}/companies/`;


const getClientListRequest = async () => {
  // eslint-disable-next-line no-return-await
  return await new Promise((success) => {
    setTimeout(() => {
      success(clientListData.data);
    }, 1000);
  })
    .then((response) => response)
    .catch((error) => error);
};

function* getClientListItems() {
  try {
    const response = yield call(getClientListRequest);
    yield put(getClientListSuccess(response));
  } catch (error) {
    yield put(getClientListError(error));
  }
}

const addClientItemRequest = async (item) => {
  const items = clientListData.data;
  // eslint-disable-next-line no-param-reassign
  item.id = items.length + 1;
  // eslint-disable-next-line no-param-reassign
  item.createDate = getDateWithFormat();
  items.splice(0, 0, item);
  // eslint-disable-next-line no-return-await,no-unused-vars
  return await new Promise((success) => {
    setTimeout(() => {
      success(items);
    }, 1000);
  })
    .then((response) => response)
    .catch((error) => error);
};

function* addClientItem({ payload }) {
  try {
    yield call(axios.request, {
      url: apiUrl,
      method: "post",
      data: payload
    });
    const response = yield call(addClientItemRequest, payload);
    yield put(addClientItemSuccess(response));
  } catch (error) {
    yield put(addClientItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(CLIENT_LIST_GET_LIST, getClientListItems);
}

export function* watchAddItem() {
  yield takeEvery(CLIENT_LIST_ADD_ITEM, addClientItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchAddItem)]);
}
