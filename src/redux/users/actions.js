import axios from "axios";

export const FETCH_USERS = "FETCH_USERS";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export const DELETE_USER = "DELETE_USER";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";

export const ADD_USER = "ADD_USER";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_FAILURE = "ADD_USER_FAILURE";

const url =
  "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data";

export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS,
  };
};

export const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

export const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequest());
    axios({
      method: "get",
      url,
    })
      .then((res) => {
        console.log(res.data);
        dispatch(fetchUsersSuccess(res.data));
      })
      .catch((error) => {
        // console.log("the error", error);
        dispatch(fetchUsersFailure("Error fetching user data"));
      });
  };
};

export const deleteUser = (id) => {
  return (dispatch) => {
    dispatch({ type: DELETE_USER });
    axios({
      method: "delete",
      url: `${url}/${id}`,
    })
      .then((res) => {
        console.log(res);
        dispatch({ type: DELETE_USER_SUCCESS, id });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: DELETE_USER_FAILURE });
      });
  };
};

export const addUser = (user) => {
  return (dispatch) => {
    dispatch({ type: ADD_USER });
    axios({
      method: "post",
      url,
    }).then((res) => {
      console.log('lets see',res);
      console.log('lets see user', user);
      dispatch({ type: ADD_USER_SUCCESS, payload: user });
    }).catch(error => {
        console.log(error)
        dispatch({ type: ADD_USER_FAILURE, payload: 'Error adding new user'})
    })
  };
};
