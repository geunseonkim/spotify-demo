import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlaylist } from "../apis/playlistApi";
import useGetCurrentUserProfile from "./useGetCurrentUserProfile";
import { CreatePlaylistRequest } from "../models/playlist";

const useCreatePlaylist = () => {
  const queryClient = useQueryClient();
  const { data: user } = useGetCurrentUserProfile();
  return useMutation({
    mutationFn: (params: CreatePlaylistRequest) => {
      if (!user?.id) {
        return Promise.reject(new Error("user is undefined"));
      }
      return createPlaylist(user.id, params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] });
      console.log("성공");
    },
  });
};

export default useCreatePlaylist;
