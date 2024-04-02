import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import createUserWithEmailAndPassword
import { auth } from './Config'; // Import Firebase auth instance
import './Register.css';

export default function Register() {
  const validationSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(6), // Updated minimum password length
  });

  const navigate = useNavigate();

  const register = async (values) => {
    try {
    let eemail=values.email.replace(".", '');
      const userCredential = await createUserWithEmailAndPassword(auth, eemail, values.password);
      const user = values.email;
      let a=user.split('@')[0];
      a=a.replace(".","")
      console.log("Successfully logged in:", a);
      navigate(`/`); // Redirect to home page after successful registration
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error:', errorCode, errorMessage);
      // Handle registration errors, e.g., display error message to the user
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      register(values);
    },
  });

  return (
    <div>
      <form className="addform" onSubmit={formik.handleSubmit}>
        <h1>Register</h1>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          value={formik.values.email}
          onChange={formik.handleChange}
          name="email"
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
          helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          name="password"
          onBlur={formik.handleBlur}
          error={formik.touched.password && formik.errors.password}
          helperText={formik.touched.password && formik.errors.password ? formik.errors.password : null}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
        <h4>
          Already have an account? Click Here <Link to="/">Login</Link>
        </h4>
      </form>
    </div>
  );
}
