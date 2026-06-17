import {
  CLIENT_LIST_GET_LIST,
  CLIENT_LIST_GET_LIST_SUCCESS,
  CLIENT_LIST_GET_LIST_ERROR,
  CLIENT_LIST_GET_LIST_WITH_FILTER,
  CLIENT_LIST_GET_LIST_WITH_ORDER,
  CLIENT_LIST_GET_LIST_SEARCH,
  CLIENT_LIST_ADD_ITEM,
  CLIENT_LIST_ADD_ITEM_SUCCESS,
  CLIENT_LIST_ADD_ITEM_ERROR,
  CLIENT_LIST_SELECTED_ITEMS_CHANGE,
} from '../contants';

export const getClientList = () => ({
  type: CLIENT_LIST_GET_LIST,
});

export const getClientListSuccess = (items) => ({
  type: CLIENT_LIST_GET_LIST_SUCCESS,
  payload: items,
});

export const getClientListError = (error) => ({
  type: CLIENT_LIST_GET_LIST_ERROR,
  payload: error,
});

export const getClientListWithFilter = (column, value) => ({
  type: CLIENT_LIST_GET_LIST_WITH_FILTER,
  payload: { column, value },
});

export const getClientListWithOrder = (column) => ({
  type: CLIENT_LIST_GET_LIST_WITH_ORDER,
  payload: column,
});

export const getClientListSearch = (keyword) => ({
  type: CLIENT_LIST_GET_LIST_SEARCH,
  payload: keyword,
});

export const addClientItem = (item) => ({
  type: CLIENT_LIST_ADD_ITEM,
  payload: item,
});

export const addClientItemSuccess = (items) => ({
  type: CLIENT_LIST_ADD_ITEM_SUCCESS,
  payload: items,
});

export const addClientItemError = (error) => ({
  type: CLIENT_LIST_ADD_ITEM_ERROR,
  payload: error,
});

export const selectedClientItemsChange = (selectedItems) => ({
  type: CLIENT_LIST_SELECTED_ITEMS_CHANGE,
  payload: selectedItems,
});
