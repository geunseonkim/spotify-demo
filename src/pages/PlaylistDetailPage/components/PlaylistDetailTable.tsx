import React from "react";
import { PlaylistTrack } from "../../../models/playlist";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import DesktopPlaylistItem from "./DesktopPlaylistItem";

interface playlistItemsProps {
  playlistItems?: PlaylistTrack[];
}

const PlaylistDetailTable = ({ playlistItems }: playlistItemsProps) => {
  console.log("pspspsps", playlistItems);
  return (
    <>
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
          {playlistItems?.map((item, index) => {
            return (
              <DesktopPlaylistItem key={index} item={item} index={index} />
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default PlaylistDetailTable;
