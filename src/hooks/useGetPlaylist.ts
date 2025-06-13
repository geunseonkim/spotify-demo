import { useQuery } from "@tanstack/react-query";
import { GetPlaylistRequest } from "../models/playlist";
import { getPlaylist } from "../apis/playlistApi";

const useGetPlaylist = (params: GetPlaylistRequest) => {
  return useQuery({
    queryKey: ["playlist-detail", params.playlist_id],
    queryFn: () => getPlaylist(params),
    retry: false,
  });
};

export default useGetPlaylist;
