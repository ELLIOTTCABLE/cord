expect = require 'expect.js'
Cord = require '../'

it 'exists', ->
   expect(Cord).to.be.ok()
   expect(Cord).to.be.a 'function'
