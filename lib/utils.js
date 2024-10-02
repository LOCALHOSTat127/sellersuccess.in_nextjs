import { createSlug } from "./commons";

export const emailHandler = async (config) => {
  const { e_type, file, c_details } = config;
  const { send_to } = c_details || "";


  const contactData = {
    send_to,
    c_details: {
      name: c_details.name || "N/A",
      email: c_details.email || send_to,
      phone: c_details.phone || "N/A",
    },
  };

  try {
    if (e_type === "NEWCB") {
      const response = await fetch("/api/new_cb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          send_to,
          customer_details: {
            name: contactData.c_details.name,
            email: contactData.c_details.email,
            phone: contactData.c_details.phone,
          },
        }),
      });

      return await response.json();
    }

    if (e_type === "DOCREQ") {
      const response = await fetch("/api/send_doc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          send_to,
          customer_details: {
            name: contactData.c_details.name,
            email: contactData.c_details.email,
            phone: contactData.c_details.phone,
          },
          file: {
            name: file.name,
            ID: file.fID,
          },
        }),
      });

      return await response.json();
    }
  } catch (error) {
    console.error("Error handling email:", error);
    throw new Error("Error handling email");
  }
};



export const generateBlogsCards = async (raw_cards) => {
  // Cards Schema
  const CARDS = [];

  // Mapping out cards...
  raw_cards.forEach((blog, index) => {
    const blog_card = {
      index: index,
      id: blog?.id || "",
      title: blog?.properties?.Name?.title?.[0]?.plain_text || "Untitled",
      date: blog?.properties?.Date?.date?.start || "",
      description: blog?.properties?.Description?.rich_text?.[0]?.plain_text || "",
      category: blog?.properties?.Category?.rich_text?.[0]?.plain_text || "Uncategorized",
      img: {
        name: blog?.properties?.Name?.title?.[0]?.plain_text,
        url: "",
      },
      seo: {
        slug: createSlug(blog?.properties?.Name?.title?.[0]?.plain_text || "untitled"),
        keywords: blog?.properties?.Keywords?.rich_text?.map(
          kword => kword?.plain_text || ""
        ) || [],
      },
      auther: {
        auther_id: blog?.created_by?.id || "",
        name: "",
        profile: "",
        email: "",
      },
    };
    
    const imageProperty = blog?.properties?.Image;;

    if (imageProperty) {
      if (imageProperty.type === "files") {
        blog_card.img.url = imageProperty.files?.[0]?.file?.url || "/assets/Images/blog_fb.jpg";

      } else if (imageProperty.type === "external") {
        blog_card.img.url = imageProperty.external?.url || "/assets/Images/blog_fb.jpg";
  
      }
    }else{
      blog_card.img.url =  "/assets/Images/blog_fb.jpg";
    }

  

    CARDS.push(blog_card);
  });



 
  const authers = await Promise.all(
    CARDS.map(async (blog, index) => {
      try {
        const response = await fetch("https://sellersuccess-in-nextjs.vercel.app/api/blogs/auther", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ UID: blog.auther.auther_id }),
        });
        const authorDetails = await response.json();
        return authorDetails;
      } catch (error) {
        console.error(`Error fetching author details for UID ${blog.auther.auther_id}:`, error);
        return null; // Handle errors gracefully
      }
    })
  );


  const final_cards = CARDS.map((blog, index) => {
    const author = authers[index];
    return {
      ...blog,
      auther: author ? {
        auther_id: blog.auther.auther_id,
        name: author.data.name || "",
        profile: author.data.avatar_url || "",
        email: author.data.person.email || "",
      } : blog.auther,
    };
  });

  return final_cards;
};
