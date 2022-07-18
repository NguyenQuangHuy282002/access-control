import React from "react";
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";

Search.propTypes = {};

function Search(props) {
  return (
    <div className="pointer mr-10" style={{ display: "inline-block" }}>
      <SearchIcon />
    </div>
  );
}

export default Search;
