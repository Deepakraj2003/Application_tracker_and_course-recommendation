import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ApexChart from './ApexChart';
import Course from './Course';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}> </Route>
      <Route path="/regi/det" element={<Register />}> </Route>
      <Route path="/:id" element={<App />}> </Route>
      <Route path="/course/:value" element={<Course />}> </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
