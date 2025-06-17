import { TextField, InputAdornment, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router";

const SearchBar = () => {
  const [keyword, setKeyword] = useState<string>("");
  const navigate = useNavigate();

  const handleSearchByKeyword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setKeyword(event.target.value);
  };

  // const handleSubmit = () => {
  //   if (keyword.trim()) {
  //     navigate(`/search/${keyword}`);
  //   }
  // };

  useEffect(() => {
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    }
  }, [keyword, navigate]);

  return (
    <div>
      <TextField
        value={keyword}
        onChange={handleSearchByKeyword}
        // onKeyDown={(event) => {
        //   if (event.key === "Enter") {
        //     handleSubmit();
        //   }
        // }}
        placeholder=" what do you wanna play?"
        variant="outlined"
        sx={{
          width: 300,
          borderRadius: "25px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "25px", // input 안쪽도 둥글게
            paddingRight: 0,
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#999" }} />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchBar;
