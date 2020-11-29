/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const {
  before, beforeEach, afterEach, describe, it
} = require('mocha')
const { getAllVillains, getVillainBySlug, addNewVillain } = require('../../controllers/index')
const { villainsList, singleVillain } = require('../mocks/villains')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - disneyVillainsApi', () => {
  let sandbox
  let stubbedFindAll
  let stubbedFindOne
  let stubbedCreate
  let stubbedSend
  let response
  let stubbedSendStatus
  let stubbedStatusDotSend
  let stubbedStatus

  before(() => {
    sandbox = sinon.createSandbox()
    stubbedFindAll = sandbox.stub(models.villains, 'findAll')
    stubbedFindOne = sandbox.stub(models.villains, 'findOne')
    stubbedCreate = sandbox.stub(models.villains, 'create')
    stubbedSend = sandbox.stub()
    stubbedSendStatus = sandbox.stub()
    stubbedStatusDotSend = sandbox.stub()
    stubbedStatus = sandbox.stub()
    response = {
      send: stubbedSend, // created an object response with send property 
      sendStatus: stubbedSendStatus,
      status: stubbedStatus

    }
  })
  beforeEach(() => {
    stubbedStatus.returns({ send: stubbedStatusDotSend })
  })
  afterEach(() => {
    sandbox.reset()
  })

  describe('getAllVillains', () => {
    it('retrieves a list of disney villains from the database and calls response.send() with the list', async () => {
      // stubbed findAll function to return villainsList
      stubbedFindAll.returns(villainsList)
      await getAllVillains({}, response)
      expect(stubbedFindAll).to.have.callCount(1)
      // send is a spy to verify the input of response.send(villainslist)
      expect(stubbedSend).to.have.been.calledWith(villainsList)
    })
    it('returns status 500 with an error message when database throws an error', async () => {
      stubbedFindAll.throws('ERROR!')
      await getAllVillains({}, response)
      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve Villains, please try again')
    })
  })
  describe('getVillainBySlug', () => {
    it('retrieves the villain associated with the provided slug from the database and calls response.send with it', async () => {
      stubbedFindOne.returns(singleVillain)
      // created a mock request object(request is a nested object where request.params.slug = Jafar"
      const request = { params: { slug: 'Jafar' } }

      await getVillainBySlug(request, response)
      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'Jafar' } })
      expect(stubbedSend).to.have.been.calledWith(singleVillain)
    })
    it('returns status 404 when no Villain is found', async () => {
      stubbedFindOne.returns(null)
      const request = { params: { slug: 'xyz' } }

      await getVillainBySlug(request, response)
      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'xyz' } })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })
    it('returns status 500 with an error message when database throws an error', async () => {
      stubbedFindOne.throws('ERROR!')
      const request = { params: { slug: 'throw-error' } }

      await getVillainBySlug(request, response)
      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'throw-error' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve Villain, please try again')
    })
  })
  describe('addNewVillain', () => {
    it('accepts new villain details,saves them as a new villain and returns the saved record with a 201 status', async () => {
      stubbedCreate.returns(singleVillain)
      const request = { body: singleVillain }

      await addNewVillain(request, response)
      expect(stubbedCreate).to.have.been.calledWith(singleVillain)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusDotSend).to.have.been.calledWith(singleVillain)
    })
    it('returns status 500 with an error message when database throws an error', async () => {
      stubbedCreate.throws('ERROR!')
      const request = { body: singleVillain }

      await addNewVillain(request, response)
      expect(stubbedCreate).to.have.been.calledWith(singleVillain)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to save Villain, please try again')
    })
  })
})
