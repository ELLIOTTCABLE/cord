var cord = require('../lib/cord.js'),
     sys = require("sys");

var bob, theresa, jim, quilt;
bob = new cord.constructor({ elements : [
  new cord.constructor({ elements : ['Mr. '] }),
  new cord.constructor({   labels : ['name', 'entry'],
               elements : ['Bob Hanley'] }),
  ' ',
  new cord.constructor({   labels : ['score', 'entry'],
                         elements : ['(','2',')'] })
] }),
theresa = new cord.constructor({ elements : [
  'Ms. ',
  new cord.constructor({   labels : ['name', 'entry'],
                         elements : ['Theresa Clark'] }),
  ' ',
  new cord.constructor({   labels : ['score', 'entry'],
                         elements : ['(','8',')'] })
] }),
jim = new cord.constructor({ elements : [
  new cord.constructor({   labels : ['name', 'entry'],
                         elements : ['Jim Chu'] }),
  ' ',
  new cord.constructor({   labels : ['score', 'entry'],
                         elements : ['(','0',')'] })
] });

bob.label('important');
theresa.label('important');

quilt = {
  entry: {background: 'black'},
  name: {weight: 'bold'},
  score: {foreground: 'cyan-hi'},
  important: {underline: 'single'}
}

sys.puts( new cord.constructor({ elements : [bob, ', ', theresa, ', ', jim] })
            .toString(quilt) );
