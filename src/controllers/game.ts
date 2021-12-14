import { Request, Response } from 'express'
import { GameModel } from '../models/game'

export async function createGame(req: Request, res: Response) {
  console.log('Request to add game :', req.body)

  let gameToCreate = new GameModel(req.body)
  let createdGame = await gameToCreate.save()

  res.json(createdGame)
}

export async function getGameInfo(req: Request, res: Response) {
  const game = await GameModel.findById(req.params.id)

  if(!game) {
    res.status(404).send()
  } else {
    res.json(game)
  }
}

export async function getGames(req: Request, res: Response) {
  const gameList = await GameModel.find({})

  if(!gameList) {
    res.status(404).send()
  } else {
    res.json(gameList)
  }
}


export async function deleteGame(req: Request, res: Response) {
  console.log('Request to delete game by id', req.params.id)

  let deletedGame = await GameModel.findByIdAndRemove(req.params.id)

  if (!deletedGame) {
    res.status(404).send()
  } else {
    res.json(deletedGame)
  }
}


export async function updateGame(req: Request, res: Response) {
  console.log('Request to update game by id', req.params.id)

  let gameToUpdate = await GameModel.findByIdAndUpdate(req.params.id, req.body)


  if (!gameToUpdate) {
    res.status(404).send()
  } else {
    res.json(gameToUpdate)
  }
}