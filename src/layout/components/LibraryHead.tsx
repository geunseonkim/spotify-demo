import React from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Box, Button, styled, Typography } from "@mui/material";
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

const LibraryHead = () => {
  const { mutate: createPlaylist, error } = useCreatePlaylist();
  const { data: userProfile } = useGetCurrentUserProfile();

  const handleCreatePlaylist = () => {
    if (userProfile) {
      createPlaylist({ name: "My Playlist" });
    } else {
      getSpotifyAuthUrl();
    }
  };
  return (
    <div>
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
    </div>
  );
};

export default LibraryHead;
