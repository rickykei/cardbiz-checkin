
import {
  STAFF_LIST_ADD_ITEM,
  STAFF_LIST_ADD_ITEM_SUCCESS,
  STAFF_LIST_ADD_ITEM_ERROR,
  STAFF_LIST_SELECTED_ITEMS_CHANGE,
} from '../contants';


const INIT_STATE = {
  allStaffItems: null,
  staffItems: null,
  error: '',
  filter: null,
  searchKeyword: '',
  orderColumn: null,
  loading: false,
  companies:[ 
    {label: 'IBM', value: 'ibm' ,key: 0 },
    {label: 'HP', value: 'hp' ,key: 1},
  ],
  selectedItems: [],
};

/*
 get compaines list from api
*/
 

export default (state = INIT_STATE, action) => {
 
  switch (action.type) {
  
    case STAFF_LIST_ADD_ITEM:
      return { ...state, loading: false };

    case STAFF_LIST_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        allStaffItems: action.payload,
        staffItems: action.payload,
      };

    case STAFF_LIST_ADD_ITEM_ERROR:
      return { ...state, loading: true, error: action.payload };

    case STAFF_LIST_SELECTED_ITEMS_CHANGE:
      return { ...state, loading: true, selectedItems: action.payload };
    default:
      return { ...state };
  }
};
