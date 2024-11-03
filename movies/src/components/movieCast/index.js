import React from "react";
import ActorList from "../actorList";
import Typography from "@mui/material/Typography";
import { getMovieCast } from "../../api/tmdb-api"; 
import { useQuery } from "react-query";

const MovieCast = ({ movieId }) => { 
    const { data: movieCast, error, isLoading, isError } = useQuery(["movieCast", movieId], () => getMovieCast(movieId));

    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Error: {error.message}</Typography>;

    console.log("Fetched Cast Data:", movieCast); 
    return (
        <>
            <Typography variant="h5" component="h3">
                Cast
            </Typography>

            <div style={{ 
                display: 'flex', 
                overflowX: 'auto', 
                padding: '16px 0',
            }}>
                <ActorList actors={movieCast?.cast || []} /> 
            </div>
        </>
    );
};

export default MovieCast;
