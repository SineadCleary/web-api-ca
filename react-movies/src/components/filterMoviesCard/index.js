import React, {useState, useEffect}  from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg';
import { getGenres } from "../../api/tmdb-api";
import { getLanguages } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'

const formControl = 
  {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)"
  };

export default function FilterMoviesCard(props) {

  const { data, error, isLoading, isError } = useQuery("genres", getGenres);
  const { data: lData, error: lError, isLoading: lIsLoading, isError: lIsError } = useQuery("languages", getLanguages);

  if (isLoading) {
    return <Spinner />;
  }

  if (lIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if (lIsError) {
    return <h1>{lError.message}</h1>;
  }

  const genres = data.genres;
  if (genres[0].name !== "All"){
    genres.unshift({ id: "0", name: "All" });
    console.log(data)
    console.log(lData)
  }

  // const languages = lData.languages;
  // if (languages.slice[0].name !== "All"){
  //   languages.unshift({ id: "0", name: "All" });
  // }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleWatchProviderChange = (e) => {
    handleChange(e, "watchProvider", e.target.value);
  }


  return (
    <Card 
      sx={{
        backgroundColor: "rgb(0, 153, 153)"
      }} 
      variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter movies
        </Typography>
        <TextField
        sx={{...formControl}}
        id="filled-search"
        label="Search field"
        type="search"
        variant="filled"
        value={props.titleFilter}
        onChange={handleTextChange}
        />

        <FormControl sx={{...formControl}}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            defaultValue=""
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        {/* <FormControl>
          <InputLabel id="language-label">Translations Available</InputLabel>
          <Select
            labelId="language-label"
            id="language-select"
            defaultValue=""
            value={props.languageFilter}
            onChange={handleLanguageChange}
          >
            {languages.map((lang) => {
              return (
                <MenuItem key={lang.provider_id} value={lang.provider_id}>
                  {lang.provider_name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl> */}
      </CardContent>
      <CardMedia
        sx={{ height: 300 }}
        image={img}
        title="Filter"
      />
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter movies
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}
