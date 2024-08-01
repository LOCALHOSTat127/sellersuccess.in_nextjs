"use client"
import {useState} from 'react'
import { useDispatch } from 'react-redux';
import {setBlogResults,setBlogsSearchResultsShow} from "../../../store/configSlice";
import SearchBar from '@/SmComponetns/SearchBar/SearchBar';
import "./style.scss";


const SearchBlogLayout = () => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [clearTrue, setClearTrue] = useState(false);
  const [isFetching, setFetching] = useState(false);


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length <= 0) {
      setClearTrue(false);
    } else {
      setClearTrue(true);
    }
  };


  const fetchBlogsOnClick = async () =>{
    if(searchQuery.length <= 0 || !searchQuery || searchQuery == null){
      return 0;
    }
    dispatch(setBlogResults(null));
    dispatch(setBlogsSearchResultsShow(true));
    setFetching(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sQuery: searchQuery }),
      });
      const res_ = await response.json();
   
      if(res_.isErr == true || response.ok === false){
        dispatch(setBlogResults(null));
        setFetching(false);
      }else{
        dispatch(setBlogResults(res_?.data));
        setFetching(false);
      }
    } catch (error) {
        setFetching(false);
        dispatch(setBlogResults(null));
    }
  }


  const handleClearSearch = () => {
    setSearchQuery("");
    setClearTrue(false);
    dispatch(setBlogsSearchResultsShow(false));
  };

 

  return (
    <div className='blog_searchbar_container'>
      <div className="bsbc_wrapper">
      <SearchBar
              isClear={clearTrue}
              SEARCH_VAL={searchQuery}
              onSearchChange={handleSearchChange}
              handleSeachClick={fetchBlogsOnClick}
              handleClearSearch={handleClearSearch}
              isFetching={isFetching}
      />
      </div>
    </div>
  )
}

export default SearchBlogLayout