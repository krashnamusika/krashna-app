import mongoose from 'mongoose'

const MONGO_URL =
    process.env.MONGO_URL || 'mongodb://localhost:27017/krashna-app'

// Set native promises as mongoose promise
mongoose.Promise = global.Promise

mongoose.connect(
    MONGO_URL,
    { useNewUrlParser: true },
    error => {
        if (error) {
            console.error('Please make sure MongoDB is installed and running!')
            throw error
        } else {
            console.log('Database connected')
        }
    }
)
