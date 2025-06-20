// components/MobileNav.tsx
import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useLocation, useNavigate } from "react-router";

const MobileNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: "block", sm: "none" },
        zIndex: 10,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={currentPath}
        onChange={(_, newValue) => navigate(newValue)}
      >
        <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="Search"
          value="/search"
          icon={<SearchIcon />}
        />
        <BottomNavigationAction
          label="playlist"
          value="/playlist"
          icon={<LibraryBooksIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default MobileNav;
