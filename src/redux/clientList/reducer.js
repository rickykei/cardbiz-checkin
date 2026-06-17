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

const INIT_STATE = {
  allClientItems: null,
  clientItems: null,
  error: '',
  filter: null,
  searchKeyword: '',
  orderColumn: null,
  loading: false,
  statuses: [
  { label: 'Act', value: true },
  { label: 'Dect', value: false },
  ],
  selectedItems: [],
};
 
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CLIENT_LIST_GET_LIST:
      return { ...state, loading: false };

    case CLIENT_LIST_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: true,
        allClientItems: action.payload,
        clientItems: action.payload,
      };

    case CLIENT_LIST_GET_LIST_ERROR:
      return { ...state, loading: true, error: action.payload };

    case CLIENT_LIST_GET_LIST_WITH_FILTER:
      if (action.payload.column === '' || action.payload.value === '') {
        return {
          ...state,
          loading: true,
          clientItems: state.allClientItems,
          filter: null,
        };
      }
      // eslint-disable-next-line no-case-declarations
      const filteredItems = state.allClientItems.filter(
        (item) => item[action.payload.column] === action.payload.value
      );
      return {
        ...state,
        loading: true,
        clientItems: filteredItems,
        filter: {
          column: action.payload.column,
          value: action.payload.value,
        },
      };

    case CLIENT_LIST_GET_LIST_WITH_ORDER:
      if (action.payload === '') {
        return {
          ...state,
          loading: true,
          surveyItems: state.surveyItems,
          orderColumn: null,
        };
      }
      // eslint-disable-next-line no-case-declarations
      const sortedItems = state.surveyItems.sort((a, b) => {
        if (a[action.payload] < b[action.payload]) return -1;
        if (a[action.payload] > b[action.payload]) return 1;
        return 0;
      });
      return {
        ...state,
        loading: true,
        surveyItems: sortedItems,
        orderColumn: state.orderColumns.find(
          (x) => x.column === action.payload
        ),
      };

    case CLIENT_LIST_GET_LIST_SEARCH:
      if (action.payload === '') {
        return { ...state, surveyItems: state.allClientItems };
      }
      // eslint-disable-next-line no-case-declarations
      const keyword = action.payload.toLowerCase();
      // eslint-disable-next-line no-case-declarations
      const searchItems = state.allClientItems.filter(
        (item) =>
          item.title.toLowerCase().indexOf(keyword) > -1 ||
          item.detail.toLowerCase().indexOf(keyword) > -1 ||
          item.status.toLowerCase().indexOf(keyword) > -1 ||
          item.category.toLowerCase().indexOf(keyword) > -1 ||
          item.label.toLowerCase().indexOf(keyword) > -1
      );
      return {
        ...state,
        loading: true,
        surveyItems: searchItems,
        searchKeyword: action.payload,
      };

    case CLIENT_LIST_ADD_ITEM:
      return { ...state, loading: false };

    case CLIENT_LIST_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        allClientItems: action.payload,
        clientItems: action.payload,
      };

    case CLIENT_LIST_ADD_ITEM_ERROR:
      return { ...state, loading: true, error: action.payload };

    case CLIENT_LIST_SELECTED_ITEMS_CHANGE:
      return { ...state, loading: true, selectedItems: action.payload };
    default:
      return { ...state };
  }
};
