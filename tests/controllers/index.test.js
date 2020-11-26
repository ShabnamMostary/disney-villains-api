const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const { describe, it } = require('mocha')
const { getAllVillains, getVillainBySlug, addNewVillain } = require('../../controllers/index')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - disneyVillainsApi', () => {
  describe('getAllVillains', () => {
    it('retrieves a list of disney villains from the database and calls response.send() with the list', async () => {
      const stubbedFindAll = sinon.stub(models.villains, 'findAll')
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }

      await getAllVillains({}, response)
    })
  })
  describe('getVillainBySlug', () => { })
  describe('addNewVillain', () => { })
})
