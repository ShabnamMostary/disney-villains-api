const models = require('../models')
const getAllVillains = async (request, response) => {
  const result = await models.villains.findAll() // models.tablename

  return response.send(result)
}

const getVillainBySlug = async (request, response) => {
  const { slug } = request.params
  const foundVillain = await models.villains.findOne({ where: { slug } })

  if (!foundVillain) {
    return response.status(404).send('Not Found!')
  }

  return response.send(foundVillain)
}
const addNewVillain = async (request, response) => {
  const { name, movie, slug } = request.body

  if (!name || !movie || !slug) {
    return response.status(400).send('Following items are required name,movie and slug')
  }

  const newVillain = await models.villains.create({ name, movie, slug })

  return response.status(201).send(newVillain)
}

module.exports = { getAllVillains, getVillainBySlug, addNewVillain }
