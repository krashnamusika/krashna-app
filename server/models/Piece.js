import mongoose from 'mongoose'
import Concert from './Concert'
import Project from './Project'
import RehearsalPart from './RehearsalPart'

const Schema = mongoose.Schema

const pieceSchema = new Schema({
    title: { type: 'String', required: true },
    composerFirstName: { type: 'String', required: true },
    composerLastName: { type: 'String', required: true },
    movements: [{ type: 'ObjectId', ref: 'Movement' }],
})

pieceSchema.pre('remove', next => {
    Concert.update(
        { pieces: this._id },
        { $pull: { pieces: this._id } },
        { multi: true }
    ).exec()
    Project.update(
        { pieces: this._id },
        { $pull: { pieces: this._id } },
        { multi: true }
    ).exec()
    RehearsalPart.update(
        { pieces: this._id },
        { $pull: { pieces: this._id } },
        { multi: true }
    ).exec()
    next()
})

export default mongoose.model('Piece', pieceSchema, 'pieces')
