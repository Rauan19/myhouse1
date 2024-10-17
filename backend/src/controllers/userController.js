import bcrypt from 'bcrypt'
import Users from '../models/user.models'
import fs from 'fs';
import cloudinary from '../config/cloudnary';


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

export const ImagemDePerfil = async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Verifica se o usuário existe
      const user = await Users.findById(userId);
      if (!user) {
        return res.status(404).json("Usuário não encontrado");
      }
  
      // Verifica se a imagem foi enviada
      if (!req.file) {
        return res.status(400).json({ error: "Uma imagem é obrigatória." });
      }
  
      // Faz o upload da imagem para o Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(req.file.path);
  
      // Atualiza o perfil do usuário com a URL da imagem
      user.imgPerfil = uploadResponse.secure_url;
      await user.save();
  
      // Remove o arquivo local após o upload
      fs.unlinkSync(req.file.path);
  
      return res.status(200).json(user);
  
    } catch (error) {
      return res.status(500).json({ err: error.message });
    }
  };

