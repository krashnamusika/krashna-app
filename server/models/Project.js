import mongoose from 'mongoose'

const Schema = mongoose.Schema

const projectSchema = new Schema({
    name: { type: 'String', required: true },
    isActive: { type: 'Boolean', required: true },
    pieces: [{ type: 'ObjectId', ref: 'Piece' }],
    rehearsals: [{ type: 'ObjectId', ref: 'Rehearsal' }],
    concerts: [{ type: 'ObjectId', ref: 'Concert' }],
})

export default mongoose.model('Project', projectSchema, 'projects')
