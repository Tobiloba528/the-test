import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "./actions";

const initialState = {
  loadingUsers: false,
  users: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        loadingUsers: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loadingUsers: false,
        users: action.payload,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loadingUsers: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
