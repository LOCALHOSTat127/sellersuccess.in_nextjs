import { fetchUserDetailsByID } from "../../../lib/notion";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ msg: 'Method Not Allowed' });
    }
    const {UID}= req.body;
    try {
      const response = await fetchUserDetailsByID(UID);
      return res.status(200).json({
        isErr : false,
        msg : "",
        data : response
      });
    } catch (error) {
    
      return res.status(404).json({
        isErr : true,
        msg : error.message,
        data : null
      });
    }
  }