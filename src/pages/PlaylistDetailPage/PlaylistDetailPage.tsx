import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router";
import {
  Box,
  styled,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { PulseLoader } from "react-spinners";
import { useInView } from "react-intersection-observer";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import useGetPlaylist from "../../hooks/useGetPlaylist";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import PlaylistDetailHeader from "./components/PlaylistDetailHeader";
import PlaylistDetailTable from "./components/PlaylistDetailTable";
import EmptyPlaylistWithSearch from "./components/EmptyPlaylistWithSearch";
import ErrorMessage from "../../common/components/ErrorMessage";

const TrackListBox = styled("div")(({ theme }) => ({
  overflowY: "auto",
  height: "calc(100vh - 250px)",
  "&::-webkit-scrollbar": { display: "none" },
  [theme.breakpoints.down("sm")]: {
    maxHeight: "calc(100vh - 65px - 119px)",
  },
  //     "&::-webkit-scrollbar": {
  //     display: "none",
  //     msOverflowStyle: "none", // IE, Edge
  //     scrollbarWidth: "none", // Firefox
  //   },
}));

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>(); // 타입스크립트에서 useParams 사용할 때. 제네릭으로 타입 지정.
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!id) return <Navigate to="/" />;

  const {
    data: playlist,
    isLoading: isPlaylistLoading,
    error: PlaylistError,
  } = useGetPlaylist({ playlist_id: id });

  const {
    data: playlistItems,
    isLoading: isPlaylistItemsLoading,
    error: PlaylistItemsError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: id, limit: 10 });

  const tracks = playlistItems?.pages.flatMap((page) => page.items) ?? [];

  const { ref, inView } = useInView({
    root: document.querySelector("#track-list-box"),
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  if (isPlaylistLoading || isPlaylistItemsLoading)
    return <PulseLoader color="#1DB954" />;
  // if (PlaylistError)
  //   return <ErrorMessage errorMessage={PlaylistError.message} />;
  // if (PlaylistItemsError)
  //   return <ErrorMessage errorMessage={PlaylistItemsError.message} />;

  const error = PlaylistError || PlaylistItemsError;
  if (error) {
    const status = (error as any)?.error?.status || (error as any)?.status;
    if (status === 401 || !localStorage.getItem("access_token")) {
      return (
        <Box
          display="flex"
          alignItems="center"
          marginTop="100px"
          flexDirection="column"
        >
          <LockOutlinedIcon sx={{ fontSize: 48, mb: 2 }} />
          <Typography fontWeight={700}>
            You've been logged out. Please sign in again.
          </Typography>
        </Box>
      );
    }
    return (
      <ErrorMessage errorMessage="플레이리스트를 불러오는데 실패했습니다." />
    );
  }

  return (
    <Box>
      <PlaylistDetailHeader playlist={playlist} />
      {playlist?.tracks?.total === 0 ? (
        <EmptyPlaylistWithSearch />
      ) : (
        <TrackListBox id="track-list-box">
          <PlaylistDetailTable playlistItems={tracks} />
          <div ref={ref} style={{ minHeight: 50 }}>
            {isFetchingNextPage && <PulseLoader color="#1DB954" />}
          </div>
        </TrackListBox>
      )}
    </Box>
  );
};

export default PlaylistDetailPage;
