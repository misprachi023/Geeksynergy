import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ChakraProvider, Container, Box, Flex, Heading, Spacer, Button } from '@chakra-ui/react';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import MoviePage from './pages/MoviePage';
import CompanyInfoPage from './pages/CompanyInfoPage';

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Box p="4">
          <Flex>
            <Heading size="md" textAlign={'center'} color={'red'}>Movie App</Heading>
            <Spacer />
            <Box>
              <Link to="/signup"><Button mx="2">Sign Up</Button></Link>
              <Link to="/login"><Button mx="2">Login</Button></Link>
              <Link to="/company-info"><Button mx="2">Company Info</Button></Link>
            </Box>
          </Flex>
        </Box>
        <Container>
          <Routes>
            <Route path="/" element={<SignUpPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/movies" element={<MoviePage />} />
            <Route path="/company-info" element={<CompanyInfoPage />} />
          </Routes>
        </Container>
      </Router>
    </ChakraProvider>
  );
};

export default App;
