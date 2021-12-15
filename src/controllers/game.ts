import { Request, Response } from 'express'
import { GameModel } from '../models/game'

const mongoose = require('mongoose')

export async function createGame(req: Request, res: Response) {
  console.log('Request to add game :', req.body)

  let gameToCreate = new GameModel(req.body)
  let createdGame = await gameToCreate.save()

  res.json(createdGame)
}

export async function addGameInfo(req: Request, res: Response) {
  console.log('Request to update game info', req.params.id)

  let game = await GameModel.findById(req.params.id)

  const gameInfos = game.infos

  const infos = {
    ...gameInfos,
    ...req.body
  }

  let gameToUpdate = await GameModel.findByIdAndUpdate(req.params.id, {infos}, {new : true})

  if (!gameToUpdate) {
    res.status(404).send()
  } else {
    res.json(gameToUpdate)
  }
}

export async function getGame(req: Request, res: Response) {
  const game = await GameModel.findById(req.params.id)

  if(!game) {
    res.status(404).send()
  } else {
    res.json(game)
  }
}

export async function getGames(req: Request, res: Response) {
  const search = req.query.search+""
  const page = parseInt(req.query.page+"")
  const limit = parseInt(req.query.limit+"")
  const skip = page?((page-1)*(limit?limit:10)):0

  const gameList = await GameModel.find({'title' : { $regex : search, $options : 'i'}}, {}, {limit, skip})


  if(!gameList) {
    res.status(404).send()
  } else {
    res.json(gameList)
  }
}


export async function getGameByUser(req: Request, res: Response) {
  const userId = req.params.userId!
  const gameList = await GameModel.find({ addedBy: mongoose.Types.ObjectId(userId) }, {}, {})

  if(!gameList) {
    res.status(404).send()
  } else {
    res.json(gameList)
  }
}

export async function getLastGame(req: Request, res: Response) {
  const game = await GameModel.findOne({},{},{sort : {'addedAt' :  -1}})

  if(!game) {
    res.status(404).send()
  } else {
    res.json(game)
  }
}

export async function getStats(req: Request, res: Response){
  const games = await GameModel.aggregate([
    {
      $group: {
        _id: '$addedBy',
        count: { $sum: 1 },
        average : { $avg : '$infos.score'}
      }
    }
  ]);

  console.log(games)

  if(!games) {
    res.status(404).send()
  } else {
    res.json(games)
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

  let gameToUpdate = await GameModel.findByIdAndUpdate(req.params.id, req.body, {new : true})


  if (!gameToUpdate) {
    res.status(404).send()
  } else {
    res.json(gameToUpdate)
  }
}