import { fetchBlogsById } from "../../../lib/notion";

// external limits
const BLOGS_FETCH_LIMIT=30;


export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ msg: 'Method Not Allowed' });
    }
    


    const blogIds = req.body.BLOG_IDs || [];
    const validPages = [];
    const errors = [];
  
    // Validate input
    if (!Array.isArray(blogIds) || blogIds.length === 0) {
      return res.status(400).json({
        isErr: true,
        error: 'Invalid Blog IDs',
        data: null
      });
    }
  
    // Fetch blogs with a limit to avoid overwhelming the Notion DB
    for (let i = 0; i < blogIds.length && i < BLOGS_FETCH_LIMIT; i++) {
      try {
        const response = await fetchBlogsById(blogIds[i]);
        validPages.push(response);
      } catch (error) {
        console.error(`Error fetching blog with ID ${blogIds[i]}:`, error);
        errors.push({ id: blogIds[i], error: error.message });
      }
    }
  
    // If no valid pages were fetched and there were errors
    if (validPages.length === 0 && errors.length > 0) {
      return res.status(500).json({
        isErr: true,
        error: `Errors occurred for all provided IDs: ${JSON.stringify(errors)}`,
        data: null
      });
    }
  
    // Return valid pages and errors, if any
    return res.status(200).json({
      isErr: validPages.length === 0 && errors.length === 0,
      error: validPages.length === 0 ? 'No valid pages found' : null,
      data: validPages
    });
  }