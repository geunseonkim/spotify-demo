import React, { useState, useRef } from "react";
import {
  InputAdornment,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import SearchResultList from "./SearchResultList";
import { PulseLoader } from "react-spinners";
import ErrorMessage from "../../../common/components/ErrorMessage";
import styled from "@emotion/styled";

const SearchContainer = styled("div")({
  height: "400px",
  overflowY: "auto",
  marginTop: "20px",
  padding: "12px",
});

const EmptyPlaylistWithSearch = () => {
  const [keyword, setKeyword] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track],
  });

  const tracks = data?.pages.flatMap((page) => page.tracks?.items ?? []) ?? [];
  const hasResults = tracks.length > 0;

  const handleSearchByKeyword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setKeyword(event.target.value);
  };

  if (error) return <ErrorMessage errorMessage={error.message} />;

  return (
    <div>
      <Typography
        variant={isMobile ? "h6" : "h1"}
        my={isMobile ? "8px" : "10px"}
        fontWeight={700}
      >
        {isMobile ? "Find your vibe" : "Your next obsession is ONE search away"}
      </Typography>
      <TextField
        value={keyword}
        onChange={handleSearchByKeyword}
        placeholder={isMobile ? "search..." : " ...... yet"}
        sx={{
          width: {
            xs: "80vw",
            sm: "300px",
            md: "300px",
          },
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">🎧</InputAdornment>,
        }}
      />

      <SearchContainer ref={scrollRef}>
        {isLoading ? (
          <PulseLoader color="#1DB954" />
        ) : hasResults ? (
          <SearchResultList
            list={tracks}
            hasNextPage={!!hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            root={scrollRef.current}
            handleClick={function (list: string[]): void {
              throw new Error("Function not implemented.");
            }}
          />
        ) : keyword === "" ? (
          <></>
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            mt={isMobile ? 2 : 3}
          >
            No results found for "{keyword}"
          </Typography>
        )}
      </SearchContainer>
    </div>
  );
};

export default EmptyPlaylistWithSearch;
