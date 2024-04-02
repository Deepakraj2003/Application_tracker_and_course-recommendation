import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './Config'; // Import the auth instance from your Firebase config
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import signInWithEmailAndPassword function
import './Register.css';

export default function Login() {
  const validationSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
  });

  const navigate = useNavigate();

  const login = async (values) => {
    try {
      let eemail=values.email.replace(".", '');
      const userCredential = await signInWithEmailAndPassword(auth, eemail, values.password);
      const user = values.email;
      const a=user.split('@')[0];
      console.log("Successfully logged in:", a);
      navigate(`/${a}`); 
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error:", errorCode, errorMessage);

    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      login(values);
    }
  });

  return (
    <div>
      <form className='addform' onSubmit={formik.handleSubmit}>
        <h1>Login</h1>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          value={formik.values.email}
          onChange={formik.handleChange}
          name='email'
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
          name='password'
          onBlur={formik.handleBlur}
          error={formik.touched.password && formik.errors.password}
          helperText={formik.touched.password && formik.errors.password ? formik.errors.password : null}
        />
        <Button variant="contained" type='submit'>Submit</Button>
        <h4>Don't have an account? Click Here <Link to="/regi/det">Register</Link></h4>
      </form>
    </div>
  );
}
