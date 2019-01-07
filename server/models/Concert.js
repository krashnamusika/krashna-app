import mongoose from 'mongoose'
import Project from './Project'

const Schema = mongoose.Schema

const concertSchema = new Schema({
    startDateTime: { type: 'Date', required: true },
    endDateTime: { type: 'Date', required: true },
    location: { type: 'String', required: true },
    pieces: [{ type: 'ObjectId', ref: 'Piece' }],
})

concertSchema.pre('remove', next => {
    Project.update(
        { concerts: this._id },
        { $pull: { concerts: this._id } },
        { multi: true }
    ).exec()
    next()
})

export default mongoose.model('Concert', concertSchema, 'concerts')
