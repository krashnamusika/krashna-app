import mongoose from 'mongoose'

const Schema = mongoose.Schema

const movementSchema = new Schema({
    title: { type: 'String', required: true },
    musicalSkills: [
        {
            type: 'String',
            required: true,
        },
    ],
})

export default movementSchema
