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
      
      it.skip 'constructs without `new`', ->
         expect(-> Cord 'foo').to.not.throwError()
         expect(   Cord 'foo').to.be.a Cord
         expect(-> Cord()).to.not.throwError()
         expect(   Cord()).to.be.a Cord
      
      it 'constructs arbitrary arguments via their toString()', ->
         toCord   = (it) -> new Cord(it)   .toString()
         toString = (it) -> new String(it) .toString()
         
         expect(toCord {}).to.be toString {}
         expect(toCord {}).to.be '[object Object]'
         
         expect(toCord 42).to.be toString 42
         expect(toCord 42).to.be '42'
         
         expect(toCord [1, 2, 3]).to.be toString [1, 2, 3]
         expect(toCord [1, 2, 3]).to.be '1,2,3'
         
         thingie = { toString: -> return 'whee' }
         expect(toCord thingie).to.be toString thingie
         expect(toCord thingie).to.be 'whee'
      
      it 'exposes toString()', ->
         cord = new Cord
         expect(   cord).to.have.property 'toString'
         expect(-> cord.toString()).to.not.throwError()
         expect(   cord.toString()).to.be.a 'string'
      
      it "toString()'s to a plain String, by default", ->
         c = new Cord 'foo'
         expect(c.toString()).to.be 'foo'
