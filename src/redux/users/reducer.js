import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  DELETE_USER,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
} from "./actions";

const initialState = {
  loadingUsers: false,
  users: [],
  newUsers: [],
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
        users: [...action.payload, ...state.newUsers],
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loadingUsers: false,
        error: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
        loadingUsers: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
        loadingUsers: false,
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
        loadingUsers: false,
      };
    case ADD_USER:
      return {
        ...state,
      };
    case ADD_USER_SUCCESS:
      console.log("Add in the reducer", action.payload);
      return {
        ...state,
        newUsers: state.newUsers.concat(action.payload),
      };
    case ADD_USER_FAILURE:
      return {
        ...state,
        newUsers: state.newUsers.concat(action.payload),
      };

    default:
      return state;
  }
};

export default reducer;
