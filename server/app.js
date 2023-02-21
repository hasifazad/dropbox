require("dotenv").config()
const express = require('express')
const userRouter = require('./routes/user')
const cors = require('cors')

const db = require('./dbconnection/mongoose')

const app = express()
let PORT = process.env.PORT

db()

app.use(cors())
app.use(express.json())


app.use('/', userRouter)


app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('server listening to port ', PORT);
    }
})