import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import UpcomingPage from "./pages/upcomingPage";
import TopRatedPage from "./pages/topRatedMoviesPage";
import PopularPage from "./pages/popularMoviesPage";  
import WatchlistPage from "./pages/watchlistPage";
import SignUpPage from "./pages/signupPage";
import AuthContextProvider from "./contexts/authContext";
import ProtectedRoutes from "./protectedRoutes";

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
    <AuthContextProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/upcoming" element={<UpcomingPage />} />
              <Route path="/topRated" element={<TopRatedPage />} />
              <Route path="/popular" element={<PopularPage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
            </Route>
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/movies/watchlist" element={<WatchlistPage />} />
            <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
            <Route path="/movies/:id/:transid" element={<MoviePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="*" element={ <Navigate to="/" /> } />
            <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </AuthContextProvider>
  );
};


const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);
