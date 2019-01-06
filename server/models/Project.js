import mongoose from 'mongoose'
import pieceSchema from './Piece'
import rehearsalSchema from './Rehearsal'
import concertSchema from './Concert'

const Schema = mongoose.Schema

const projectSchema = new Schema({
    name: { type: 'String', required: true },
    pieces: [pieceSchema],
    rehearsals: rehearsalSchema,
    concerts: [concertSchema],
})

export default mongoose.model('Project', projectSchema, 'projects')
