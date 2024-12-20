import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

const RemoveFromWatchlistIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleRemoveFromWatchlist = (e) => {
    e.preventDefault();
    context.removeFromPlaylist(movie);
  };
  return (
    <IconButton
      aria-label="remove from favorites"
      onClick={handleRemoveFromWatchlist}
    >
      <PlaylistRemoveIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromWatchlistIcon;