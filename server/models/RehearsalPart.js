import mongoose from 'mongoose'

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

export default rehearsalPartSchema
