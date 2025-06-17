import React from "react";
import { Box, Card, CardContent, styled, Typography } from "@mui/material";
import useGetBrowseCategories from "../../hooks/useGetBrowseCategories";
import { PulseLoader } from "react-spinners";
import ErrorMessage from "../../common/components/ErrorMessage";

const getRandomColor = () => {
  const colors = [
    "#FF8A80",
    "#81C784",
    "#9575CD",
    "#64B5F6",
    "#F06292",
    "#4DD0E1",
    "#FFD54F",
    "#A1887F",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const CategoryCardContent = styled(CardContent)({
  position: "relative",
  zIndex: 2,
});

const TiltedImage = styled("img")({
  position: "absolute",
  height: 140,
  width: 140,
  top: "65%",
  right: -25,
  transform: "translateY(-50%) rotate(25deg)",
  borderRadius: 4,
});

const SearchPage = () => {
  const { data, isLoading, error } = useGetBrowseCategories();
  if (isLoading) return <PulseLoader color="#1DB954" />;
  if (error) return <ErrorMessage errorMessage={error.message} />;

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
      <Typography variant="h1" fontWeight={800} mt={3} mb={2}>
        Browse all
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          height: "80vh",
          overflowY: "auto",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {data?.categories?.items.map((item, index) => {
          const bgColor = getRandomColor();
          const imageUrl = item.icons[0]?.url;

          return (
            <Box
              key={index}
              sx={{
                flex: {
                  xs: "0 0 100%",
                  sm: "0 0 50%",
                  md: "0 0 33.33%",
                },
                boxSizing: "border-box",
                p: 1,
              }}
            >
              <Card
                sx={{
                  backgroundColor: bgColor,
                  height: 200,
                  width: "100%",
                  position: "relative",
                  color: "#fff",
                  borderRadius: 1,
                  overflow: "hidden",
                }}
              >
                <CategoryCardContent>
                  <Typography variant="h6" fontWeight={700}>
                    {item.name}
                  </Typography>
                </CategoryCardContent>

                {imageUrl && <TiltedImage src={imageUrl} alt={item.name} />}
              </Card>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default SearchPage;
