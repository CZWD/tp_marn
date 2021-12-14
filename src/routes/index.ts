import { Router } from 'express'
import { createGame, getGameInfo, getGames, deleteGame, updateGame } from '../controllers/game'
import { createUser, getUserInfo, getUsers, deleteUser, updateUser } from '../controllers/user'

export const router = Router()

router.post('/game', createGame)
router.post('/user', createUser)

router.post('/game/:id', updateGame)
router.post('/user/:id', updateUser)

router.get('/game/:id', getGameInfo)
router.get('/user/:id', getUserInfo)

router.get('/games', getGames)
router.get('/users', getUsers)

router.delete('/games/:id', deleteGame)
router.delete('/users/:id', deleteUser)
