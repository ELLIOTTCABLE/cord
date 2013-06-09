var cord = require('../lib/cord.js'),
     sys = require("sys");

sys.puts( new cord.constructor({ styles : {foreground: 'green'},
                     elements : ["Hello, world!"] }) );
