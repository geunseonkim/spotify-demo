import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";

const PlayListItemBox = styled(ListItemButton)(({ theme, selected }) => ({
  padding: "9px 5px",
  alignItems: "center",
  backgroundColor: selected ? theme.palette.action.active : "",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));
const PlaylistImage = styled(Avatar)({
  width: "46px",
  height: "45px",
  borderRadius: "3px",
});
const PlaylistName = styled(Typography)(({ theme }) => ({
  fontWeight: "600",
  color: theme.palette.primary.main,
}));
interface PlaylistItemProps {
  image: string | null;
  name: string;
  artistName: string | null;
  id: string;
  handleClick: (id: string) => void;
  selected?: boolean;
}

const PlaylistItem = ({
  image,
  name,
  artistName,
  id,
  handleClick,
  selected,
}: PlaylistItemProps) => {
  return (
    <PlayListItemBox
      onClick={() => handleClick(id)}
      selected={selected || false}
    >
      <ListItemAvatar>
        <PlaylistImage
          src={
            image ||
            "https://i.pinimg.com/474x/b1/21/c5/b121c5f0fc61f5a27903d897cbbe160a.jpg?type=w800"
          }
          alt={name}
        />
      </ListItemAvatar>
      <ListItemText
        primary={<PlaylistName>{name}</PlaylistName>}
        secondary={
          <Typography variant="body2" color="text.secondary">
            {artistName}
          </Typography>
        }
      />
    </PlayListItemBox>
  );
};

export default PlaylistItem;
