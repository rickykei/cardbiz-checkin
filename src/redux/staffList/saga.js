import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { getDateWithFormat } from 'helpers/Utils';
import axios from 'axios';
import { servicePath2 } from 'constants/defaultValues';
import {  STAFF_LIST_ADD_ITEM } from '../contants';

import {
  addStaffItemSuccess,
  addStaffItemError,
} from './actions';
 
const apiUrl = `${servicePath2}/staffs`;
 
const addStaffItemRequest = async (item) => {
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

function* addStaffItem({ payload }) {
  try {
    yield call(axios.request, {
      url: apiUrl,
      method: "post",
      data: payload
    });
    const response = yield call(addStaffItemRequest, payload);
    yield put(addStaffItemSuccess(response));
  } catch (error) {
    yield put(addStaffItemError(error));
  }
}

 

export function* watchAddItem() {
  yield takeEvery(STAFF_LIST_ADD_ITEM, addStaffItem);
}

export default function* rootSaga() {
  yield all([ fork(watchAddItem)]);
}
