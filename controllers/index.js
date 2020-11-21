const villains = require('../villains')
const getAllVillains = (request, response) => {
  return response.send(villains)
}

const getVillainBySlug = (request, response) => {
  const { slug } = request.params
  const foundVillain = villains.filter((villain) => villain.slug === slug)

  return response.send(foundVillain)
}
const addNewVillain = (request, response) => {
  const { name, movie, slug } = request.body

  if (!name || !movie || !slug) {
    return response.status(400).send('Following items are required name,movie and slug')
  }
  const newVillain = { name, movie, slug }

  villains.push(newVillain)

  return response.status(201).send(newVillain)
}

module.exports = { getAllVillains, getVillainBySlug, addNewVillain }
