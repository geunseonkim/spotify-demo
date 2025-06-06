import { alpha, styled, Tooltip, Typography } from "@mui/material";
import React from "react";
import PlayButton from "./PlayButton";
import { Opacity } from "@mui/icons-material";

interface CardProps {
  name: string;
  image: string;
  artistName: string | undefined;
}

const CardContainer = styled("div")(({ theme }) => ({
  maxWidth: "165px",
  width: "100%",
  //   height: "100%",
  padding: "10px",
  margin: "15px 10px",
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.3),
    transform: "translate3d(0px, 0px, 0px)",
    transition: "opacity 0.3s ease-in-out",
  },
  "&:hover .overlay": {
    opacity: 1,
  },
}));

const CardImage = styled("img")({
  width: "100%",
  height: "auto",
  borderRadius: "5px",
});

const CardTypography = styled(Typography)(({ theme }) => ({
  width: "100%",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const Overlay = styled("div")({
  position: "absolute",
  bottom: "15px",
  right: "10px",
  opacity: "0",
  transform: "translate3d(0px, 0px, 0px)",
  transition: "opacity 0.3s ease-in-out",
});

const Card = ({ image, name, artistName }: CardProps) => {
  return (
    <CardContainer>
      <div style={{ position: "relative" }}>
        <CardImage src={image} />
        <Overlay className="overlay">
          <PlayButton />
        </Overlay>
      </div>

      <Tooltip title={name}>
        <CardTypography variant="body1" fontWeight={700}>
          {name || "no name"}
        </CardTypography>
      </Tooltip>
      <Typography variant="body2" color="text.secondary">
        {artistName || "no artist"}
      </Typography>
    </CardContainer>
  );
};

export default Card;
