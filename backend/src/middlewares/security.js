import { verify } from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config()

export const SecurityRT = async (req, res, next) => {
 const auhtHeader = req.headers.authorization

 if(!auhtHeader) {
    return res.status(401).json({message: "token obrigatorio"})
 }

 try {
    const token = auhtHeader.replace("Bearer ", "")
    const {subject} = verify(token, process.env.TOKENURL);
    req.user = subject
    next()
 } catch (error) {
    return res.status(500).json({message: "Error ao fazer login"})
 }

}