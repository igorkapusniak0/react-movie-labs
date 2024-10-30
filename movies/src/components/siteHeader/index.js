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

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = ({ history }) => {
  const [anchorElMedia, setAnchorElMedia] = useState(null);
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState("Movies");

  const openMedia = Boolean(anchorElMedia);
  const openMenu = Boolean(anchorElMenu);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const navigate = useNavigate();

  const menuMovieOptions = [
    { label: "Home", path: "/movies" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Upcomng", path: "/movies/upcoming" },
    { label: "Top Rated", path: "/movies/top_rated" },
  ];

  const menuShowOptions = [
    { label: "Home", path: "/shows" },
    { label: "Favorites", path: "/shows/favorites" },
    { label: "Upcomng", path: "/shows/upcoming" },
    { label: "Top Rated", path: "/shows/top_rated" },
  ];

  const mediaOptions = [
    { label: "Movies", path: "/movies/" },
    { label: "Shows", path: "/shows/" },

  ];

  const handleMenuSelect = (pageURL) => {
    navigate(pageURL, { replace: true });
    setAnchorElMenu(null);
  };
  const handleMediaSelect = (pageURL, mediaLabel) => {
    setSelectedMedia(mediaLabel);
    navigate(pageURL, { replace: true });
    setAnchorElMedia(null);
  };

  const handleMenu = (event) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleMedia = (event) => {
    setAnchorElMedia(event.currentTarget);
  };

  const currentMenuOptions = selectedMedia === "Movies"? menuMovieOptions : menuShowOptions;

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <IconButton
                  aria-label="menu"
                  aria-controls="media-menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMedia}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="media-menu-appbar"
                  anchorEl={anchorElMedia}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={openMedia}
                  onClose={() => setAnchorElMedia(null)}
                >
                  {mediaOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMediaSelect(opt.path, opt.label)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </Menu>
             
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            All you ever wanted to know about {selectedMedia}!
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
                  anchorEl={anchorElMenu}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={openMenu}
                  onClose={() => setAnchorElMenu(null)}
                >
                  {currentMenuOptions.map((opt) => (
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
                {currentMenuOptions.map((opt) => (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </>
            )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;