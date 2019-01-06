import mongoose from 'mongoose'
import movementSchema from './Movement'

const Schema = mongoose.Schema

const pieceSchema = new Schema({
    title: { type: 'String', required: true },
    composer: {
        firstName: { type: 'String', required: true },
        lastName: { type: 'String', required: true },
    },
    movements: [movementSchema],
})

export default mongoose.model('Piece', pieceSchema, 'pieces')
