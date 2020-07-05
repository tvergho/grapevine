import { ActionTypes } from 'actions';

const initialState = {
  loading: false,
};

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.POST_LOADING:
    return { ...state, loading: true };
  case ActionTypes.POST_LOADING_STOP:
    return { ...state, loading: false };
  default:
    return { ...state };
  }
};

export default PostReducer;
