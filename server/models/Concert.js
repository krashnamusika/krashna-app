import mongoose from 'mongoose'

const Schema = mongoose.Schema

const concertSchema = new Schema({
    startDateTime: { type: 'Date', required: true },
    endDateTime: { type: 'Date', required: true },
    location: { type: 'String', required: true },
})

export default concertSchema
