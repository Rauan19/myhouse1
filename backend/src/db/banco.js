import mongoose from 'mongoose';

export const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb+srv://house:Rau20@cluster0.mycggaf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Conectado ao MongoDB');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        process.exit(1); // Sai do processo se a conexão falhar
    }
};
