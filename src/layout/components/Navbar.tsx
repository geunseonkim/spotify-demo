import { Avatar, Box, Menu, MenuItem, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import LoginButton from "../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { useLocation, useNavigate } from "react-router";
import SearchBar from "../../pages/SearchPage/components/SearchBar";

const NavSearchLoginBox = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  alignItems: "center",
});

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  // const isSearchPage =
  //   location.pathname === "/search" || location.pathname === "/search/";
  const isSearchPage = location.pathname.startsWith("/search");

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    // navigate("/");
    localStorage.removeItem("access_token");
    localStorage.removeItem("code_verifier");
    window.location.reload();
    // navigate("/");
  };
  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      height="64px"
      px={2}
      bgcolor="background.paper"
    >
      {userProfile ? (
        <>
          {isSearchPage ? (
            <>
              <NavSearchLoginBox>
                <SearchBar />
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  sx={{ cursor: "pointer" }}
                  onClick={handleMenuOpen}
                >
                  <Avatar
                    alt={userProfile.display_name}
                    src={
                      userProfile.images?.[0]?.url ||
                      "https://dh.aks.ac.kr/~dh_edu/wiki/images/thumb/a/a7/선글라스곰.jpg/350px-선글라스곰.jpg"
                    }
                    sx={{ width: 40, height: 40 }}
                  />
                  <Typography
                    variant="body1"
                    color="text.primary"
                    sx={{
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    {userProfile.display_name}
                  </Typography>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={logout}>Log out</MenuItem>
                </Menu>
              </NavSearchLoginBox>
            </>
          ) : (
            <>
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                sx={{ cursor: "pointer" }}
                onClick={handleMenuOpen}
              >
                <Avatar
                  alt={userProfile.display_name}
                  src={
                    userProfile.images?.[0]?.url ||
                    "https://dh.aks.ac.kr/~dh_edu/wiki/images/thumb/a/a7/선글라스곰.jpg/350px-선글라스곰.jpg"
                  }
                  sx={{ width: 40, height: 40 }}
                />
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  {userProfile.display_name}
                </Typography>
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={logout}>Log out</MenuItem>
              </Menu>
            </>
          )}
        </>
      ) : (
        <>
          {isSearchPage ? (
            <NavSearchLoginBox>
              <SearchBar />
              <LoginButton />
            </NavSearchLoginBox>
          ) : (
            <LoginButton />
          )}
        </>
      )}
    </Box>
  );
};

export default Navbar;
