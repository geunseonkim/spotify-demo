import { Grid, Typography } from "@mui/material";
import React from "react";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import { PulseLoader } from "react-spinners";
import ErrorMessage from "../../../common/components/ErrorMessage";
import Card from "../../../common/components/Card";

const TopGroupTrack = () => {
  const { data, isLoading, error } = useSearchItemsByKeyword({
    q: "블랙핑크",
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Album, SEARCH_TYPE.Artist],
    limit: 20,
  });

  const TrackResults = data?.pages?.[0]?.tracks?.items ?? [];

  console.log("ttt", TrackResults);

  if (isLoading) return <PulseLoader color="#1DB954" />;
  if (error) return <ErrorMessage errorMessage={error.message} />;
  return (
    <div>
      <Typography variant="h1" fontWeight={800} mt={2}>
        Blackpink Essentials
        <Typography
          variant="h2"
          color="text.secondary"
          sx={{ maxWidth: 600, lineHeight: 1.5 }}
          mt={1}
        >
          A handpicked collection of Blackpink's hottest tracks 🔥
        </Typography>
      </Typography>
      {TrackResults && TrackResults.length > 0 ? (
        <Grid container spacing={1}>
          {TrackResults.slice(0, 11).map((track) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={track.id}>
              <Card
                image={track?.album?.images[0].url || ""}
                name={track.name || ""}
                artistName={track?.artists?.[0]?.name || "unknown artist"}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h2">No Data</Typography>
      )}
    </div>
  );
};

export default TopGroupTrack;
