import React from "react";
import "./style.scss";
import BlogCards from "../BlogCards/BlogCards";

const RecentBlogs = ({ cards_ }) => {
  return (
    <>
      {cards_ && (
        <div className="featured_blogs_home">
          <div className="section_heading">
            <p className="tag_heading"> FEATURED BLOG POSTS</p>
            <p className="desctiption">
              Your Guide to Tax Compliance: Insights, Updates, and Best
              Practices
            </p>
          </div>
          {cards_ && <BlogCards cards_={cards_} />}
        </div>
      )}
    </>
  );
};

export default RecentBlogs;
