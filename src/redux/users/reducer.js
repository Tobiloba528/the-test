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
  FETCH_USER,
  EDIT_USER,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
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
      console.log("fetch");
      console.log('remaining users', state?.remainingUsers)
      console.log('total new users', state?.totalNewUsers)
      return {
        ...state,
        loadingUsers: false,
        users: state.editedUsers && state.editedUsers?.length > 0
          ? state.editedUsers
          : state.remainingUsers && state.remainingUsers?.length > 0
          ? state.remainingUsers
          : state.totalNewUsers && state.totalNewUsers?.length > 0 ?
          state.totalNewUsers : action.payload,
        user: {},
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
      console.log("delete");
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
        remainingUsers: state.users.filter((user) => user.id !== action.id),
        editedUsers: [],
        totalNewUsers: [],
        loadingUsers: false,
      };
    case DELETE_USER_FAILURE:
      console.log("delete");
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
        remainingUsers: state.users.filter((user) => user.id !== action.id),
        editedUsers: [],
        totalNewUsers: [],
        loadingUsers: false,
      };
    case ADD_USER:
      return {
        ...state,
      };
    case ADD_USER_SUCCESS:
      //   console.log("Add in the reducer", action.payload);
      const totalUsers = state.users
      console.log("Add");
      return {
        ...state,
        users: state.users.concat(state.newUsers).push(action.payload),
        totalNewUsers: [ ...totalUsers, action.payload],
        remainingUsers: [],
        editedUsers: []
      };
    case ADD_USER_FAILURE:
      const totalUserss = state.users
      return {
        ...state,
        users: state.users.concat(state.newUsers).push(action.payload),
        totalNewUsers: [ ...totalUserss, action.payload],
        remainingUsers: [],
        editedUsers: []
      };
    case EDIT_USER:
      return {
        ...state,
      };
    case EDIT_USER_SUCCESS:
      const allUsers = [...state.users];
      const userIndex = allUsers.findIndex(
        (user) => user.id == action.payload.id
      );
      allUsers[userIndex] = action.payload;
      console.log("edit");

      return {
        ...state,
        editedUsers: allUsers,
        users: allUsers,
        totalNewUsers: [],
        remainingUsers: [],
      };

    case EDIT_USER_FAILURE:
      const allUserss = [...state.users];
      const userI = allUserss.findIndex((user) => user.id == action.payload.id);
      allUserss[userI] = action.payload;
      console.log("edit");

      return {
        ...state,
        editedUsers: allUserss,
        users: allUserss,
        totalNewUsers: [],
        remainingUsers: [],
      };
    case FETCH_USER:
      return {
        ...state,
        user: state.users.find((user) => user.id === action.id),
      };

    default:
      return state;
  }
};

export default reducer;
