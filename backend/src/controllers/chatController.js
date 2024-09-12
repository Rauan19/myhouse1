import { Chat } from "../models/chatModels";
import { House } from "../models/casas.models";



export const IniciarChat = async (req, res) => {
    const {houseId} = req.params;
    const {userId} = req.body

    try {
        const house = await House.findById(houseId)
        if(!house) {
            return res.status(404).json({err: "Casa não encontrada"})
        }

        const existingChat = await Chat.findOne({
            houseId,
            $or: [
                { userId },
                { ownerId: house.userId }
            ]
        });

        if (existingChat) {
            return res.status(200).json(existingChat);
        }

        const chat = await Chat.create({
            houseId,
            userId,
            ownerId: house.userId,
            messages: []
        })
        return res.status(201).json(chat)
    } catch (error) {
        return res.status(500).json({err: error.message})
    }
}

export const EnviarMensagem = async (req, res) => {
    const { chatId } = req.params;
    const { senhaId, text } = req.body;

    try {
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ err: "chat não encontrado" });
        }

        const newMessage = {
            sender: senhaId,
            text,
            createdAt: new Date()
        };
        chat.messages.push(newMessage);
        await chat.save();

        return res.status(200).json(newMessage);
    } catch (error) {
        return res.status(500).json({ err: error.message });
    }
};

export const getMensagensDoChat = async (req, res) => {
    const { chatId } = req.params;

    try {
        const chat = await Chat.findById(chatId).populate('messages.sender')
        if (!chat) {
            return res.status(404).json({ err: "Chat não encontrado" });
        }

        return res.status(200).json(chat.messages);
    } catch (error) {
        return res.status(500).json({ err: error.message });
    }
};

export const getChatDoUsuario = async (req, res) => {
    const {userId} = req.params

    try {
        const chats = await Chat.find({
            $or: [
                {userId: userId},
                {ownerId: userId}
            ]
        }).populate("userId").populate("ownerId").populate("houseId")

        if(chats.length === 0) {
            return res.status(404).json({msg: "Nenhum chat encontrado"})
        }
        return res.status(200).json(chats)
    } catch (error) {
        return res.status(500).json({err: error.message})
    }
}

