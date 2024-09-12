import { Server } from "socket.io";
import { Chat } from "../models/chatModels";

export const ConfigSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173", // Atualize para a porta correta do seu frontend
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("Novo usuário conectado: ", socket.id);

        socket.on("EnviarMensagem", async ({ ChatId, sendId, text }) => {
            try {
                const newMessage = await Chat.create({ ChatId, sendId, text });
                io.to(ChatId).emit("ReceberMensagem", newMessage);
            } catch (error) {
                console.error("Erro ao enviar mensagem: ", error.message);
            }
        });

        socket.on("joinRoom", (ChatId) => {
            socket.join(ChatId);
            console.log(`Usuário ${socket.id} entrou na sala: ${ChatId}`);
        });

        socket.on("disconnect", () => {
            console.log("Usuário desconectado: ", socket.id);
        });
    });
};
