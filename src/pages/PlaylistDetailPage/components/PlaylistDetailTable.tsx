import React from "react";
import {
  useTheme,
  useMediaQuery,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { PlaylistTrack } from "../../../models/playlist";
import DesktopPlaylistItem from "./DesktopPlaylistItem";
import MobilePlaylistItem from "./MobilePlaylistItem";

interface playlistItemsProps {
  playlistItems?: PlaylistTrack[];
}

const PlaylistDetailTable = ({ playlistItems }: playlistItemsProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isMobile) {
    return (
      <>
        {playlistItems?.map((item, index) => (
          <MobilePlaylistItem key={index} item={item} index={index} />
        ))}
      </>
    );
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Album</TableCell>
          <TableCell>Date added</TableCell>
          <TableCell>Duration</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {playlistItems?.map((item, index) => (
          <DesktopPlaylistItem key={index} item={item} index={index} />
        ))}
      </TableBody>
    </Table>
  );
};

export default PlaylistDetailTable;
