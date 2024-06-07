// src/pages/LoginPage.jsx
import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const [success, setSuccess] = React.useState({});
  const [err, setErr] = React.useState({});
  const handleLogin = (formData) => {
    const users=JSON.parse(localStorage.getItem("users"))||[];

    users.map((user)=>{
      if (formData.name === user.name && formData.password === user.password) { 
        console.log('Login successful');
        setSuccess({message: 'Login Successful'});
        setErr({});
        setTimeout(()=>{window.location.href = "/movies"}, 2000)  
        return
      } else {
        console.log('Invalid credentials');
        setErr({ message: 'Invalid credentials' });
      }
    })
  };

  return (
    <LoginForm err={err} success={success}  onLogin={handleLogin} />
  );
};

export default LoginPage;
