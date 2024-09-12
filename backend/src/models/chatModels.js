import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    houseId:
     {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'House',
         required: true 
     },
    userId: {
          type: mongoose.Schema.Types.ObjectId,
           ref: 'User',
           required: true 
        },
   ownerId: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
         },
  messages: [
            {
                sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
                text: String,
                createdAt: { type: Date, default: Date.now },
                
            }
        ],
    }, { timestamps: true });
    
    export const Chat = mongoose.model('Chat', ChatSchema);
    

