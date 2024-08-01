import { fetchBlogsById, fetchUserDetailsByID, fetchBlockChildren } from "../../../lib/notion";
import { createSlug } from "../../../lib/commons";

export default async function handler(req, res) {
  // Initial blog structure
  const blog_ = {
    meta: null,
    content: null,
    auther_details: null
  };

  if (req.method !== 'POST') {
    return res.status(405).json({ msg: 'Method Not Allowed' });
  }

  const { BLOG_ID, isContentGeneration } = req.body;
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers['host'];
 
  try {
    const response = await fetchBlogsById(BLOG_ID);
    console.log(response?.properties?.Date);
    if (response) {
      blog_.meta = {
        blog_id: response?.id || "Not Found",
        title: response?.properties?.Name?.title?.[0]?.plain_text || "Not Found",
        description: response?.properties?.Description?.rich_text?.[0]?.plain_text || "Page Not Found!",
        date: response?.properties?.Date?.date?.start || "",
        seo: {
          keywords: response?.properties?.Keywords?.rich_text?.map(kword => kword.plain_text) || [],
        },
        blog_category: response?.properties?.Category?.rich_text?.[0]?.plain_text || "Not Found",
        blog_url: `${protocol}://${host}/${createSlug(response?.properties?.Name?.title?.[0]?.plain_text || "untitled")}?id=${response?.id || ""}` || "",
        blog_Img: {
          name: response?.properties?.Name?.title?.[0]?.plain_text,
          url: "",
        }
      };

      // Handle Image property safely
      const imageProperty = response?.properties?.Image;
      if (imageProperty) {
        if (imageProperty.type === "files" && imageProperty.files?.[0]) {
          blog_.meta.blog_Img.url = imageProperty.files[0]?.file?.url || "/assets/Images/blog_fb.jpg";
        } else if (imageProperty.type === "external") {
          blog_.meta.blog_Img.url = imageProperty.external?.url || "/assets/Images/blog_fb.jpg";
        }
      }

      // Fetching author details
      if (response?.created_by?.id) {
        blog_.auther_details = await fetchUserDetailsByID(response.created_by.id);
      }

      // Fetching Blog Content
      if (isContentGeneration === true && blog_.meta?.blog_id) {
        blog_.content = await fetchBlockChildren(blog_.meta.blog_id);
      }

      return res.status(200).json({
        isErr: false,
        msg: "",
        data: blog_
      });
    } else {
      return res.status(404).json({
        isErr: true,
        msg: "Blog not found",
        data: null
      });
    }
  } catch (error) {
    return res.status(500).json({
      isErr: true,
      msg: `Internal Server Error: ${error.message}`,
      data: null
    });
  }
}
