import React, { useState, useContext } from "react"; 
import ShowList from "../showList";
import Typography from "@mui/material/Typography";
import { getSimilarShows } from "../../api/tmdb-api"; 
import { useQuery } from "react-query";
import { ShowsContext } from "../../contexts/showsContext"; 
import Button from "@mui/material/Button"; 

const SimilarShows = ({ showId }) => { 
    const { addToFavorites } = useContext(ShowsContext); 

    const { data: similarShows, error, isLoading, isError } = useQuery(["similarShows", showId], () => getSimilarShows(showId));
    
    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Error: {error.message}</Typography>;

    const action = (show) => (
        <Button onClick={(e) => { e.preventDefault(); addToFavorites(show); }}>
            Add to Favorites
        </Button>
    );

    return (
        <>
            <Typography variant="h5" component="h3">
                Similar Shows
            </Typography>

            <div style={{ 
                display: 'flex', 
                overflowX: 'auto', 
                padding: '16px 0',
            }}>
                <ShowList shows={similarShows.results} action={action} /> 
            </div>

        </>
    );
};

export default SimilarShows;
