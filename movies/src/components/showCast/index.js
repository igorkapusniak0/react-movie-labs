import React from "react";
import ActorList from "../actorList";
import Typography from "@mui/material/Typography";
import { getShowCast } from "../../api/tmdb-api"; 
import { useQuery } from "react-query";

const ShowCast = ({ showId }) => { 
    const { data: showCast, error, isLoading, isError } = useQuery(["showCast", showId], () => getShowCast(showId));

    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Error: {error.message}</Typography>;

    console.log("Fetched Cast Data:", showCast); 

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
                <ActorList actors={showCast?.cast || []} /> 
            </div>
        </>
    );
};

export default ShowCast;
