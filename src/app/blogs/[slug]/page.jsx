import React from 'react';
import NotFoundPage from '@/SmComponetns/NotFoundPage';
import BlogPost from '@/Components/BlogsLayoutComponents/BlogPost/BlogPost';
const fetchBlog_ = async (bid, isContentGeneration) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/get_blog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate", 
        Pragma: "no-cache", 
        Expires: "0",
      },
      body: JSON.stringify({
        BLOG_ID: bid,
        isContentGeneration: !!isContentGeneration 
      }),
    });
  

    if(response.ok == true){
      return await response.json();
    }else{
      return { isErr: true, msg: "Blog Not Found!", data: null };
    }
  } catch (error) {
    console.error("Failed to fetch blog:", error);
    return { isErr: true, msg: error.message, data: null };
  }
}




export async function generateMetadata({searchParams}){

  const SITENAME = "sellersuccess.in";
  const pageType = "Article";
  const bid_ = searchParams?.id;
  let blog_meta_obj = {
    title : "Not Found",
    description : "No Blog Post Found!"
  }
  try {
    const blogMeta_ = await fetchBlog_(bid_,false);
    if(blogMeta_.isErr == true){
      return blog_meta_obj;
    }
    
    blog_meta_obj = {
    title: blogMeta_?.data?.meta?.title,
    description: blogMeta_?.data?.meta?.description,
    keywords: blogMeta_?.data?.meta?.seo?.keywords,
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    canonical: blogMeta_?.data?.meta?.blog_url,
    author: blogMeta_?.data?.auther_details?.name,
    openGraph: {
      title: blogMeta_?.data?.meta?.title,
      description: blogMeta_?.data?.meta?.description,
      url: blogMeta_?.data?.meta?.blog_url,
      siteName: SITENAME,
      locale: 'en_US',
      type: pageType.toLocaleLowerCase(),
      image: blogMeta_?.data?.meta?.blog_Img?.url,
    },
    twitter: {
      card: 'summary_large_image',
      site: SITENAME,
      title: blogMeta_?.data?.meta?.title,
      description: blogMeta_?.data?.meta?.description,
      image: blogMeta_?.data?.meta?.blog_Img?.url,
    }
  };
  return blog_meta_obj;
  } catch (error) {
    return blog_meta_obj;
  }
}



const BlogPage = async ({searchParams }) => {
  const bid_ = searchParams?.id;
  let blogData = { isErr: true, msg: 'No data', data: null };

  try {
    blogData = await fetchBlog_(bid_, true);
  } catch (error) {
    
  }


  return (
    <>
    {(blogData.isErr == true) ?
    <NotFoundPage/>
    :  
      <BlogPost BLOG={blogData}/>
    }
    </>
  );
}

export default BlogPage;
