import { Schema, model } from 'mongoose'
import { User } from './user'

// L'interface de données "brutes" pour le typage Typescript
export interface Game {
title: string
addedAt: Date
addedBy?: User
}

// Le schéma de validation MongoDB, basé sur l'interface
export const gameSchema = new Schema<Game>({
title: { type: String, required: true },
addedAt: { type: Date, default: () => new Date() },
addedBy: Schema.Types.ObjectId,
})

// Le modèle des données MongoDB, basé sur l'interface
// Ce modèle possède l'identifiant, la méthode de sauvegarde etc.
export const GameModel = model<Game>('Game', gameSchema)