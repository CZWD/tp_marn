import { Router } from 'express'
import { addGameInfo, createGame, getGame, getGames, getStats, getGameByUser, getLastGame, deleteGame, updateGame } from '../controllers/game'
import { createUser, getUser, getUsers, deleteUser, updateUser } from '../controllers/user'

export const router = Router()

/**GET */
router.get('/game/:id', getGame)
router.get('/user/:id', getUser)

router.get('/games/by-user/:userId', getGameByUser)
router.get('/games/last', getLastGame)
router.get('/games', getGames)

router.get('/users', getUsers)
router.get('/users/stats', getStats)

/**POST */
router.post('/game/add', createGame)
router.post('/user', createUser)

/**PUT */
router.put('/game/info/:id', addGameInfo)
router.put('/game/:id', updateGame)
router.put('/user/:id', updateUser)

/**DELETE */
router.delete('/games/:id', deleteGame)
router.delete('/users/:id', deleteUser)
