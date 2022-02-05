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
  user: {},
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
        const allUsers = state.user.name ? [...action.payload, state.user] : action.payload
      return {
        ...state,
        loadingUsers: false,
        users: allUsers,
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
        loadingUsers: false,
      };
    case ADD_USER:
      return {
        ...state,
        users: state.users.push({
            ...action.payload,
            id: state.users.length + 1
        })
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        // allUsers: action.payload
        // users: state.users.concat({
        //   id: state.users.length + 1,
        //   ...action.payload,
        // }),
        // users: [ ...state.users, {
        //     id: 11,
        //     ...action.payload,
        //   }]
      };
    case ADD_USER_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;
