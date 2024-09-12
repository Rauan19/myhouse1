import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    imgPerfil: {
        type: String,
        default: '/uploads/default-profile.png'
    }

})


const Users = mongoose.model('User', UserSchema)

export default Users