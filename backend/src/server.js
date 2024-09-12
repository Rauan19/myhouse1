import express from 'express';
import cors from 'cors';
import { router } from './routes/routes';
import { connectToDatabase } from './db/banco';
import http from 'http';
import path from 'path';
import { ConfigSocket } from './config/socket.io';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);

ConfigSocket(server);

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
connectToDatabase();

app.use(router);

const PORT = process.env.PORT || 4001;
console.log('Porta configurada:', PORT);

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
