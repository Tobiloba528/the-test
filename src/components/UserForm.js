import styled from "styled-components";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
import TextError from './common/TextError';

const initialValues = {
  name: "",
  email: "",
};

const onSubmit = (values, submitProps) => {
  console.log("Form data", values);
  // console.log('submitProps', submitProps)
  // submitProps.setSubmitting(false)
  // submitProps.resetForm()
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
});

const UserForm = () => {
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
                <div className='input-container'>
                  <label htmlFor="name">Name</label>
                  <Field type="text" id="name" name="name" className='input'/>
                  <ErrorMessage name="name" component={TextError} />
                </div>

                <div className='input-container'>
                  <label htmlFor="email">Email</label>
                  <Field type="email" id="email" name="email" className='input'/>
                  <ErrorMessage name="email" component={TextError}/>
                </div>
                <button
                  type="submit"
                  className="btn btn-success"
                //   disabled={!formik.isValid || formik.isSubmitting}
                >
                  Submit
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

  @media (max-width: 500px){
      width: 80%;
  }

`;

const Container = styled.div`
    padding: 20px 40px;

    .input-container{
      margin: 40px 0;
      display: flex;
      flex-direction: column;
  }

  input{
      padding: 5px;

      &:focus{
          outline: none;
      }
  }

  label{
      margin-bottom: 5px;
  }
`


export default UserForm;
