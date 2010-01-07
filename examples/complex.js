from.absolute('/Users/elliottcable/Code/poopy.js/lib/poopy.js').wait();

var yarn = from.relative('../lib/Yarn.js').wait(),
     sys = require("sys");

var y  = yarn.beget(), y2 = yarn.beget(),
    y3 = yarn.beget(), y4 = yarn.beget();

y .elements.push('foo ', y2, ' grault');
y2.elements.push('bar ', y3, ' corge');
y3.elements.push('baz ', y4, ' quux');
y4.elements.push(      'qux'      );

y .style({ foreground: 'red'   });    y2.style({ underline: 'single' });
y3.style({ foreground: 'green' });    y4.style({ underline: 'single' });

sys.puts('['+y.toString()+']');
