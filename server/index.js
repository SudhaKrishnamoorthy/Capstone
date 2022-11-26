require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed, getCompetitors, createCompetitor, deleteCompetitor} = require('./controller.js')

app.use(express.json())
app.use(cors())

// DEV
app.post('/seed', seed)

// Competitors
app.get('/competitors', getCompetitors)

app.post('/competitors', createCompetitor)
app.delete('/competitors/:id', deleteCompetitor)

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))