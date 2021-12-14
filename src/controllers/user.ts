import { Request, Response } from 'express'
import { UserModel } from '../models/user'

export async function createUser(req: Request, res: Response) {
  console.log('Request to add user :', req.body)

  let userToCreate = new UserModel(req.body)
  let createdUser = await userToCreate.save()

  res.json(createdUser)
}

export async function getUserInfo(req: Request, res: Response) {
  const user = await UserModel.findById(req.params.id)

  if(!user) {
    res.status(404).send()
  } else {
    res.json(user)
  }
}

export async function getUsers(req: Request, res: Response) {
  const userList = await UserModel.find({})

  if(!userList) {
    res.status(404).send()
  } else {
    res.json(userList)
  }
}

export async function deleteUser(req: Request, res: Response) {
  console.log('Request to delete user by id', req.params.id)

  let deletedUser = await UserModel.findByIdAndRemove(req.params.id)

  if (!deletedUser) {
    res.status(404).send()
  } else {
    res.json(deletedUser)
  }
}

export async function updateUser(req: Request, res: Response) {
  console.log('Request to update user by id', req.params.id)

  let userToUpdate = await UserModel.findByIdAndUpdate(req.params.id, req.body)


  if (!userToUpdate) {
    res.status(404).send()
  } else {
    res.json(userToUpdate)
  }
}