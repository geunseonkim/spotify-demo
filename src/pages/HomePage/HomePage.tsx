import React from "react";
import NewReleases from "./components/NewReleases";
import RecommendArtist from "./components/RecommendArtist";
import RunningTrack from "./components/RunningTrack";
import TopGroupTrack from "./components/TopGroupTrack";

const HomePage = () => {
  return (
    <div>
      <NewReleases />
      <RecommendArtist />
      <RunningTrack />
      <TopGroupTrack />
    </div>
  );
};

export default HomePage;
