import React from "react";
import { Navigate, useParams } from "react-router";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import PlaylistDetailHeader from "./components/PlaylistDetailHeader";

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>(); // 타입스크립트에서 useParams 사용할 때. 제네릭으로 타입 지정.
  if (id === undefined) return <Navigate to="/" />;
  const { data: playlist } = useGetPlaylist({ playlist_id: id });

  return (
    <div>
      <PlaylistDetailHeader playlist={playlist} />
    </div>
  );
};

export default PlaylistDetailPage;
