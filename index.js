const express = require('express')
const bodyParser = require('body-parser')
const { getAllVillains, getVillainBySlug, addNewVillain } = require('./controllers/index')
const app = express()

app.get('/villains', getAllVillains)
app.get('/villains/:slug', getVillainBySlug)
app.post('/villains', bodyParser.json(), addNewVillain)
app.all('*', (request, response) => {
  return response.sendStatus(404)
})

app.listen(1337, () => {
  console.log('Listening on port 1337...') // eslint-disable-line no-console
})
