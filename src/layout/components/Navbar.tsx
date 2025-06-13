import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import LoginButton from "../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { useNavigate } from "react-router";

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

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
            <Typography variant="body1" color="text.primary">
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
      ) : (
        <LoginButton />
      )}
    </Box>
  );
};

export default Navbar;
