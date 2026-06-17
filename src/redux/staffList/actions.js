import {
  STAFF_LIST_ADD_ITEM,
  STAFF_LIST_ADD_ITEM_SUCCESS,
  STAFF_LIST_ADD_ITEM_ERROR,
  STAFF_LIST_SELECTED_ITEMS_CHANGE,
} from '../contants';
   
export const addStaffItem = (item) => ({
  type: STAFF_LIST_ADD_ITEM,
  payload: item,
});

export const addStaffItemSuccess = (items) => ({
  type: STAFF_LIST_ADD_ITEM_SUCCESS,
  payload: items,
});

export const addStaffItemError = (error) => ({
  type: STAFF_LIST_ADD_ITEM_ERROR,
  payload: error,
});

export const selectedStaffItemsChange = (selectedItems) => ({
  type: STAFF_LIST_SELECTED_ITEMS_CHANGE,
  payload: selectedItems,
});
