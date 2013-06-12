expect = require 'expect.js'
Cord = require '../'

describe 'Cord', ->
   
   it 'exists', ->
      expect(Cord).to.be.ok()
      expect(Cord).to.be.a 'function'
   
   it 'has a circular constructor-reference', ->
      expect((new Cord).constructor).to.be Cord
   it 'has a named constructor', ->
      expect(Cord.name).to.be 'Cord'
   
   describe '(aping a String)', ->
      
      it 'exposes toString()', ->
         cord = new Cord
         expect(   cord).to.have.property 'toString'
         expect(-> cord.toString()).to.not.throwError()
         expect(   cord.toString()).to.be.a 'string'
      
      it "toString()'s to a plain String, by default", ->
         c = new Cord 'foo'
         expect(c.toString()).to.be 'foo'
