import mongoose from 'mongoose'

const Schema = mongoose.Schema

const pieceSchema = new Schema({
    title: { type: 'String', required: true },
    composerFirstName: { type: 'String', required: true },
    composerLastName: { type: 'String', required: true },
    movements: [{ type: 'ObjectId', ref: 'Movement' }],
})

export default mongoose.model('Piece', pieceSchema, 'pieces')
