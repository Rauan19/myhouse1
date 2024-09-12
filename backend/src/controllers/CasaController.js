import { House } from "../models/casas.models";

export const CriarHouse = async (req, res) => {
    const { title, description, contactNumber, location, price } = req.body; // Correção do typo aqui
    const { userId } = req.params;

    try {
        const newHouse = await House.create({
            userId,
            price,
            title,
            description,
            contactNumber, // E aqui também
            location,
            images: req.files.map(file => `/uploads/${file.filename}`) // Caminho dos arquivos de imagem
        });

        return res.status(201).json(newHouse);
    } catch (error) {
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

