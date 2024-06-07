import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Select } from '@chakra-ui/react';

const SignUpForm = ({ success, onSignUp }) => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    phone: '',
    profession: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save form data to local storage
    localStorage.setItem('formData', JSON.stringify(formData));
    // Call onSignUp function
    onSignUp(formData);
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
        <FormControl id="email" mb="4">
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} />
        </FormControl>
        <FormControl id="phone" mb="4">
          <FormLabel>Phone</FormLabel>
          <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
        </FormControl>
        <FormControl id="profession" mb="4">
          <FormLabel>Profession</FormLabel>
          <Select name="profession" value={formData.profession} onChange={handleChange}>
            <option value="">Select</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="other">Other</option>
          </Select>
        </FormControl>
        <Button type="submit" colorScheme="teal">Sign Up</Button>
        {success && <p style={{ color: 'green' }}>{success.message}</p>}
      </form>
    </Box>
  );
};

export default SignUpForm;
