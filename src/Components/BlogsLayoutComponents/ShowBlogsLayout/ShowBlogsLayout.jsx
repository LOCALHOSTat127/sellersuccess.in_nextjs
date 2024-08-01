import "./style.scss";
import BlogCards from "@/Components/BlogCards/BlogCards";

import NewsFlash from "../NewsFlash/NewsFlash";
const ShowBlogsLayout = ({ featuredBlogPosts }) => {
  return (
    <div className="blgos_shocase_layout">
      <NewsFlash />
      <div className="featured_blog_posts_display">
        <div className="section_heading">
          <p className="tag_heading"> FEATURED BLOG POSTS</p>
          <p className="desctiption">
            Your Guide to Tax Compliance: Insights, Updates, and Best Practices
          </p>
        </div>
        <BlogCards cards_={featuredBlogPosts} pre_fix={"featured_blogs"} />
      </div>
    </div>
  );
};

export default ShowBlogsLayout;
