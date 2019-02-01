import mongoose from 'mongoose'
import Project from './Project'

const Schema = mongoose.Schema

const rehearsalSchema = new Schema({
    startDateTime: { type: 'Date', required: true },
    endDateTime: { type: 'Date', required: true },
    comment: { type: 'String' },
    isOpen: { type: 'Boolean' },
    isGeneral: { type: 'Boolean' },
    isDress: { type: 'Boolean' },
    isRehearsalDay: { type: 'Boolean' },
    isInConcertClothing: { type: 'Boolean' },
    withSoloist: { type: 'Boolean' },
    parts: [{ type: 'ObjectId', ref: 'RehearsalPart' }],
})

rehearsalSchema.pre('remove', next => {
    Project.update(
        { rehearsals: this._id },
        { $pull: { rehearsals: this._id } },
        { multi: true }
    ).exec()
    next()
})

export default mongoose.model('Rehearsal', rehearsalSchema, 'rehearsals')
