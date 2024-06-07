import React, { useState, useEffect } from 'react';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

const LoginForm = ({ onLogin, err, success }) => {
  const [formData, setFormData] = useState({ name: '', password: '' });

  useEffect(() => {
    // Retrieve form data from local storage if available
    const storedFormData = localStorage.getItem('formData');
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
  };

  return (
    <Box maxW="md" mx="auto" mt="8">
      <form onSubmit={handleSubmit}>
        <FormControl id="name" mb="4">
          <FormLabel>Name</FormLabel>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} />
        </FormControl>
        <FormControl id="password" mb="4">
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password" value={formData.password} onChange={handleChange} />
        </FormControl>
        <Button type="submit" colorScheme="teal">Login</Button>
      </form>
      {
        err.message ? <p style={{ color: 'red' }}>{err.message}</p> : <p style={{ color: 'green' }}>{success.message}</p> 
      }
    </Box>
  );
};

export default LoginForm;
