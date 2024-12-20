import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import ListIcon from '@mui/icons-material/List';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import PeopleIcon from '@mui/icons-material/People';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = ({ history }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = React.useState(0);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const navigate = useNavigate();

  const menuOptions = [
    { label: "Home", icon: <HomeIcon/>, path: "/" },
    { label: "Favourites", icon: <FavoriteIcon/>, path: "/movies/favorites" },
    { label: "Watchlist", icon: <ListIcon/>, path: "/movies/watchlist" },
    { label: "Upcoming", icon: <HourglassTopIcon />, path: "/upcoming" },
    { label: "Top Rated", icon: <StarIcon />, path: "/topRated" },
    { label: "Popular", icon: <PeopleIcon />, path: "/popular" },
  ];

  const handleMenuSelect = (pageURL) => {
    navigate(pageURL, { replace: true });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            All you ever wanted to know about Movies!
          </Typography>
            {isMobile ? (
              <>
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {menuOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
              <Tabs value={value} onChange={handleChange} aria-label="icon-tabs" >
                {menuOptions.map((opt) => (
                  <Tab
                    label={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                    icon={opt.icon}
                  >
                    {opt.label}
                  </Tab>
                ))}
              </Tabs>
              </>
            )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
    

    
  );
};

export default SiteHeader;
