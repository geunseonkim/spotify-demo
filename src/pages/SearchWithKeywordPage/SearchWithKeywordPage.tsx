import React, { useState } from "react";
import { useParams } from "react-router";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";
import { PulseLoader } from "react-spinners";
import ErrorMessage from "../../common/components/ErrorMessage";
import {
  Alert,
  alpha,
  Box,
  Grid,
  Snackbar,
  styled,
  Typography,
} from "@mui/material";
import PlayButton from "../../common/components/PlayButton";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import Card from "../../common/components/Card";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";

const SearchWithKeywordPage = () => {
  const { keyword } = useParams<{ keyword: string }>();
  const { data, isLoading, error } = useSearchItemsByKeyword({
    q: keyword || "",
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Album, SEARCH_TYPE.Artist],
  });
  const { data: userProfile } = useGetCurrentUserProfile();
  const [loginAlertOpen, setLoginAlertOpen] = useState(false);

  // console.log("data", data);

  const TrackResults = data?.pages?.[0]?.tracks?.items ?? [];
  const ArtistResults = data?.pages?.[0]?.artists?.items ?? [];
  const AlbumResults = data?.pages?.[0]?.albums?.items ?? [];

  if (isLoading) return <PulseLoader color="#1DB954" />;
  if (error) return <ErrorMessage errorMessage={error.message} />;

  const handleAddPlaylist = () => {
    if (!userProfile) {
      setLoginAlertOpen(true);
      return;
    }
  };

  return (
    <div>
      <Box sx={{ width: "100%", display: "flex" }}>
        {/* top result */}
        <div style={{ width: "45%" }}>
          <Typography variant="h1" fontWeight={800}>
            Top result
          </Typography>
          {TrackResults.length > 0 ? (
            <TopResultBox>
              <div style={{ position: "relative" }}>
                <AlbumImage
                  src={TrackResults[0]?.album?.images?.[0]?.url || ""}
                  alt={TrackResults[0]?.name || ""}
                />
                <Typography variant="h1" fontWeight={800} mt={2}>
                  {TrackResults[0]?.album?.name || ""}
                </Typography>
                <Typography mt={1}>
                  Song ●{" "}
                  {TrackResults[0]?.artists?.[0]?.name || "unknown artist"}
                </Typography>
                <Overlay className="overlay">
                  <PlayButton />
                </Overlay>
              </div>
            </TopResultBox>
          ) : (
            <Typography>No top result found</Typography>
          )}
        </div>

        {/* songs */}
        <div style={{ width: "55%" }}>
          <Typography variant="h1" fontWeight={800}>
            Songs
          </Typography>

          {TrackResults?.slice(0, 4).map((song, i) => (
            <TrackItem key={i}>
              <SongsAlbumImage
                src={song?.album?.images[0].url || ""}
                alt={song.name}
              />
              <Box flex={2}>
                <Typography fontWeight={600}>{song?.album?.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {song?.artists?.[0]?.name || "unknown artist"}
                </Typography>
              </Box>

              <Box flex={1}>
                <PlusAddOverlay className="plusAddOverlay">
                  <ControlPointOutlinedIcon
                    color="secondary"
                    sx={{ fontSize: "20px", cursor: "pointer" }}
                    onClick={handleAddPlaylist}
                  />
                </PlusAddOverlay>
              </Box>

              <SecondaryText>
                {song?.duration_ms
                  ? `${Math.floor(song?.duration_ms / 60000)}:${String(
                      Math.floor((song?.duration_ms % 60000) / 1000)
                    ).padStart(2, "0")}`
                  : "unknown"}
              </SecondaryText>
            </TrackItem>
          ))}
        </div>
      </Box>

      {/* artists */}
      <div>
        <Typography variant="h1" fontWeight={800} mb={2}>
          Artists
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
          {ArtistResults?.slice(0, 6).map((artist, i) => (
            <ArtistCard key={i}>
              <ArtistImage
                src={artist?.images?.[0]?.url || ""}
                alt={artist?.name}
              />
              <Typography variant="body1" fontWeight={600}>
                {artist?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Artist
              </Typography>

              <ArtistOverlay className="artistOverlay">
                <PlayButton />
              </ArtistOverlay>
            </ArtistCard>
          ))}
        </Box>
      </div>

      {/* albums */}
      <div>
        <Typography variant="h1" fontWeight={800} mt={2}>
          Albums
        </Typography>
        {AlbumResults && AlbumResults.length > 0 ? (
          <Grid container spacing={1}>
            {AlbumResults.slice(0, 6).map((album) => (
              <Grid size={{ xs: 6, sm: 4, md: 2 }} key={album.id}>
                <Card
                  image={album.images[0].url}
                  name={album.name}
                  artistName={album.artists[0].name}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h2">No Data</Typography>
        )}
      </div>

      {/* Snackbar */}
      <Snackbar
        open={loginAlertOpen}
        autoHideDuration={3000}
        onClose={() => setLoginAlertOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={() => setLoginAlertOpen(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Please log in.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SearchWithKeywordPage;

const AlbumImage = styled("img")({
  borderRadius: "4px",
  width: "100px",
  height: "100px",
  marginRight: " 12px",
  objectFit: "cover",
});

const TopResultBox = styled(Box)(({ theme }) => ({
  marginTop: "10px",
  padding: "20px 20px",
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
    transition: "background-color 0.2s ease",
  },
  "&:hover .overlay": {
    opacity: 1,
  },
}));

const Overlay = styled("div")({
  position: "absolute",
  bottom: "0px",
  right: "10px",
  opacity: 0,
  transform: "translate3d(0px, 0px, 0px)",
  transition: "opacity 0.3s ease-in-out",
});

const SongsAlbumImage = styled("img")({
  borderRadius: "4px",
  width: "35px",
  height: "35px",
  marginRight: " 12px",
  objectFit: "cover",
});

const TrackItem = styled(Box)(({ theme }) => ({
  marginTop: "10px",
  display: "flex",
  alignItems: "center",
  padding: "6px 12px",
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
    transition: "background-color 0.2s ease",
  },
  "&:hover .plusAddOverlay": {
    opacity: 1,
  },
}));

const SecondaryText = styled(Typography)(({ theme }) => ({
  fontSize: "0.86rem",
  color: theme.palette.text.secondary,
  paddingRight: "20px",
}));

const PlusAddOverlay = styled("div")({
  opacity: 0,
  transition: "opacity 0.3s ease-in-out",
});

const ArtistCard = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "calc(100% / 6 - 16px)", // 6등분에서 gap 고려.
  margin: "4px 8px",
  paddingTop: "8px",
  paddingBottom: "8px",
  borderRadius: "8px",
  overflow: "hidden",
  backgroundColor: theme.palette.background.paper,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
    cursor: "pointer",
  },
  "&:hover .artistOverlay": {
    opacity: 1,
  },
}));

const ArtistImage = styled("img")({
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  objectFit: "cover",
  marginBottom: "10px",
});

const ArtistOverlay = styled("div")({
  position: "absolute",
  bottom: "10px",
  right: "10px",
  opacity: 0,
  transition: "opacity 0.3s ease-in-out",
});
