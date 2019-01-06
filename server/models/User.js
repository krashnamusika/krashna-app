import mongoose from 'mongoose'

const Schema = mongoose.Schema

/*
User Permission Levels:

MEMBER - baseline membership, can view schedule and manipulate personal data
SCHEDULER - can manipulate the schedule
ADMIN - can change user permissions and remove users
 */

const userSchema = new Schema({
    firstName: { type: 'String', required: true },
    lastName: { type: 'String', required: true },
    email: { type: 'String', required: true },
    password: { type: 'String', required: true },
    permissionLevels: [{ type: 'String' }],
    resetPasswordToken: { type: 'String' },
    resetPasswordTokenExpires: { type: 'Date' },
})

export default mongoose.model('User', userSchema, 'users')
