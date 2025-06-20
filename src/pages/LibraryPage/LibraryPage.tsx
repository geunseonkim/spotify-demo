import { Box, useTheme, useMediaQuery } from "@mui/material";
import LibraryHead from "../../layout/components/LibraryHead";
import Library from "../../layout/components/Library";

const LibraryPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!isMobile) return null;

  return (
    <Box sx={{ padding: 2 }}>
      <LibraryHead />
      <Library />
    </Box>
  );
};

export default LibraryPage;
