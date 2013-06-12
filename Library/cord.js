return module.exports = (function(){
   var Cord, cord
   
   // TODO: `constructify()` this
   Cord = function Cord(content){
      this.content = content || '' }
   
   cord = Cord.prototype
   cord.constructor = Cord
   
   cord.valueOf =
   cord.toString = function(){
      return this.content.toString() }
   
   return Cord })()
