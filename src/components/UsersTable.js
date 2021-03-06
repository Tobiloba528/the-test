import { useEffect, useState } from "react";
import Pagination from "./common/Pagination";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchUsers, deleteUser, fetchUser } from "../redux/users/actions";
import "react-confirm-alert/src/react-confirm-alert.css";
import { paginate } from "../utils/paginate";

const UsersTable = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    props.getUsers();
  }, []);

  const deletePopUp = (id) => {
    confirmAlert({
      title: "Delete",
      message: "Are you sure you want to delete this user?",
      buttons: [
        {
          label: "Delete",
          onClick: () => props.removeUser(id),
        },
        {
          label: "Cancel",
          onClick: () => navigate("/"),
        },
      ],
    });
  };

  const handleEdit = (id) => {
    props.getUser(id);
    navigate(`edit-user/${id}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const navigate = useNavigate();

  const paginatedUsers = paginate(props.users, currentPage, 5);

  return (
    <TableContainer>
      <div className="head">
        <h5>User list</h5>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("create-user")}
        >
          Add User
        </button>
      </div>
      <Inner>
        <table className="table table-responsive">
          <thead>
            <tr className="table-secondary">
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">City</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {!props.loading &&
              props.users.length > 0 &&
              paginatedUsers.map((user) => (
                <tr key={user.id} className="tr-row">
                  <td>{user.id}</td>
                  <td>{user?.name}</td>
                  <td>{user?.username}</td>
                  <td>{user?.email}</td>
                  <td>{user.address?.city}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => handleEdit(user.id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deletePopUp(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Inner>
      {props.loading && (
        <SpinnerContainer>
          <div className="spinner-border spinner" role="status">
            <span className="sr-only"></span>
          </div>
        </SpinnerContainer>
      )}
      {!props.loading && props.users.length === 0 && (
        <SpinnerContainer>
          <h5>
            There are no available users. Click the button above to add users
          </h5>
        </SpinnerContainer>
      )}
      <Pagination
        itemsCount={props.users.length}
        pageSize={5}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </TableContainer>
  );
};

const TableContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  font-size: 12px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 5px;
  padding: 20px;
  .head {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0;
  }

  td {
    padding: 10px 2px;
  }

  @media (max-width: 1100px) {
    width: 100%;
    box-shadow: none;
  }
`;

const Inner = styled.div`
  /* height: auto;
  overflow: scroll; */
`;

const SpinnerContainer = styled.div`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const mapStateToProps = (state) => {
  return {
    loading: state.loadingUsers,
    users: state.users,
    newUsers: state.newUsers,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(fetchUsers()),
    removeUser: (id) => dispatch(deleteUser(id)),
    getUser: (id) => dispatch(fetchUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
