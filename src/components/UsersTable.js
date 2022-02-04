import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; 
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchUsers } from "../redux/users/actions";
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const UsersTable = (props) => {
  useEffect(() => {
    props.getUsers();
  }, []);


  const deletePopUp = () => {
    confirmAlert({
      title: 'Delete',
      message: 'Are you sure you want to delete this user?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => alert('Click Yes')
        },
        {
          label: 'No',
          onClick: () => navigate('/')
        }
      ]
    });
  };

  const navigate = useNavigate();

  return (
    <TableContainer>
      <div className="head">
        <h5>User list</h5>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("form")}
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
            {props.users.map((user) => (
              <tr key={user.id} className="tr-row">
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.address.city}</td>
                <td>
                  <button type="button" className="btn btn-warning" onClick={() => navigate('form')}>
                    Edit
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-danger" onClick={deletePopUp}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Inner>
    </TableContainer>
  );
};

const TableContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 5px;
  padding: 20px;
  .head {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
  }

  td {
    padding: 30px 2px;
  }

  @media (max-width: 1100px) {
    width: 100%;
    box-shadow: none;
  }
`;

const Inner = styled.div`
  height: 90vh;
  overflow: scroll;
`;

const mapStateToProps = (state) => {
  return {
    loading: state.loadingUsers,
    users: state.users,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
