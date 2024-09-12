import bcrypt from 'bcrypt'
import Users from '../models/user.models'


export const RegistrarUser = async (req, res) => {
    const {name, email, password, imgPerfil} = req.body
    
    
    const userExist = await Users.findOne({email})
 try {
        if(userExist) {
       return  res.status(501).json('Usuario já existe')
    }

    if(!name) {
        return res.status(501).json("Nome obrigatório")
    }

    if(!password) {
        return res.status(501).json("Senha obrigatório")
    }

    const cripCode = await bcrypt.hash(password, 10)

    // rony parou aqui

    const newUsers = await Users.create({
        name,
        email,
        password: cripCode,
        imgPerfil:  imgPerfil || '/uploads/default-profile.png'

    })

    return res.status(201).json(newUsers)
 } catch (error) {
    return res.status(500).json("Error interno no servidor")
    
 }
 
}

export const GetallUser =  async (req, res) => {
    try {
        const user = await Users.find()

        if(user){
            return res.status(200).json(user)
        }

    } catch (error) {
        return res.status(500).json({err: error.message})
        
    }
}

export const Imgaemdeperfil = async (req, res) => {
  const {userId} = req.params

  try {
    const user = await Users.findById(userId)
    if(!user) {
        return res.status(404).json("Usuario não encontrado")
    }
  user.imgPerfil = `/uploads/${req.file.filename}`;
    await user.save()
    return  res.status(200).json(user)

  } catch (error) {
    return res.status(500).json({err: error.message})
  }
}

