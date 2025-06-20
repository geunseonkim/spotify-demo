import { alpha, Box, styled, Typography } from "@mui/material";
import React from "react";
import PlayButton from "../../../common/components/PlayButton";
import { SEARCH_TYPE } from "../../../models/search";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { PulseLoader } from "react-spinners";
import ErrorMessage from "../../../common/components/ErrorMessage";

const ArtistCard = styled(Box)(({ theme }) => ({
  position: "relative",
  margin: "8px",
  padding: "8px",
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

  // 반응형 width 설정
  width: "calc(50% - 16px)", // 기본: 모바일 (2개)
  [theme.breakpoints.up("sm")]: {
    width: "calc(33.33% - 16px)", // small 이상: 3개
  },
  [theme.breakpoints.up("md")]: {
    width: "calc(25% - 16px)", // medium 이상: 4개
  },
  [theme.breakpoints.up("lg")]: {
    width: "calc(16.66% - 16px)", // large 이상: 6개
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

const RecommendArtist = () => {
  const { data, isLoading, error } = useSearchItemsByKeyword({
    q: "plave",
    type: [SEARCH_TYPE.Album],
    limit: 10,
  });

  const AlbumResults = data?.pages?.[0]?.albums?.items ?? [];

  if (isLoading) return <PulseLoader color="#1DB954" />;
  if (error) return <ErrorMessage errorMessage={error.message} />;

  return (
    <div>
      <div>
        <Typography variant="h1" paddingTop="8px" pb={1}>
          Featured Artist: PLAVE
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.4, letterSpacing: 0.3 }}
            mt={1}
          >
            Break the stereotype of virtual idols and dive into a new world.
            Especially their latest release, かくれんぼ-Kakurenbo, will be the
            soundtrack of your summer.
          </Typography>
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0,
            textAlign: "center",
          }}
        >
          {AlbumResults?.slice(0, 10).map((artist, i) => (
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
    </div>
  );
};

export default RecommendArtist;
