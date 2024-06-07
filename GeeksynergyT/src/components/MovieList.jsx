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
        const response = await axios.get('http://www.omdbapi.com/', {
          params: {
            apikey: '4f4b140a',
            s: 'movie'
          }
        });

        const moviesWithDetails = await Promise.all(response.data.Search.map(async (movie) => {
          const detailsResponse = await axios.get('http://www.omdbapi.com/', {
            params: {
              apikey: '4f4b140a',
              i: movie.imdbID
            }
          });
          return { ...movie, ...detailsResponse.data, votes: 0 }; // Adding votes property initialized to 0
        }));

        setMovies(moviesWithDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleVote = (imdbID, increment) => {
    setMovies(prevMovies => {
      return prevMovies.map(movie => {
        if (movie.imdbID === imdbID) {
          return {
            ...movie,
            votes: increment ? movie.votes + 1 : movie.votes - 1
          };
        }
        return movie;
      });
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

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
              <Text fontSize="lg" fontWeight="bold">{movie.votes} Vote</Text>
              <IconButton
                aria-label="Downvote"
                icon={<FaArrowDown />}
                mt={2}
                onClick={() => handleVote(movie.imdbID, false)}
              />
            </Box>
            <Image src={movie.Poster} alt={`${movie.Title} poster`} boxSize="150px" height={"300px"} objectFit="cover" />
            <Box display={"flex"} flexDirection="column" justifyContent={"center"} alignItems={"flex-start"} p={5} >
              <Heading size="md">{movie.Title}</Heading>
              <Heading size="sm">Year: {movie.Year}</Heading>
              <Text mt={2}>Genre: {movie.Genre}</Text>
              <Text mt={2}>Director: {movie.Director}</Text>
              <Text mt={2}>Rating: {movie.imdbRating}</Text>
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
