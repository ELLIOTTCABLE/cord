from.package('poopy.js').wait();

var yarn = from.relative('../lib/Yarn.js').wait(),
     sys = require("sys");

sys.puts( yarn.beget({ styles : {foreground: 'green'},
                     elements : ["Hello, world!"] }) );
