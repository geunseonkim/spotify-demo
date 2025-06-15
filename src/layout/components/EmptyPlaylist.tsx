import { Box, Button, Card, styled, Typography } from "@mui/material";
import React from "react";
import { getSpotifyAuthUrl } from "../../utils/auth";

const EmptyPliBox = styled(Card)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  width: "100%",
  padding: "15px",
  marginTop: "10px",
  textAlign: "center",
}));

const EmptyPliButton = styled(Button)({
  marginTop: "10px",
  padding: "8px 50px",
  fontWeight: "700",
});

const EmptyPlaylist = () => {
  const handleCreatePlaylist = () => {
    getSpotifyAuthUrl();
  };
  return (
    <div>
      <EmptyPliBox>
        <Typography variant="h2" fontWeight={700} marginBottom="5px">
          Create your first playlist
        </Typography>
        <Typography variant="body1">It's easy, we'll help you</Typography>
        <EmptyPliButton
          variant="contained"
          color="primary"
          onClick={handleCreatePlaylist}
        >
          create playlist
        </EmptyPliButton>
      </EmptyPliBox>
    </div>
  );
};

export default EmptyPlaylist;
