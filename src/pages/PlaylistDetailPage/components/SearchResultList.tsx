import React, { useEffect, forwardRef } from "react";
import { Box, Button, Typography, styled } from "@mui/material";
import { Track } from "../../../models/track";
import { useInView } from "react-intersection-observer";
import { PulseLoader } from "react-spinners";

const TrackItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "12px 12px",
  //   borderBottom: "1px solid #eee",
});

const AlbumImage = styled("img")({
  borderRadius: "4px",
  width: "45px",
  height: " 45px",
  marginRight: " 12px",
  objectFit: "cover",
});

interface SearchResultListProps {
  list: Track[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  root?: Element | null;
}

const SearchResultList = ({
  list,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  root,
}: SearchResultListProps) => {
  const [ref, inView] = useInView({
    root,
    threshold: 1.0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div>
      {list.map((track, index) => {
        const isLast = index === list.length - 1;

        return (
          <TrackItem key={track.id} ref={isLast ? ref : undefined}>
            <AlbumImage src={track.album?.images?.[0]?.url} alt={track.name} />
            <Box flex={1}>
              <Typography fontWeight={600}>{track.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {track.artists?.[0]?.name || "Unknown Artist"}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {track.album?.name || "Unknown Album"}
              </Typography>
            </Box>
            <Button variant="outlined" size="small">
              Add
            </Button>
            {isLast && isFetchingNextPage && (
              <Box ml={2}>
                <PulseLoader color="#1DB954" size={8} />
              </Box>
            )}
          </TrackItem>
        );
      })}
    </div>
  );
};

export default SearchResultList;
