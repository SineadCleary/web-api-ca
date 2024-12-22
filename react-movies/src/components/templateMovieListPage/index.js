import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid2";
import Pagination from '@mui/material/Pagination';
import { Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import { useQuery } from "react-query";
import { getMovies } from "../../api/movies-api";
import Spinner from "../spinner";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);
  const [languageFilter, setLanguageFilter] = useState("0");
  const watchProviderId = Number(languageFilter);
  const [page, setPage] = React.useState(1);

  const { data, error, isLoading, isError } = useQuery(
    ["movies", { page }],
    getMovies
  );

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    // .filter((m) => {
    //   return languageId > 0 ? m.language_ids.includes(watchProviderId) : true;
    // })

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}}>
        <Grid 
          key="find" 
          size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} 
          sx={{padding: "20px"}}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>
        
      </Grid>
      <Paper 
          sx={{ 
            width: "100%", 
            padding: 2, 
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }} 
        >
          <Typography>Page: {page}</Typography>
          <Pagination count={5} color="secondary" page={page} onChange={handlePageChange} />
        </Paper>
    </Grid>
  );
}
export default MovieListPageTemplate;
