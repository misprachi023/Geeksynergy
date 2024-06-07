// src/components/CompanyInfo.jsx
import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const CompanyInfo = () => {
  return (
    <Box maxW="md" mx="auto" mt="8">
      <Text fontSize="xl" fontWeight="bold" mb="4">Company Info</Text>
      <Text>Company: Geeksynergy Technologies Pvt Ltd</Text>
      <Text>Address: Sanjayanagar, Bengaluru-56</Text>
      <Text>Phone: XXXXXXXXX09</Text>
      <Text>Email: XXXXXX@gmail.com</Text>
    </Box>
  );
};

export default CompanyInfo;
