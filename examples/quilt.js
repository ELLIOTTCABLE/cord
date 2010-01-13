from.package('poopy.js').wait();

var yarn = from.relative('../lib/Yarn.js').wait(),
     sys = require("sys");

var bob, theresa, jim, quilt;
bob = yarn.beget({ elements : [
  yarn.beget({ elements : ['Mr. '] }),
  yarn.beget({   labels : ['name', 'entry'],
               elements : ['Bob Hanley'] }),
  ' ',
  yarn.beget({   labels : ['score', 'entry'],
               elements : ['(','2',')'] })
] }),
theresa = yarn.beget({ elements : [
  'Ms. ',
  yarn.beget({   labels : ['name', 'entry'],
               elements : ['Theresa Clark'] }),
  ' ',
  yarn.beget({   labels : ['score', 'entry'],
               elements : ['(','8',')'] })
] }),
jim = yarn.beget({ elements : [
  yarn.beget({   labels : ['name', 'entry'],
               elements : ['Jim Chu'] }),
  ' ',
  yarn.beget({   labels : ['score', 'entry'],
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

sys.puts( yarn.beget({ elements : [bob, ', ', theresa, ', ', jim] })
            .toString(quilt) );
