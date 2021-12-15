import { Schema, model } from 'mongoose'

export interface User {
  name: string
  addedAt: Date
  gamesAdded: number
}

export const userSchema = new Schema<User>({
  name: { type: String, required: true },
  addedAt: { type: Date, default: () => new Date() },
})


export const UserModel = model<User>('User', userSchema)