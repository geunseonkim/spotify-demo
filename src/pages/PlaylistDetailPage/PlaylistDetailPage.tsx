import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import PlaylistDetailHeader from "./components/PlaylistDetailHeader";
import { PulseLoader } from "react-spinners";
import ErrorMessage from "../../common/components/ErrorMessage";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import { styled, Typography } from "@mui/material";
import PlaylistDetailTable from "./components/PlaylistDetailTable";
import { useInView } from "react-intersection-observer";

const TrackListBox = styled("div")(({ theme }) => ({
  overflowY: "auto",
  height: "calc(100vh - 250px)", // 헤더 높이만큼 빼줌
  "&::-webkit-scrollbar": {
    display: "none",
    msOverflowStyle: "none", // IE, Edge
    scrollbarWidth: "none", // Firefox
  },
  scrollbarWidth: "none",
  [theme.breakpoints.down("sm")]: {
    maxHeight: "calc(100vh - 65px - 119px)",
  },
}));

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>(); // 타입스크립트에서 useParams 사용할 때. 제네릭으로 타입 지정.
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

  const tracks = playlistItems?.pages.flatMap((page) => page.items) ?? []; // 모든 페이지에서 items 배열들을 꺼내 하나로 flat하게 합쳐 tracks 배열을 만듦!

  const { ref, inView } = useInView({
    root: document.querySelector("#track-list-box"),
    rootMargin: "0px",
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  if (isPlaylistLoading || isPlaylistItemsLoading) return <PulseLoader />;
  if (PlaylistError)
    return <ErrorMessage errorMessage={PlaylistError.message} />;
  if (PlaylistItemsError)
    return <ErrorMessage errorMessage={PlaylistItemsError.message} />;
  return (
    <div>
      <PlaylistDetailHeader playlist={playlist} />
      {playlist?.tracks?.total === 0 ? (
        <Typography>Search Bar</Typography>
      ) : (
        <TrackListBox id="track-list-box">
          <PlaylistDetailTable playlistItems={tracks} />
          <div ref={ref} style={{ minHeight: "50px" }}>
            {isFetchingNextPage && <PulseLoader />}
          </div>
        </TrackListBox>
      )}
    </div>
  );
};

export default PlaylistDetailPage;
