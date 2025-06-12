import { useInfiniteQuery } from "@tanstack/react-query";
import { GetPlaylistItemsRequest } from "../models/playlist";
import { getPlaylistItems } from "../apis/playlistApi";
import { TrySharp } from "@mui/icons-material";

const useGetPlaylistItems = (params: GetPlaylistItemsRequest) => {
  return useInfiniteQuery({
    queryKey: ["playlist-items", params],
    queryFn: ({ pageParam }) => {
      return getPlaylistItems({ offset: pageParam, ...params });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        try {
          const url = new URL(lastPage.next);
          const nextOffset = url.searchParams.get("offset");
          return nextOffset ? parseInt(nextOffset) : undefined;
        } catch (error) {
          console.error("Invalid URL in getNextPageParam:", lastPage.next);
          return undefined;
        }
      }
      return undefined;
    },
  });
};

export default useGetPlaylistItems;
