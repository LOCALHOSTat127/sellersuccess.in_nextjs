import { fetchRecentBlogs } from "../../../lib/notion";
import { generateBlogsCards } from "../../../lib/utils";


export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ msg: 'Method Not Allowed' });
    }
    const {limit}= req.body;
 
    try {
      const response = await fetchRecentBlogs(limit);
      let blogs_ = await generateBlogsCards(response);


      return res.status(200).json({
        isErr : false,
        msg : "",
        data : blogs_
      });
    } catch (error) {
      return res.status(404).json({
        isErr : true,
        msg : error.message,
        data : null
      });
    }
  }