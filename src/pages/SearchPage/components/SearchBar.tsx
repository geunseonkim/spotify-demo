import { TextField, InputAdornment } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  return (
    <div>
      <TextField
        // value={keyword}
        // onChange={handleSearchByKeyword}
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
