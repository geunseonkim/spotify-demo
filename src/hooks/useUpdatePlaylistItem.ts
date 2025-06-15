import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdatePlaylistRequest } from "../models/playlist";
import useGetPlaylist from "./useGetPlaylist";
import { updatePlaylist } from "../apis/playlistApi";

interface UseUpdatePlaylistItemProps {
  playlist_id: string | undefined;
}

const useUpdatePlaylistItem = ({ playlist_id }: UseUpdatePlaylistItemProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: UpdatePlaylistRequest) => {
      if (!playlist_id) {
        return Promise.reject(new Error("playlist is undefined"));
      }
      return updatePlaylist(playlist_id, params);
    },
    onSuccess: () => {
      // console.log("성공");
      // 해당 플레이리스트 관련 쿼리 무효화 → 자동 refetch.
      queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] });
      queryClient.invalidateQueries({ queryKey: ["playlist-items"] });
      queryClient.invalidateQueries({ queryKey: ["playlist-detail"] });
    },
  });
};

export default useUpdatePlaylistItem;
