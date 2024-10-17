import { House } from "../models/casas.models";
import cloudinary from "../config/cloudnary";
import fs from 'fs';

export const CriarHouse = async (req, res) => {
    const { title, description, contactNumber, location, price } = req.body;
    const { userId } = req.params;

    try {
        // Verifica se pelo menos uma imagem foi enviada
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "Uma imagem é obrigatória." });
        }

        const imageUrls = [];

        // Faz o upload de cada imagem e armazena a URL na array `imageUrls`
        for (const file of req.files) {
            const uploadResponse = await cloudinary.uploader.upload(file.path);
            imageUrls.push(uploadResponse.secure_url);
            
            // Remove o arquivo local após o upload
            fs.unlinkSync(file.path);
        }

        // Cria um novo registro da casa com as URLs das imagens no Cloudinary
        const newHouse = await House.create({
            userId,
            title,
            description,
            contactNumber,
            location,
            price,
            images: imageUrls // Array com as URLs das imagens
        });

        // Retorna a nova casa criada como resposta
        return res.status(201).json(newHouse);

    } catch (error) {
        // Em caso de erro, retorna uma mensagem de erro
        return res.status(500).json({ err: error.message });
    }
};



export const getAllHouse = async (req, res) => {
   try {
     const todas = await House.find()
     return res.status(200).json(todas)
   } catch (error) {
    return res.status(500).json({err: error.message})
    
   }
};

export const getHousePorCliente = async (req, res) => {
    const {userId} = req.params

    try {
        const result = await House.find({userId})
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({err: error.message})
    }
};

export const DeleteMyHouse = async (req, res) => {
     const {_id} = req.params

     try {
         await House.deleteOne({_id})

        return res.status(200).json("House deletado")
     } catch (error) {
        return res.status(500).json({err: error.message})
     }
}

export const getPorPrice =  async (req, res) => {
    const  {order} = req.query

    try {
        const house = await House.find().sort({price: order === 'asc' ? 1 : -1})
        return res.status(200).json(house)
    } catch (error) {
        return res.status(500).json({err: error.message})
        
    }
}

export const searchHouses = async (req, res) => {
    const { term } = req.query;

    try {
        const results = await House.find({
            $or: [
                { title: { $regex: term, $options: 'i' } },
                { description: { $regex: term, $options: 'i' } },
                { location: { $regex: term, $options: 'i' } },
            ]
        });

        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ err: error.message });
    }
};


export const Deletetudo = async (req, res) => {
    try {
        const result = await House.deleteMany({}); // Deleta todos os documentos na coleção House
        return res.status(200).json({ message: `${result.deletedCount} casas deletadas.` });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


