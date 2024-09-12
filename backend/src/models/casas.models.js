import mongoose from "mongoose";

const HouseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String
    
  },
  price: {               // Novo campo adicionado
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    default: [],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});



export const House = mongoose.model('House', HouseSchema);
