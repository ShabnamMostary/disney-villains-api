/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const { before, afterEach, describe, it } = require('mocha')
const { getAllVillains, getVillainBySlug, addNewVillain } = require('../../controllers/index')
const { villainsList, singleVillain } = require('../mocks/villains')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - disneyVillainsApi', () => {
  let stubbedFindOne
  let stubbedSend
  let response
  let stubbedSendStatus
  let stubbedStatus
  let stubbedStatusDotSend

  before(() => {
    stubbedFindOne = sinon.stub(models.villains, 'findOne')
    // sinon.stub is a spy function
    stubbedSend = sinon.stub()
    stubbedSendStatus = sinon.stub()
    stubbedStatusDotSend = sinon.stub()
    stubbedStatus = sinon.stub()

    response = {
      send: stubbedSend, // created an object response with send property 
      sendStatus: stubbedSendStatus,
      status: stubbedStatus

    }
  })

  afterEach(() => {
    stubbedFindOne.resetBehavior()
    stubbedSend.resetBehavior()
    stubbedSendStatus.resetBehavior()
    stubbedStatusDotSend.resetBehavior()
    stubbedStatus.resetBehavior()
  })

  describe('getAllVillains', () => {
    it('retrieves a list of disney villains from the database and calls response.send() with the list', async () => {
      // stubbed findAll function to return villainsList
      const stubbedFindAll = sinon.stub(models.villains, 'findAll').returns(villainsList)

      await getAllVillains({}, response)
      expect(stubbedFindAll).to.have.callCount(1)
      // send is a spy to verify the input of response.send(villainslist)
      expect(stubbedSend).to.have.been.calledWith(villainsList)
    })
  })
  describe('getVillainBySlug', () => {
    it('retrieves the villain associated with the provided slug from the database and calls response.send with it', async () => {
      // created a mock request object(request is a nested object where request.params.slug = Jafar"
      stubbedFindOne.returns(singleVillain)
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
  })
  describe('addNewVillain', () => {
    it('accepts new villain details,saves them as a new villain and returns the saved record with a 201 status', async () => {
      const request = { body: singleVillain }

      stubbedStatus.returns({ send: stubbedStatusDotSend })
      const stubbedCreate = sinon.stub(models.villains, 'create').returns(singleVillain)

      await addNewVillain(request, response)
      expect(stubbedCreate).to.have.been.calledWith(singleVillain)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusDotSend).to.have.been.calledWith(singleVillain)
    })
  })
})
