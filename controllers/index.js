const models = require('../models') // model is an object with a property villains
const getAllVillains = async (request, response) => {
  try {
    const result = await models.villains.findAll()

    return response.send(result)
  } catch (error) {
    return response.status(500).send('Unable to retrieve Villains, please try again')
  }
}

const getVillainBySlug = async (request, response) => {
  try {
    const { slug } = request.params
    const foundVillain = await models.villains.findOne({ where: { slug } })

    if (!foundVillain) {
      return response.sendStatus(404)
    }

    return response.send(foundVillain)
  } catch (error) {
    return response.status(500).send('Unable to retrieve Villain, please try again')
  }
}
const addNewVillain = async (request, response) => {
  try {
    const { name, movie, slug } = request.body

    if (!name || !movie || !slug) {
      return response.status(400).send('Following items are required name,movie and slug')
    }

    const newVillain = await models.villains.create({ name, movie, slug })

    return response.status(201).send(newVillain)
  } catch (error) {
    return response.status(500).send('Unable to save Villain, please try again')
  }
}

module.exports = { getAllVillains, getVillainBySlug, addNewVillain }
