import React, { useState } from "react";
import { SimplifiedPlaylist } from "../../models/playlist";
import PlaylistItem from "../../common/components/PlaylistItem";
import { useNavigate } from "react-router";

interface PlaylistProps {
  playlists: SimplifiedPlaylist[];
}
const Playlist = ({ playlists }: PlaylistProps) => {
  const [selectedList, setSelectedList] = useState<string>(""); // 어떤 플레이리스트를 클릭했어?
  const navigate = useNavigate();
  const handlePlaylistClick = (id: string) => {
    setSelectedList(id);
    navigate(`/playlist/${id}`); // 선택한 플레이리스트(id)로 이동.
  };
  return (
    <div>
      {playlists.map((item) => (
        <PlaylistItem
          key={item.id}
          name={item.name || ""}
          image={(item.images && item.images[0]?.url) || null} //item?.images[0]?.url 이렇게만 적어주면 'null is not an object (evaluating 'item.images[0]')' 에러 발생.
          id={item.id || ""}
          artistName={"Playlist • " + item.owner?.display_name}
          handleClick={handlePlaylistClick}
          selected={selectedList === item.id}
        />
      ))}
    </div>
  );
};

export default Playlist;
