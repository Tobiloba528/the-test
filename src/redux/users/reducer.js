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
  EDIT_USER_FAILURE
} from "./actions";

const initialState = {
  loadingUsers: false,
  users: [],
  newUsers: [],
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
        console.log('fetch')
      return {
        ...state,
        loadingUsers: false,
        users: state.editedUsers ? state.editedUsers : [...action.payload, ...state.newUsers],
        user: {}
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
        remainingUsers: state.users.filter((user) => user.id !== action.id),
        loadingUsers: false,
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
        remainingUsers: state.users.filter((user) => user.id !== action.id),
        loadingUsers: false,
      };
    case ADD_USER:
      return {
        ...state,
      };
    case ADD_USER_SUCCESS:
    //   console.log("Add in the reducer", action.payload);
      console.log('Add')
      return {
        ...state,
        newUsers: state.newUsers.concat(action.payload),
        users: state.users.concat(state.newUsers).push(action.payload)
      };
    case ADD_USER_FAILURE:
      return {
        ...state,
        newUsers: state.newUsers.concat(action.payload),
        users: state.users.concat(state.newUsers).push(action.payload)
      };
    case EDIT_USER: 
      return {
          ...state
      }
    case EDIT_USER_SUCCESS: 
        const allUsers = [ ...state.users ]
        const userIndex  = allUsers.findIndex(user => user.id == action.payload.id)
        allUsers[userIndex] = action.payload;

        console.log('Edit')

      return {
          ...state,
          editedUsers: allUsers,
          users: allUsers
      }
    case EDIT_USER_FAILURE:
        return {
            ...state
        }
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
