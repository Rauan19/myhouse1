import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.BANCOURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Conectado ao MongoDB');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        process.exit(1); // Sai do processo se a conexão falhar
    }
};
