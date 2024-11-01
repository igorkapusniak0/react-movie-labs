import React from "react";
import { createRoot } from "react-dom/client";

import HomePage from "./pages/homePage";
import ShowsHomePage from "./pages/showHomePage";

import MoviePage from "./pages/movieDetailsPage";
import ShowPage from "./pages/ShowDetailsPage";

import FavoriteMoviesPage from "./pages/favoriteMoviesPage";

import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import UpcomingShowsPage from "./pages/upcomingShowsPage";

import MovieReviewPage from "./pages/movieReviewPage";

import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import TopRatedShowsPage from "./pages/topRatedShowsPage";

import SiteHeader from './components/siteHeader'
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';

import MoviesContextProvider from "./contexts/moviesContext";
import ShowsContextProvider from "./contexts/showsContext";

import AddMovieReviewPage from './pages/addMovieReviewPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <ShowsContextProvider>
            <Routes>
              <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/movies" element={<HomePage />} />
              <Route path="/reviews/form" element={<AddMovieReviewPage />} />
              <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
              <Route path="/movies/top_rated" element={<TopRatedMoviesPage />} />

              <Route path="/shows" element={<ShowsHomePage />} />
              <Route path="/shows/upcoming" element={<UpcomingShowsPage />} />
              <Route path="/shows/top_rated" element={<TopRatedShowsPage />} />
              <Route path="/shows/:id" element={<ShowPage />} />

              <Route path="*" element={<Navigate to="/movies" />} />
            </Routes>
          </ShowsContextProvider>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);