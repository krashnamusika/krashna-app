import mongoose from 'mongoose'
import Piece from './Piece'

const Schema = mongoose.Schema

const movementSchema = new Schema({
    title: { type: 'String', required: true },
    sections: [
        {
            type: 'String',
            required: true,
        },
    ],
})

movementSchema.pre('remove', next => {
    Piece.update(
        { movements: this._id },
        { $pull: { movements: this._id } },
        { multi: true }
    ).exec()
    next()
})

export default mongoose.model('Movement', movementSchema, 'movements')
