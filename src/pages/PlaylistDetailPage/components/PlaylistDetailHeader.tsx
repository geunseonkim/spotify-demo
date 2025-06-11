import React from "react";
import { Playlist } from "../../../models/playlist";
import { Avatar, Box, styled, Typography } from "@mui/material";
import { PulseLoader } from "react-spinners";

interface PlaylistProps {
  playlist?: Playlist;
}

const PlaylistHeaderBox = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px",
  color: theme.palette.secondary.main,
}));

const CoverImage = styled(Avatar)({
  width: "150px",
  height: "150px",
  borderRadius: "5px",
});

const PlaylistInfo = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  marginLeft: "20px",
});

const PlaylistName = styled(Typography)({
  fontSize: "2rem",
  fontWeight: "bold",
  marginBottom: "8px",
});

const SpotifyIcon = styled("img")({
  width: "16px",
  height: "16px",
  objectFit: "contain",
});

const PlaylistOwner = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[400],
  //   marginBottom: "4px",
}));

const OwnerRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "6px",
});

const TrackCount = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[500],
}));

const PlaylistDetailHeader = ({ playlist }: PlaylistProps) => {
  console.log("ppp", playlist);
  if (!playlist) {
    return <Typography>플레이리스트에 노래가 없습니다.</Typography>;
  }

  //   // 플레이리스트 네임
  //   console.log("pap", playlist?.name);

  //   // 플레이리스트 오너
  //   console.log("pap", playlist?.owner?.display_name);

  //   // 플레이리스트 총 곡수
  //   console.log("pbp", playlist?.tracks?.total);

  //   //플레이리스트 이미지
  //   console.log(playlist?.images?.[0]?.url);

  return (
    <PlaylistHeaderBox>
      <CoverImage
        src={playlist.images?.[0]?.url}
        alt={`${playlist.name} playlist cover`}
        variant="square"
      />
      <PlaylistInfo>
        <PlaylistName>{playlist.name}</PlaylistName>
        <OwnerRow>
          <SpotifyIcon
            src="https://static-00.iconduck.com/assets.00/spotify-icon-2048x2048-g0v0xlc4.png"
            alt="Spotify icon"
          />
          <PlaylistOwner>
            Created by {playlist.owner?.display_name || "Unknown"}
          </PlaylistOwner>
          <TrackCount>• {playlist.tracks?.total} songs</TrackCount>
        </OwnerRow>
      </PlaylistInfo>
    </PlaylistHeaderBox>
  );
};

export default PlaylistDetailHeader;
