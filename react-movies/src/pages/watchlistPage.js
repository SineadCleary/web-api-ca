import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import PlaylistRemove from "../components/cardIcons/playlistRemove";

const WatchlistPage = () => {
  const {playlist: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const watchlistQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = watchlistQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = watchlistQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  const toDo = () => true;

  return (
    <PageTemplate
      title="Watchlist"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <PlaylistRemove movie={movie} />
          </>
        );
      }}
    />
  );
}

export default WatchlistPage;
