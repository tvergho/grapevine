import { ActionTypes } from 'actions';

const initialState = {
  loading: true,
  bizLoading: true,
  myRecs: [],
  recs: [],
  business: {},
};

const RecReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.RECS_LOADING:
    return {
      ...state,
      loading: action.payload,
    };
  case ActionTypes.BUSINESS_LOADING:
    return {
      ...state,
      bizLoading: action.payload,
    };
  case ActionTypes.SET_RECS:
    console.log('set recs', action.payload);
    return {
      ...state,
      recs: action.payload,
    };
  case ActionTypes.SET_MY_RECS:
    return {
      ...state,
      myRecs: action.payload,
    };
  case ActionTypes.SET_BUSINESS:
    return {
      ...state,
      business: action.payload,
    };
  case ActionTypes.CLEAR_BUSINESS:
    return {
      ...state,
      business: {},
    };
  case ActionTypes.DELETE_MY_RECS: {
    const updatedRecs = [];
    for (const rec of state.myRecs) {
      console.log(rec.recommendationID, action.payload);
      if (rec.recommendationID !== action.payload) {
        updatedRecs.push(rec);
      }
    }
    return {
      ...state,
      myRecs: updatedRecs,
    };
  }
  default:
    return state;
  }
};

export default RecReducer;
