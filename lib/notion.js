import "server-only";
import { Client } from "@notionhq/client";

export const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_SECRET,
});




// fetch blogs with count limit
export async function fetchRecentBlogs(limit) {
  if (isNaN(limit)) {
    throw new Error("Must be a valid number!");
  }
  if (limit > 15) {
    throw new Error("Limit is less then 15 blogs!");
  }
  try {
    const response = await notion.databases.query({
      database_id: process.env.NEXT_PUBLIC_NOTION_DB,
      filter: {
        and: [
          {
            property: "status",
            select: {
              equals: "Live",
            },
          },
        ],
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
      page_size: limit,
    });
  
    return response.results;
  } catch (error) {
    throw  error;
  }
}



// Fetch Blogs By ID
export async function fetchBlogsById(BLOG_ID) {
    if(!BLOG_ID){
        throw new Error("Blog ID's must be valid Blog ID's!");
    }

  try {
    const response = await notion.pages.retrieve({
        page_id: BLOG_ID,
    });
    
    return response;
  } catch (error) {
    throw error;
  }
}


export async function fetchDatabaseSchema() {
  try {
    const response = await notion.databases.retrieve({
      database_id: process.env.NEXT_PUBLIC_NOTION_DB,
    });
    console.log(JSON.stringify(response, null, 2)); // Pretty-print the schema
  } catch (error) {
    console.error(error);
  }
}



// Fetch Blogs By Search Text
// export async function fetchBySearchTextMatchID(query) {
//   if(!query || query === ""){
//     throw new Error("Search Is Empty!");
//   } 
//    const query_s = query.split(" ");
//    const q_res = [];

//    try {
//     const response = await notion.databases.query({
//       database_id: process.env.NEXT_PUBLIC_NOTION_DB,
//       filter: {
//         property: 'Name', // Use the property name 'Name' for the blog title
//         title: {
//           contains: query
//         }
//       },
//       sorts: [
//         {
//           property: 'Date',
//           direction: 'descending',
//         },
//       ],
//       page_size: 100,
//     });

//     return response;
//   } catch (error) {
//     throw error;
//   }
//   }


export async function fetchBySearchTextMatchID(query) {
  if (!query || query.trim() === "") {
    throw new Error("Search query is empty!");
  }

  const queryTerms = query.split(" ");
  const uniqueResults = new Map(); // Map to keep track of unique blog IDs

  for (const term of queryTerms) {
    try {
      const response = await notion.databases.query({
        database_id: process.env.NEXT_PUBLIC_NOTION_DB,
        filter: {
          and: [
            {
              property: 'Name',
              title: {
                contains: term,
              },
            },
            {
              property: "status",
              select: {
                equals: "Live",
              },
            },
          ],
        },
        sorts: [
          {
            property: 'Date',
            direction: 'descending',
          },
        ],
        page_size: 10,
      });

      for (const result of response.results) {
        const blogId = result.id;
        if (!uniqueResults.has(blogId)) {
          uniqueResults.set(blogId, result);
        }
      }
      
    } catch (error) {
      console.error(`Error searching for term "${term}":`, error);
    }
  }

  // Convert the unique results from the Map to an array
  const finalResults = Array.from(uniqueResults.values());


  return finalResults;
}




// FetchUserDetailsByUID
export async function fetchUserDetailsByID(userID) {
    if(!userID || userID === ""){
        throw new Error("User ID is not valid!");
    }
    try {
     const response = await notion.users.retrieve({
       user_id: userID,
     });
   
     return response;
    } catch (error) {
       throw error;
    }
   }




// Fetch children of a block
export async function fetchBlockChildren(block_id) {
  if(!block_id){
    throw new Error("Invalid Blog ID");
  }
    try {
      const response = await notion.blocks.children.list({
        block_id: block_id,
      });
  
      return response.results;
    } catch (error) {
      throw error;
    }
  }




  
  export async function fetchBlogsByTopic(topic){
    const pageSize = 6;
    const trimmedTopic = topic.trim().toUpperCase();
    console.log(trimmedTopic);
    try {
      const response = await notion.databases.query({
        database_id: process.env.NEXT_PUBLIC_NOTION_DB,
        filter: {
          property: "topic",
          select: {
            equals: trimmedTopic,
          },
        },
        page_size: pageSize,
      });
      return response.results;
    } catch (error) {
      console.error("Error fetching blogs: ", error.message);
      throw error;
    }
  };