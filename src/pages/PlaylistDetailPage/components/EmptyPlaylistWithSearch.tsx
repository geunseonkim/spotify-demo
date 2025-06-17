import React, { useState, useRef } from "react";
import { InputAdornment, TextField, Typography } from "@mui/material";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import SearchResultList from "./SearchResultList";
import { PulseLoader } from "react-spinners";
import ErrorMessage from "../../../common/components/ErrorMessage";
import styled from "@emotion/styled";

const SearchContainer = styled("div")({
  height: "400px",
  overflowY: "auto",
  //   border: "1px solid #ccc",
  marginTop: "20px",
  padding: "12px",
});

const EmptyPlaylistWithSearch = () => {
  const [keyword, setKeyword] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);

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

  // console.log("search-data", data);

  const tracks = data?.pages.flatMap((page) => page.tracks?.items ?? []) ?? [];
  const hasResults = tracks.length > 0;

  // console.log("search-tracks", tracks);

  const handleSearchByKeyword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setKeyword(event.target.value);
  };

  if (error) return <ErrorMessage errorMessage={error.message} />;

  return (
    <div>
      <Typography variant="h1" my="10px">
        Your next obsession is ONE search away
      </Typography>
      <TextField
        value={keyword}
        onChange={handleSearchByKeyword}
        placeholder=" ...... yet"
        sx={{ width: "300px" }}
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
          <Typography variant="body1" color="text.secondary">
            No results found for "{keyword}"
          </Typography>
        )}
      </SearchContainer>
    </div>
  );
};

export default EmptyPlaylistWithSearch;
