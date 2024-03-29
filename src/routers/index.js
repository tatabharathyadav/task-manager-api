const express = require('express')
require('../db/mongoose')
require('dotenv').config();
const userRouter = require('./user')
const taskRouter = require('./task')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})