import { fetchBySearchTextMatchID } from "../../../lib/notion";
import { generateBlogsCards } from "../../../lib/utils";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ msg: 'Method Not Allowed' });
    }

    
    const search_query = req.body.sQuery || "";
  
    try {
        const res_ = await fetchBySearchTextMatchID(search_query)
        if(res_){
        
          const cards_ = await generateBlogsCards(res_);
          return res.status(200).json({
          isErr : false,
          msg : "ok",
          data : cards_
        });
        }
    } catch (error) {
      return res.status(404).json({
        isErr : true,
        msg : error.message,
        data : null
      });
    }
  }