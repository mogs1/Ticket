const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const errorHandler = require('../backend/middleware/errorMiddleware')
const PORT = process.env.PORT || 5000

//connect to database
connectDB()

const app  = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
	res.status(200).json({message: 'whats going on'})
})

//Routes
app.use('/api/users', require('./routers/UserRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`server started on ${PORT}`))
