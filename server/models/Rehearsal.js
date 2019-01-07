import mongoose from 'mongoose'

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

export default mongoose.model('Rehearsal', rehearsalSchema, 'rehearsals')
