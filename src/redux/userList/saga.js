import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { getDateWithFormat } from 'helpers/Utils';
import axios from 'axios';
import { servicePath2 } from 'constants/defaultValues';
import {  USER_LIST_ADD_ITEM } from '../contants';

import {
  addUserItemSuccess,
  addUserItemError,
} from './actions';
 
const apiUrl = `${servicePath2}/auth/signup`;
 
const addUserItemRequest = async (item) => {
  const items = {};
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

function* addUserItem({ payload }) {
  try {
    yield call(axios.request, {
      url: apiUrl,
      method: "post",
      data: payload
    });
    const response = yield call(addUserItemRequest, payload);
    yield put(addUserItemSuccess(response));
  } catch (error) {
    yield put(addUserItemError(error));
  }
}

 

export function* watchAddItem() {
  yield takeEvery(USER_LIST_ADD_ITEM, addUserItem);
}

export default function* rootSaga() {
  yield all([ fork(watchAddItem)]);
}
