import React from "react";
import { PlaylistTrack } from "../../../models/playlist";
import { alpha, styled, TableCell, TableRow, Typography } from "@mui/material";
import { Episode, Track } from "../../../models/track";

interface DesktopPlaylistItemProps {
  index: number;
  item: PlaylistTrack;
}

const NoBorderTableCell = styled(TableCell)({
  borderBottom: "none",
  paddingTop: "12px",
  paddingBottom: "12px",
});

const HoverTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.3),
    transition: "background-color 0.2s ease",
  },
  cursor: "pointer",
}));

const IndexCell = styled(NoBorderTableCell)(({ theme }) => ({
  width: "30px",
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const SecondaryText = styled(Typography)(({ theme }) => ({
  fontSize: "0.86rem",
  color: theme.palette.text.secondary,
}));

const DesktopPlaylistItem = ({ item, index }: DesktopPlaylistItemProps) => {
  const isEpisode = (track: Track | Episode): track is Episode => {
    return "description" in track;
  };
  return (
    <HoverTableRow>
      <IndexCell>{index + 1}</IndexCell>
      <NoBorderTableCell>{item?.track?.name || "no name"}</NoBorderTableCell>
      <NoBorderTableCell>
        <SecondaryText>
          {item?.track
            ? isEpisode(item.track)
              ? "N/A"
              : item.track.album?.name || "no album"
            : "no track"}
        </SecondaryText>
      </NoBorderTableCell>
      <NoBorderTableCell>
        <SecondaryText>
          {item?.added_at
            ? new Date(item.added_at).toISOString().slice(0, 10)
            : "unknown"}
        </SecondaryText>
      </NoBorderTableCell>
      <NoBorderTableCell>
        <SecondaryText>
          {item?.track?.duration_ms
            ? `${Math.floor(item.track.duration_ms / 60000)}:${String(
                Math.floor((item.track.duration_ms % 60000) / 1000)
              ).padStart(2, "0")}`
            : "unknown"}
        </SecondaryText>
      </NoBorderTableCell>
    </HoverTableRow>
  );
};

export default DesktopPlaylistItem;
