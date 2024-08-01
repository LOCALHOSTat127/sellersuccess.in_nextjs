import SearchBlogLayout from "@/Components/BlogsLayoutComponents/SearchBlogLayout/SearchBlogLayout";
import ContainerMaseter from "@/Components/BlogsLayoutComponents/ContainerMaseter";

const fetchFeaturedBlogs = async () => {
  let featuredBlogs = null;
  try {
    const response = await fetch(
      "http://192.168.1.14:3000/api/blogs/recent_blogs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate", 
          Pragma: "no-cache", 
          Expires: "0",
        },
        body: JSON.stringify({ limit: 6 }),
      }
    );
    const res_ = await response.json();

    featuredBlogs = res_?.data;
  } catch (error) {
    console.log("Error While Fetching Featured Blog Posts!");
  }

  return featuredBlogs;
};

const BlogsLayout = async () => {
  const featuredBlogPosts = await fetchFeaturedBlogs();
  return (
    <div className="blogs_page_master_layout">
      <SearchBlogLayout />
      <ContainerMaseter
        featuredBlogPosts={featuredBlogPosts && featuredBlogPosts}
      />
    </div>
  );
};

export default BlogsLayout;
