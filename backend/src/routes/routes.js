import { RegistrarUser ,  GetallUser} from "../controllers/userController";
import { LoginUser } from "../controllers/authUser";
import { CriarHouse,
 getAllHouse,
getHousePorCliente,
DeleteMyHouse,
 getPorPrice,
  searchHouses,
  Deletetudo,
} from "../controllers/CasaController"
import { ImagemDePerfil } from "../controllers/userController";
import { IniciarChat, EnviarMensagem, getMensagensDoChat, getChatDoUsuario } from "../controllers/chatController";

import { SecurityRT } from "../middlewares/security";

import express from 'express'
import upload from "../config/multer";

export const router = express.Router()

router.post('/user/registro', RegistrarUser)
router.post('/login/user', LoginUser)

router.get("/alluser", SecurityRT, GetallUser )


router.post('/house/:userId', upload.array('images', 4),  CriarHouse)
router.get('/allhouse', SecurityRT, getAllHouse )
router.get('/house/:userId', SecurityRT, getHousePorCliente)
router.delete('/delete/house/:_id', SecurityRT, DeleteMyHouse)
router.get('/houses/filterpreco', SecurityRT, getPorPrice)

//Chat
router.get("/search", SecurityRT, searchHouses)
router.post("/chat/:houseId", SecurityRT, IniciarChat)
router.post('/chat/:chatId/mensagem', SecurityRT, EnviarMensagem)
router.get("/chat/:chatId", SecurityRT, getMensagensDoChat)



router.get("/chats/:userId", SecurityRT, getChatDoUsuario )

router.post('/user/:userId/upload-perfil', upload.single('imgPerfil'), ImagemDePerfil);

router.delete("/deletehouse", SecurityRT, Deletetudo)

//66b80ae7abf8cff2d98ce134
//"email" : "rauan10@gmail.com"

//66bd29b99b03746b055199f9 outro user

