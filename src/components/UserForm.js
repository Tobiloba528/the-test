import { useEffect } from "react";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { addUser, fetchUsers } from "../redux/users/actions";
import TextError from "./common/TextError";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  email: "",
  username: "",
  address: {
    city: "",
  },
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
});

const UserForm = (props) => {
    useEffect(() => {
        props.getUsers();
      }, []);


  const navigate = useNavigate();

  const onSubmit = (values, submitProps) => {
    console.log("Form data", values);
    const usersLength = props.users.length
    props.createUser({id: usersLength + 1, ...values});
    navigate('/');
  };

  return (
    <StyledForm>
      <h5>Form</h5>
      <Container>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            console.log("Formik props", formik);
            return (
              <Form>
                <div className="input-container">
                  <label htmlFor="name">Name</label>
                  <Field type="text" id="name" name="name" className="input" />
                  <ErrorMessage name="name" component={TextError} />
                </div>

                <div className="input-container">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="input"
                  />
                  <ErrorMessage name="email" component={TextError} />
                </div>
                <div className="input-container">
                  <label htmlFor="username">Username</label>
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    className="input"
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="city">City</label>
                  <Field
                    type="text"
                    id="city"
                    name="address.city"
                    className="input"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={!formik.isValid}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </button>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </StyledForm>
  );
};

const StyledForm = styled.div`
  width: 50%;
  margin: 0 auto;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 5px;

  h5 {
    padding: 20px 10px;
    border-bottom: 1px solid #c5c6d0;
  }

  @media (max-width: 500px) {
    width: 80%;
  }
`;

const Container = styled.div`
  padding: 20px 40px;

  .input-container {
    margin: 40px 0;
    display: flex;
    flex-direction: column;
  }

  input {
    padding: 5px;

    &:focus {
      outline: none;
    }
  }

  label {
    margin-bottom: 5px;
  }

  .btn{
      margin-right: 10px;
  }
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
    createUser: (user) => dispatch(addUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
