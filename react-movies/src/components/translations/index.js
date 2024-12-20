  import React, { useEffect, useState }  from "react";
  import { getTranslations } from "../../api/tmdb-api";
  import { useQuery } from "react-query";
  import Spinner from '../spinner';
  import Chip from "@mui/material/Chip";
  import { Link } from "@mui/material";
  import Button from '@mui/material/Button';
  import Menu from '@mui/material/Menu';
  import MenuItem from '@mui/material/MenuItem';
  import { useNavigate } from "react-router-dom";
  import TranslateIcon from '@mui/icons-material/Translate';

  export default function Translations({ movie }) {
    const { data , error, isLoading, isError } = useQuery(
      ["translations", { id: movie.id }],
      getTranslations
    );

    // From ----
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    // ----
    const handleMenuSelect = (pageURL) => {
      navigate(pageURL, { replace: true });
    };

    const navigate = useNavigate();
    
    if (isLoading) {
      return <Spinner />;
    }

    if (isError) {
      return <h1>{error.message}</h1>;
    }
    
    const translations = data.translations;

    return (
    <div>
      <Chip
        id="translations-chip"
        icon={<TranslateIcon />}
        label="Translations"
        color="secondary"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      />
      <Menu
        id="translations-chip"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {translations.map((t) => (
          // iso_3166_1 - country code
          // t.iso_639_1 - lang code
          <li key={`${t.iso_639_1}-${t.iso_3166_1}`}> 
              <MenuItem onClick={() => handleMenuSelect(`/movies/${movie.id}/${t.iso_639_1}-${t.iso_3166_1}`)}>
                {t.name} - {t.iso_3166_1}
              </MenuItem>
          </li>
        ))}
      </Menu>
    </div>

      // console.log(translations)
    );
  }
