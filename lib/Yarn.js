// A `yarn` is a `String` that knows how to display itself stylishly.
return (function(){ var yarn, csi;
  yarn = new(Object);
  
  yarn.errors = {
    unknownStyle: new(Error)("That is an invalid style")
  };
  
  // Constructs a new `yarn`, given a style and some other `String`s or
  // `yarns`.
  // 
  // Accepts a style (or an array of styles), followed by one or more `String`
  // or `yarn` children. Order of children is preserved.
  yarn.constructor = function (styles, element1, element2) {
    arguments = Array.prototype.slice.call(arguments);
    styles = arguments.shift() || new(Array);
    
    this.elements = arguments;
    this.strip();
    styles.forEach(function (style) { this.style(style) });
  };
  
  // Applies a new style
  yarn.style = function (style) {
    if (yarn.ansiCodes[style] === 'undefined') {
      throw(yarn.errors.unknownStyle) };
    
    this.styles.push(style);
  };
  
  // Clears all styles
  yarn.strip = function () { this.styles = new(Array) };
  
  // Where the magic happens. Converts a `yarn` into a plain `String`,
  // converting styles into ANSI codes.
  //--
  // TODO: Support output to HTML, for inserting into a document as debugging
  //       info.
  yarn.toString = function (containing) { var used, out;
    out = new(Array), used = new(Array), containing = containing || new(Array);
    
    this.styles.forEach(function (style) { var code;
      if (!containing.some(function (container) {
            return(container.styles.indexOf(style) !== -1) } )) {
        used.push(style);
        code = yarn.ansiCodes[style];
        out.push(csi + (Array.isArray(code) ? code[0] : code) + sgr);
    } });
    
    containing.push(this);
    this.elements.forEach(function (element) {
      out.push(element.toString(containing));
    });
    containing.pop();
    
    used.forEach(function (style) { var code;
      code = yarn.ansiCodes[style];
      out.push(csi + (Array.isArray(code) ? code[1] : yarn.ansiCodes['reset']) + sgr);
    });
    
    return out.join('');
  };
  
  csi = "\033[";
  sgr = 'm';
  yarn.ansiCodes = { 'reset': 0,
    'bold':          [1, 22],
    'underline':     [4, 24],
    'blink':         [5, 25],
    'negative':      [7, 27],
    'inverse':       [7, 27],
    
    'black'     : 30, 'bg-black'     : 40,
    'black-hi'  : 90, 'bg-black-hi'  : 100,
    'red'       : 31, 'bg-red'       : 41,
    'red-hi'    : 91, 'bg-red-hi'    : 101,
    'green'     : 32, 'bg-green'     : 42,
    'green-hi'  : 92, 'bg-green-hi'  : 102,
    'yellow'    : 33, 'bg-yellow'    : 43,
    'yellow-hi' : 93, 'bg-yellow-hi' : 103,
    'blue'      : 34, 'bg-blue'      : 44,
    'blue-hi'   : 94, 'bg-blue-hi'   : 104,
    'magenta'   : 35, 'bg-magenta'   : 45,
    'magenta-hi': 95, 'bg-magenta-hi': 105,
    'cyan'      : 36, 'bg-cyan'      : 46,
    'cyan-hi'   : 96, 'bg-cyan-hi'   : 106,
    'white'     : 37, 'bg-white'     : 47,
    'white-hi'  : 97, 'bg-white-hi'  : 107
  };
  
  yarn.constructor();
  
  return yarn;
})()
