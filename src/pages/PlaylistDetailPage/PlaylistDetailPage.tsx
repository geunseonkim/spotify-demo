import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import PlaylistDetailHeader from "./components/PlaylistDetailHeader";
import { PulseLoader } from "react-spinners";
import ErrorMessage from "../../common/components/ErrorMessage";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import { Box, styled, Typography } from "@mui/material";
import PlaylistDetailTable from "./components/PlaylistDetailTable";
import { useInView } from "react-intersection-observer";
import LoginButton from "../../common/components/LoginButton";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmptyPlaylistWithSearch from "./components/EmptyPlaylistWithSearch";

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

  if (isPlaylistLoading || isPlaylistItemsLoading)
    return <PulseLoader color="#1DB954" />;
  // if (PlaylistError)
  //   return <ErrorMessage errorMessage={PlaylistError.message} />;
  // if (PlaylistItemsError)
  //   return <ErrorMessage errorMessage={PlaylistItemsError.message} />;

  const error = PlaylistError || PlaylistItemsError;
  if (error) {
    const status = (error as any)?.error?.status || (error as any)?.status; // error 객체가 어떤 구조일지 모르니 넓게 커버

    if (status === 401 || !localStorage.getItem("access_token")) {
      return (
        <Box
          display="flex"
          alignItems="center"
          // justifyContent="center"
          marginTop="100px"
          height="100%"
          flexDirection="column"
        >
          <LockOutlinedIcon
            color="primary"
            sx={{ fontSize: "48px", marginBottom: "15px" }}
          />
          <Typography variant="h6" fontWeight={700}>
            You've been logged out. Please sign in again.
          </Typography>
          <Typography variant="h6" fontWeight={700} mb={2}>
            Please sign in again.
          </Typography>
          {/* <LoginButton /> */}
        </Box>
      );
    }

    return (
      <ErrorMessage errorMessage="플레이리스트를 불러오는 데 실패했습니다." />
    );
  }
  return (
    <div>
      <PlaylistDetailHeader playlist={playlist} />
      {playlist?.tracks?.total === 0 ? (
        <EmptyPlaylistWithSearch />
      ) : (
        <TrackListBox id="track-list-box">
          <PlaylistDetailTable playlistItems={tracks} />
          <div ref={ref} style={{ minHeight: "50px" }}>
            {isFetchingNextPage && <PulseLoader color="#1DB954" />}
          </div>
        </TrackListBox>
      )}
    </div>
  );
};

export default PlaylistDetailPage;
