import axios from "axios";

export const FETCH_USERS = "FETCH_USERS";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

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
