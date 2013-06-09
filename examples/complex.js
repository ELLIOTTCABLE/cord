var cord = require('../lib/cord.js'),
     sys = require("sys");

var c  = new cord.constructor, c2 = new cord.constructor,
    c3 = new cord.constructor, c4 = new cord.constructor;

c .elements.push('foo ', c2, ' grault');
c2.elements.push('bar ', c3, ' corge');
c3.elements.push('baz ', c4, ' quux');
c4.elements.push(      'qux'      );

c .style({ foreground: 'red'   });    c2.style({ underline: 'single' });
c3.style({ foreground: 'green' });    c4.style({ underline: 'single' });

sys.puts('['+c.toString()+']');
