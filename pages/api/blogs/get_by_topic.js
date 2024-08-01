import { fetchBlogsByTopic } from "../../../lib/notion";
import { generateBlogsCards } from "../../../lib/utils";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ msg: 'Method Not Allowed' });
    }
    const topic_= req.body.topic;
    console.log("se",topic_);
    try {
     
      const response = await fetchBlogsByTopic(topic_);
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