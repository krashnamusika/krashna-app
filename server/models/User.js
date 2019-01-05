import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: { type: 'String', required: true },
    lastName: { type: 'String', required: true },
    email: { type: 'String', required: true },
    password: { type: 'String', required: true },
    permissionLevel: { type: 'String', required: true },
    resetPasswordToken: { type: 'String' },
    resetPasswordTokenExpires: { type: 'Date' },
})

export default mongoose.model('User', userSchema, 'users')
