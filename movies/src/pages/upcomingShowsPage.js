import React from "react";
import { getUpcomingShows } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToPlaylistIcon from '../components/cardIcons/playlistAdd';

const UpcomingShowsPage = (props) => {

  const {  data, error, isLoading, isError }  = useQuery('upcomingShows', getUpcomingShows)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const shows = data.results;

  // Redundant, but necessary to avoid app crashing.
  const playlist = shows.filter(m => m.playlist)

  localStorage.setItem('playlist', JSON.stringify(playlist))
  //const addToFavorites = (movieId) => true 
  

  return (
    <PageTemplate
      title="Upcoming Shows"
      movies={shows}
      action={(show) => {
        return <AddToPlaylistIcon movie={show} />
      }}
    />
);
}
export default UpcomingShowsPage;