import React, { useState, useContext } from "react"; 
import MovieList from "../movieList";
import Typography from "@mui/material/Typography";
import { getSimilarMovies } from "../../api/tmdb-api"; 
import { useQuery } from "react-query";
import { MoviesContext } from "../../contexts/moviesContext"; 
import Button from "@mui/material/Button"; 

const SimilarMovies = ({ movieId }) => { 
    const { addToFavorites } = useContext(MoviesContext); 

    const { data: similarMovies, error, isLoading, isError } = useQuery(["similarMovies", movieId], () => getSimilarMovies(movieId));
    
    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Error: {error.message}</Typography>;

    const action = (movie) => (
        <Button onClick={(e) => { e.preventDefault(); addToFavorites(movie); }}>
            Add to Favorites
        </Button>
    );

    return (
        <>
            <Typography variant="h5" component="h3">
                Similar Movies
            </Typography>

            <div style={{ 
                display: 'flex', 
                overflowX: 'auto', 
                padding: '16px 0',
            }}>
                <MovieList movies={similarMovies.results} action={action} /> 
            </div>

        </>
    );
};

export default SimilarMovies;