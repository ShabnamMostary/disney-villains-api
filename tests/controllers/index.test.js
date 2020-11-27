/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const { describe, it } = require('mocha')
const { getAllVillains, getVillainBySlug, addNewVillain } = require('../../controllers/index')
const { villainsList, singleVillain } = require('../mocks/villains')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - disneyVillainsApi', () => {
  describe('getAllVillains', () => {
    it('retrieves a list of disney villains from the database and calls response.send() with the list', async () => {
      // stubbed findAll function to return villainsList
      const stubbedFindAll = sinon.stub(models.villains, 'findAll').returns(villainsList)
      // sinon.stub is a spy function
      const stubbedSend = sinon.stub()
      // created an object response with send property 
      const response = { send: stubbedSend }

      await getAllVillains({}, response)
      expect(stubbedFindAll).to.have.callCount(1)
      // send is a spy to verify the input of response.send(villainslist)
      expect(stubbedSend).to.have.been.calledWith(villainsList)
    })
  })
  describe('getVillainBySlug', () => {
    it('retrieves the villain associated with the provided slug from the database and calls response.send with it', async () => {
      // created a mock request object(request is a nested object where request.params.slug = Jafar"
      const request = { params: { slug: 'Jafar' } }
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }
      const stubbedFindOne = sinon.stub(models.villains, 'findOne').returns(singleVillain)

      await getVillainBySlug(request, response)
      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'Jafar' } })
      expect(stubbedSend).to.have.been.calledWith(singleVillain)
    })
  })
  describe('addNewVillain', () => {
    it('accepts new villain details,saves them as a new villain and returns the saved record with a 201 status', async () => {
      const request = { body: singleVillain }
      const stubbedSend = sinon.stub()
      const stubbedStatus = sinon.stub().returns({ send: stubbedSend })
      const response = { status: stubbedStatus }
      const stubbedCreate = sinon.stub(models.villains, 'create').returns(singleVillain)

      await addNewVillain(request, response)
      expect(stubbedCreate).to.have.been.calledWith(singleVillain)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedSend).to.have.been.calledWith(singleVillain)
    })
  })
})
