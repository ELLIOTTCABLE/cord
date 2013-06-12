return module.exports = (function(){
   var Cord, cord
   
   // TODO: `constructify()` this
   Cord = function(content){
      this.content = content || '' }
   
   cord = Cord.prototype
   cord.constructor = Cord
   
   cord.toString = function(){
      return this.content }
   
   return Cord })()
