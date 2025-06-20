import React from "react";
import { Playlist } from "../../../models/playlist";
import {
  Avatar,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  styled,
} from "@mui/material";

interface PlaylistProps {
  playlist?: Playlist;
}

const CoverImage = styled(Avatar)({
  width: "150px",
  height: "150px",
  borderRadius: "5px",
  marginBottom: "10px",
});

//   // 플레이리스트 네임
//   console.log("pap", playlist?.name);

//   // 플레이리스트 오너
//   console.log("pap", playlist?.owner?.display_name);

//   // 플레이리스트 총 곡수
//   console.log("pbp", playlist?.tracks?.total);

//   //플레이리스트 이미지
//   console.log(playlist?.images?.[0]?.url);

const PlaylistDetailHeader = ({ playlist }: PlaylistProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!playlist) return null;

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      alignItems="center"
      px={2}
      py={3}
    >
      <CoverImage
        variant="square"
        src={playlist.images?.[0]?.url}
        alt="Playlist Cover"
      />

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems={isMobile ? "center" : "flex-start"}
        ml={isMobile ? 0 : 3}
        mt={isMobile ? 1 : 0}
      >
        <Typography
          fontSize="1.8rem"
          fontWeight={700}
          textAlign={isMobile ? "center" : "left"}
        >
          {playlist.name}
        </Typography>

        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <img
            src="https://static-00.iconduck.com/assets.00/spotify-icon-2048x2048-g0v0xlc4.png"
            width={16}
            height={16}
            alt="Spotify"
          />
          <Typography variant="body2" color="text.secondary">
            Created by {playlist.owner?.display_name || "Unknown"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • {playlist.tracks?.total} songs
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PlaylistDetailHeader;
