const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { describe, it } = require('mocha')
const { getAllVillains, getVillainBySlug, addNewVillain } = require('../../controllers/index')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - disneyVillainsApi', () => {
  describe('getAllVillains', () => { })
  describe('getVillainBySlug', () => { })
  describe('addNewVillain', () => { })
})
