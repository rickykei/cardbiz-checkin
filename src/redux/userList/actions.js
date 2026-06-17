import {
  USER_LIST_ADD_ITEM,
  USER_LIST_ADD_ITEM_SUCCESS,
  USER_LIST_ADD_ITEM_ERROR,
  USER_LIST_SELECTED_ITEMS_CHANGE,
} from '../contants';
  
export const addUserItem = (item) => ({
  type: USER_LIST_ADD_ITEM,
  payload: item,
});

export const addUserItemSuccess = (items) => ({
  type: USER_LIST_ADD_ITEM_SUCCESS,
  payload: items,
});

export const addUserItemError = (error) => ({
  type: USER_LIST_ADD_ITEM_ERROR,
  payload: error,
});

export const selectedUserItemsChange = (selectedItems) => ({
  type: USER_LIST_SELECTED_ITEMS_CHANGE,
  payload: selectedItems,
});
