import { Box, styled, Typography } from "@mui/material";
import React from "react";
import { NavLink, Outlet } from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryHead from "./components/LibraryHead";
import Library from "./components/Library";
import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";

const Layout = styled("div")({
  display: "flex",
  height: "100vh",
  padding: "8px",
});

const Sidebar = styled("div")(({ theme }) => ({
  width: "331px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
  marginRight: "8px",
}));

const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "100%",
  padding: "15px",
  marginBottom: "8px",
  marginRight: "8px",
  // overflow: "hidden",
  height: "100%",
  overflowY: "auto",
  paddingBottom: "50px",
}));

const NavList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
});

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  marginBottom: "15px",
  color: theme.palette.text.secondary,
  "&:hover": {
    color: theme.palette.text.primary,
  },
  "&.active": {
    color: theme.palette.text.primary,
  },
}));

const ShortContentBox = styled(ContentBox)({
  height: "auto",
  maxHeight: 120,
  overflowY: "auto",
});

const LongContentBox = styled(ContentBox)({
  flexGrow: 1, // 가능한 공간 모두 차지.
  minHeight: 0, // flexbox에서 스크롤이 제대로 작동하려면 필요함!
  overflowY: "auto",
});

const AppLayout = () => {
  return (
    <Layout>
      {/* 데스크탑 사이드바 */}
      <Sidebar>
        <ShortContentBox>
          <NavList>
            <StyledNavLink to="/">
              <HomeIcon />
              <Typography variant="h2" fontWeight={700}>
                home
              </Typography>
            </StyledNavLink>

            <StyledNavLink to="/search">
              <SearchIcon />
              <Typography variant="h2" fontWeight={700}>
                search
              </Typography>
            </StyledNavLink>
          </NavList>
        </ShortContentBox>

        <LongContentBox>
          <LibraryHead />
          <Library />
        </LongContentBox>
      </Sidebar>

      {/* 메인 콘텐츠 */}
      <ContentBox>
        <Navbar />
        <Outlet />
      </ContentBox>

      {/* 모바일 하단 바 */}
      <MobileNav />
    </Layout>
  );
};

export default AppLayout;
