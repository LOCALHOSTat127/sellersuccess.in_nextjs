"use client"
import {useEffect} from "react";
import "./style.scss";
import { useSelector } from "react-redux";
import { Search } from "@mui/icons-material";
import { Mic } from "@mui/icons-material";
import { Clear } from "@mui/icons-material";
import CircleLoading from "../CircleLoading";
const SearchBar = ({
  onSearchChange,
  handleSeachClick,
  handleClearSearch,
  SEARCH_VAL,
  isClear,
  isFetching,
 
}) => {

  const isBlogSearchResultsShown = useSelector((state) => state.config.isBlogSearchResultsShown);
  return (
    <div 
    className="input-container">
      <input
        disabled={isFetching === true ? true : false}
        value={SEARCH_VAL}
        autoFocus={isFetching === false ? true : false}
        onChange={onSearchChange}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            handleSeachClick();
          }
        }}
        type="text"
        name="text"
        className="input"
        id="input"
        placeholder="Search"
      />
      <div className="controls">
        <button
          disabled={isFetching === true ? true : false}
          onClick={handleSeachClick}
          onKeyDown={handleSeachClick}
          className="searchBtn"
        >
          <Search className="search_icon ico" />
        </button>
        <div className="border"></div>
        <button className="mic-button">
          {
          isFetching === true  ? 
          <CircleLoading size_={20} /> :
          isClear === true || isBlogSearchResultsShown == true ? (
            <Clear onClick={handleClearSearch} className="clear_ico" />
          ) : (
            <Mic className="mic_icon ico" />
          )}
       
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
