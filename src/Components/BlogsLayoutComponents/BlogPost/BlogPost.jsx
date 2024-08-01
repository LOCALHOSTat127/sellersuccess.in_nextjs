/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import "./style.scss";
import { notion } from "../../../../lib/notion";
import Image from 'next/image';
import { NotionRenderer } from "@notion-render/client";
import hljsPlugin from "@notion-render/hljs-plugin";
import bookmarkPlugin from "@notion-render/bookmark-plugin";
import { formatDate } from "../../../../lib/commons";


const BlogPost = async ({ BLOG }) => {
  const renderer = new NotionRenderer({
    client: notion,
  });
  renderer.use(hljsPlugin({}));
  renderer.use(bookmarkPlugin(undefined));
 
  // Check if BLOG and BLOG.content are defined
  const htmlContent = BLOG?.data?.content
    ? await renderer.render(...BLOG?.data?.content)
    : "";

   

  const processedHtmlContent = htmlContent.replace(
    /<img/g,
    '<img class="rounded-xl"'
  );
  
  return (
    <>
      <div className="blog_post_">
        <div className="blog_posts_wrapper">
          <div className="blog_post__container prose">
            <div className="blog_meta">
              <h1 className="blog_title">{BLOG?.data?.meta?.title}</h1>
              <h2 className="blog_description">
                {BLOG?.data?.meta?.description}
              </h2>
              <div className="about_info">
                <div className="auther item">
                  <div className="auther_profile">
                    <Image
                      width={50} height={50}
                    className="icon"
                      src={BLOG?.data?.auther_details?.avatar_url}
                      alt={BLOG?.data?.auther_details?.name}
                    />
                  </div>
                  <p className="auther_name meta_p">
                    {BLOG?.data?.auther_details?.name}
                  </p>
                </div>
                <div className="publishing item">
              
                  <p className="publiched_on meta_p">{formatDate(BLOG?.data?.meta?.date)}</p>
                </div>
              </div>

              <Image
              width={500} height={500}
                id="blog_Image"
                loading="eager"
                src={BLOG?.data?.meta?.blog_Img?.url}
                alt={BLOG?.data?.meta?.blog_Img?.name}
                srcSet="/assets/Images/blog_fb.jpg"
              />
            </div>
            <div
              className="blog_html"
              dangerouslySetInnerHTML={{ __html: processedHtmlContent }}
            />
          </div>
        
        </div>
      </div>
    </>
  );
};

export default BlogPost;
