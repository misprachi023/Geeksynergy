import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Image, Text, VStack, Heading, Spinner, Button, Flex, IconButton } from '@chakra-ui/react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchMovies = async () => {
      try {
        const response = await fetch('https://geeksynergy-backend.onrender.com/api/movieList', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            category: 'movies',
            language: 'kannada',
            genre: 'all',
            sort: 'voting',
          }),
        });
        const data = await response.json();
        setMovies(data?.result);
        console.log(data.result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();   

  }, []);

 

  return (
    <Box p={5}>
      <Heading mb={5}>Movie List</Heading>
      {movies.map((movie) => (
        <Box p={1} key={movie.imdbID} textAlign={"center"} borderWidth="1px" borderRadius="lg" overflow="hidden" mb={5}>
          <Flex overflow="hidden" mb={5}>
            <Box p={5} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <IconButton
                aria-label="Upvote"
                icon={<FaArrowUp />}
                mb={2}
                onClick={() => handleVote(movie.imdbID, true)}
              />
             <Text mt={2}>{movie.totalVoted}</Text>
              <IconButton
                aria-label="Downvote"
                icon={<FaArrowDown />}
                mt={2}
                onClick={() => handleVote(movie.imdbID, false)}
              />
            </Box>
            <Image src={movie.poster} alt={`${movie.Title} poster`} boxSize="150px" height={"300px"} objectFit="cover" />
            <Box display={"flex"} flexDirection="column" justifyContent={"center"} alignItems={"flex-start"} p={5} >
              <Heading size="md">{movie.title}</Heading>
              <Heading size="sm">Year: {movie.year}</Heading>
              <Text mt={2}>Genre: {movie.genre}</Text>
              <Text mt={2}>Director: {movie.director}</Text>
              <Text mt={2}>Language: {movie.language}</Text>
              <Text mt={2}>View: {movie.pageViews} views</Text>
              <Text mt={2}>Voted by {movie.totalVoted} people</Text>
              
            </Box>
          </Flex>
          <Button width={"100%"} colorScheme="teal" onClick={() => window.open(`https://www.youtube.com/results?search_query=${movie.Title} trailer`, '_blank')}>
            Watch Trailer
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default MovieList;
