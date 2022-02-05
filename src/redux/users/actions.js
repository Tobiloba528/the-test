import axios from "axios";
import { toast } from "react-toastify";

export const FETCH_USERS = "FETCH_USERS";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export const DELETE_USER = "DELETE_USER";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";

export const ADD_USER = "ADD_USER";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_FAILURE = "ADD_USER_FAILURE";

export const FETCH_USER = "GET_USER";

export const EDIT_USER = "EDIT_USER";
export const EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS";
export const EDIT_USER_FAILURE = "EDIT_USER_FAILURE";

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
        toast.success("Deleted successfully!");
      })
      .catch((error) => {
        console.log(error);
        // BECAUSE DELETING THE NEWLY ADDED USERS WILL FAIL
        dispatch({ type: DELETE_USER_FAILURE, id });
        toast.success("Deleted successfully!");
      });
  };
};

export const addUser = (user) => {
  return (dispatch) => {
    dispatch({ type: ADD_USER });
    axios({
      method: "post",
      url,
    })
      .then((res) => {
        console.log("lets see user", user);
        dispatch({ type: ADD_USER_SUCCESS, payload: user });
        toast.success("Created successfully!");
      })
      .catch((error) => {
        console.log(error);
        console.log("Is it failing", user);
      });
  };
};

export const fetchUser = (id) => {
  return {
    type: FETCH_USER,
    id,
  };
};

export const editUser = (user) => {
  return (dispatch) => {
    dispatch({ type: EDIT_USER });
    axios({
      method: "patch",
      url: `${url}/${user.id}`,
    })
      .then((res) => {
        dispatch({ type: EDIT_USER_SUCCESS, payload: user });
        toast.success("Edited successfully!");
      })
      .catch((error) => {
        dispatch({ type: EDIT_USER_FAILURE, payload: user });
      });
  };
};
