"use client"

import React from 'react'
import { useSelector } from 'react-redux'
import ShowBlogsLayout from './ShowBlogsLayout/ShowBlogsLayout'
import SearchedResultsLayout from './SearchedResultsLayout/SearchedResultsLayout'
const ContainerMaseter = ({featuredBlogPosts}) => {
    const isBlogsResultsShown = useSelector((state) => state.config.isBlogSearchResultsShown);

  return (
    <div className='blogs_page_container_master'>
        
        {
            isBlogsResultsShown === true ? 
            <SearchedResultsLayout/>:
            <ShowBlogsLayout featuredBlogPosts={featuredBlogPosts} />
        }
    </div>
  )
}

export default ContainerMaseter