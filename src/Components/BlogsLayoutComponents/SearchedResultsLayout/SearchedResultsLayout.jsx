"use client"
import React from 'react'
import "./style.scss";
import { useSelector } from 'react-redux';
import BlogCards from '@/Components/BlogCards/BlogCards';
import BlogCardsSkletonLoading from '@/Components/BlogCards/BlogCardsSkletonLoading';
import NotFound from '@/SmComponetns/NotFound';

const SearchedResultsLayout = () => {
  const isBlogs_ = useSelector((state) => state.config.isSearchBlogsResults);

  return (
    <div>
      {isBlogs_ === null ?
      <BlogCardsSkletonLoading/>:
      isBlogs_.length > 0 ?
      <BlogCards cards_={isBlogs_} pre_fix={"blog_searched_results"} /> :
      <NotFound/>
    }
    </div>
  )
}

export default SearchedResultsLayout