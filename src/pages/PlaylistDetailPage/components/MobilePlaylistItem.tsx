import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { PlaylistTrack } from "../../../models/playlist";

interface Props {
  item: PlaylistTrack;
  index: number;
}

const MobilePlaylistItem = ({ item, index }: Props) => {
  const track = item.track;
  console.log("Ttt", track);

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      px={2}
      py={1}
      borderBottom="1px solid #444"
    >
      <Avatar
        variant="square"
        src={track?.album?.images[0]?.url}
        alt={track?.name}
        sx={{ width: 56, height: 56 }}
      />
      <Box overflow="hidden">
        <Typography fontWeight={600} fontSize="14px" noWrap>
          {track?.name}
        </Typography>
        <Typography fontSize="13px" color="text.secondary" noWrap>
          {track?.artists?.map((a) => a.name).join(", ")}
        </Typography>
      </Box>
    </Box>
  );
};

export default MobilePlaylistItem;
