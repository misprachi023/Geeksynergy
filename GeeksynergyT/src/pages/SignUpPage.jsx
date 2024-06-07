// src/pages/SignUpPage.jsx
import React from 'react';
import { useState } from 'react';
import SignUpForm from '../components/SignUpForm';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState({});
  const handleSignUp = (formData) => {
    const users=localStorage.getItem("users");
    console.log(users)
    const arr=Array.isArray(users)?JSON.parse(users):[]
    arr.push(formData);
    localStorage.setItem("users", JSON.stringify(arr));
    setSuccess({message: 'Signed up successfully!'});
    console.log('Signed up:', formData);
    navigate('/login');
  };

  return (
    <SignUpForm success={success} onSignUp={handleSignUp} />
  );
};

export default SignUpPage;
