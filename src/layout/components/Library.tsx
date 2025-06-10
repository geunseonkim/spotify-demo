import React, { useEffect } from "react";
import EmptyPlaylist from "./EmptyPlaylist";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import { PulseLoader } from "react-spinners";
import ErrorMessage from "../../common/components/ErrorMessage";
import { styled } from "@mui/material";
import Playlist from "./Playlist";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { useInView } from "react-intersection-observer";

const PlaylistBox = styled("div")(({ theme }) => ({
  overflowY: "auto",
  maxHeight: "calc(100vh - 250px)",
  height: "100%",
  "&::-webkit-scrollbar": {
    display: "none",
    msOverflowStyle: "none", // IE, Edge
    scrollbarWidth: "none", // Firefox
  },
  [theme.breakpoints.down("sm")]: {
    maxHeight: "calc(100vh - 65px - 119px)",
  },
}));

const Library = () => {
  const { ref, inView } = useInView();
  const {
    data,
    error,
    isLoading,
    hasNextPage, // 다음 페이지가 있어?
    isFetchingNextPage, // 다음 페이지 부르는 중이야?
    fetchNextPage, // 다음 페이지 불러줘.
  } = useGetCurrentUserPlaylists({
    limit: 10,
    offset: 0,
  });
  // console.log("playlist", data);

  const { data: user } = useGetCurrentUserProfile();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  if (!user) return <EmptyPlaylist />;
  if (isLoading) return <PulseLoader />;
  if (error) return <ErrorMessage errorMessage={error.message} />;
  return (
    <div>
      {!data || data?.pages[0].total === 0 ? (
        <EmptyPlaylist />
      ) : (
        <PlaylistBox id="playlist-scroll-container">
          {data?.pages.map((page, index) => (
            <Playlist playlists={page.items} key={index} />
          ))}
          <div ref={ref} style={{ minHeight: "50px" }}>
            {isFetchingNextPage && <PulseLoader />}
          </div>
        </PlaylistBox>
      )}
    </div>
  );
};

export default Library;
