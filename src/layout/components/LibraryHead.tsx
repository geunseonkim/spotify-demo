import React from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {
  Box,
  Button,
  styled,
  Typography,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useCreatePlaylist from "../../hooks/useCreatePlaylist";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { getSpotifyAuthUrl } from "../../utils/auth";
import ErrorMessage from "../../common/components/ErrorMessage";

const StyledLibraryAdd = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "10px",
  padding: "8px",
  width: "100%",
});

const MobileLibraryHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px",
  width: "100%",
});

const LibraryHead = () => {
  const { mutate: createPlaylist, error } = useCreatePlaylist();
  const { data: userProfile } = useGetCurrentUserProfile();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCreatePlaylist = () => {
    if (userProfile) {
      createPlaylist({ name: "My Playlist" });
    } else {
      getSpotifyAuthUrl();
    }
  };

  // 모바일 전용 헤더
  if (isMobile) {
    return (
      <MobileLibraryHeader>
        <Typography
          variant="h1"
          fontWeight={700}
          style={{ whiteSpace: "nowrap" }}
        >
          Your Library
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Button onClick={handleCreatePlaylist} size="small" variant="text">
            <AddIcon fontSize="medium" color="primary" />
          </Button>
          {userProfile?.images?.[0]?.url && (
            <Avatar
              alt={userProfile.display_name}
              src={userProfile.images[0].url}
              sx={{ width: 36, height: 36 }}
            />
          )}
        </Box>
      </MobileLibraryHeader>
    );
  }

  // 데스크탑용 기존 헤더
  return (
    <StyledLibraryAdd>
      <BookmarkIcon fontSize="medium" />
      <Typography
        variant="h1"
        fontWeight={700}
        ml={4}
        style={{ whiteSpace: "nowrap" }}
      >
        Your Library
      </Typography>
      <Button onClick={handleCreatePlaylist} size="small" variant="text">
        <AddIcon fontSize="medium" color="primary" />
      </Button>
    </StyledLibraryAdd>
  );
};

export default LibraryHead;
