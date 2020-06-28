import { ActionTypes } from '../actions';

const initialState = {
  scrollId: '',
  searchResults: [],
  error: '',
  canLoad: true,
  loading: true,
};

const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.SET_SEARCH: {
    const { scrollId, searchResults } = action.payload;

    return {
      ...state,
      scrollId,
      searchResults,
    };
  }
  case ActionTypes.UPDATE_SEARCH: {
    const { scrollId, searchResults } = action.payload;

    return {
      ...state,
      scrollId,
      searchResults: state.searchResults.concat(searchResults),
    };
  }
  case ActionTypes.SEARCH_ERROR:
    if (action.payload) return { ...state, error: action.payload };
    else return { ...state, error: '' };
  case ActionTypes.CAN_LOAD_SEARCH:
    return { ...state, canLoad: action.payload };
  case ActionTypes.SEARCH_LOADING:
    return { ...state, loading: action.payload };
  default:
    return state;
  }
};

export default SearchReducer;
