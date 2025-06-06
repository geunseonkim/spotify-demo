import { Grid, Typography } from "@mui/material";
import React from "react";
import useGetNewReleases from "../../../hooks/useGetNewReleases";
import { PulseLoader } from "react-spinners";
import ErrorMessage from "../../../common/components/ErrorMessage";
import Card from "../../../common/components/Card";

const NewReleases = () => {
  const { data, error, isLoading } = useGetNewReleases();
  console.log("NewReleases", data);
  if (isLoading) return <PulseLoader />;
  if (error) return <ErrorMessage errorMessage={error.message} />;
  return (
    <div>
      <Typography variant="h1" paddingTop="8px">
        New Released Albums
      </Typography>
      {data && data.albums.items.length > 0 ? (
        <Grid container spacing={1}>
          {data.albums.items.map((album) => (
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
      <img
        width={150}
        style={{ margin: "15px" }}
        src="https://i.pinimg.com/474x/b1/21/c5/b121c5f0fc61f5a27903d897cbbe160a.jpg?type=w800"
      />
    </div>
  );
};

export default NewReleases;
