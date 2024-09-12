import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Users from '../models/user.models'
import dotenv from 'dotenv'


dotenv.config()

export const LoginUser = async (req, res) => {
    const {email, password} = req.body

     try {
       const user = await Users.findOne({email})
       

    if(!user) {
        return res.status(400).json({message: "Usuário não encontrado"})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        return res.status(400).json("senha incorreta")
    }
    
    const token = jwt.sign({subject: user._id }, process.env.TOKENURL, {expiresIn: '5d'} )
    
    return res.status(200).json({token, name: user.name, image: user.imgPerfil}) 
     } catch (error) {
        return res.status(500).json(error)
     }
}
