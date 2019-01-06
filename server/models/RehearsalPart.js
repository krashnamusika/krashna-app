import mongoose from 'mongoose'
import Piece from './Piece'
import Rehearsal from './Rehearsal'

const Schema = mongoose.Schema

const rehearsalPartSchema = new Schema({
    startDateTime: { type: 'Date', required: true },
    endDateTime: { type: 'Date', required: true },
    comment: { type: 'String' },
    location: { type: 'String' },
    isGroupRehearsal: { type: 'Boolean' },
    ledBy: { type: 'String' },
    pieces: [{ type: 'ObjectId', ref: 'Piece' }],
    movements: [{ type: 'ObjectId' }],
})

rehearsalPartSchema.pre('remove', next => {
    Rehearsal.update(
        { parts: this._id },
        { $pull: { parts: this._id } },
        { multi: true }
    ).exec()
    next()
})

export default mongoose.model(
    'RehearsalPart',
    rehearsalPartSchema,
    'rehearsalParts'
)
