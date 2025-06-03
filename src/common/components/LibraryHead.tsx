import React from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Box, styled, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const StyledLibraryAdd = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "30px",
  padding: "8px",
});
const LibraryHead = () => {
  return (
    <div>
      <StyledLibraryAdd>
        <BookmarkIcon />
        <Typography variant="h2" fontWeight={700}>
          Your Library
        </Typography>
        <AddIcon color="primary" />
      </StyledLibraryAdd>
    </div>
  );
};

export default LibraryHead;
