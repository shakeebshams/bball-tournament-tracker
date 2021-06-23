import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const uri = process.env.MONGODB_URI
mongoose.connect(uri, {useNewUrlParser: true})
const GameSchema = {
    session_id: String,
    state: [String]
}
const GameDB = mongoose.model("iarBBall", GameSchema, 'iarBBall')
export default GameDB