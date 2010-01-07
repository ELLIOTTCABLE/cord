// A `yarn` is a `String` that knows how to display itself stylishly.
return (function(){ var yarn;
  yarn = new(Object);
  
  yarn.errors = {
    unknownStyle: new(Error)("That is not a style of which I am aware!")
  };
  
  // Constructs a new `yarn`, given a style and some other `String`s or
  // `yarns`.
  // 
  // Accepts a style (or an array of styles), followed by one or more `String`
  // or `yarn` children. Order of children is preserved.
  yarn.constructor = function (styles, element1, element2) {
    this.elements = arguments = Array.prototype.slice.call(arguments);
    this.strip(); this.style(arguments.shift());
  };
  
  // Applies new styles
  yarn.style = function (styles) {
    for (style in styles) { if (styles.hasOwnProperty(style) &&
                                typeof styles[style] === 'string') {
      if (yarn.codes[style]                  === 'undefined' || 
          yarn.codes[style][ styles[style] ] === 'undefined') {
        throw(yarn.errors.unknownStyle) } }};
    
    this.styles = process.mixin(null, this.styles, styles);
  };
  
  // Clears all styles
  yarn.strip = function () { this.styles = new(Array) };
  
  // Where the magic happens. Converts a `yarn` into a plain `String`,
  // converting styles into ANSI codes.
  //--
  // TODO: Support output to HTML, for inserting into a document as debugging
  //       info.
  yarn.toString = function (containers) { var out;
    out = new(Array), containers = containers || new(Array);
    
    out.push(yarn.codes['csi'],
      applyCodes(this.styles).join(';'),
      yarn.codes['sgr']);
    
    containers.push(this);
    this.elements.forEach(function (element) {
      out.push( element.toString(containers) ) });
    containers.pop();
    
    out.push(yarn.codes['csi'],
      unapplyCodes(containers, this.styles).join(';'),
      yarn.codes['sgr']);
    
    return out.join('');
  };
  
  // Returns styling codes for a given set of styles.
  var applyCodes = function (styles) { var codes;
    codes = new(Array);
    
    for (style in styles) { if (styles.hasOwnProperty(style) &&
                                typeof styles[style] === 'string') {
      codes.push(yarn.codes[style][ styles[style] ]) }};
    
    return codes;
  };
  
  // Returns ‘unstyling’ codes (codes to revert the styling applied) for a
  // given set of styles.
  // 
  // If a normalization code for a style is available, this will use it; if
  // not, and a previous *overriding* style is availble in the given
  // containers, that will be re-applied.
  // 
  // If neither is available, *all* styling will be reset, and then *all*
  // styling from the parent containers will be applied.
  var unapplyCodes = function (containers, styles) { var codes;
    codes = new(Array);
    
    for (style in styles) { if (styles.hasOwnProperty(style) &&
                                typeof styles[style] === 'string') {
      previous = activeOf(containers, style);
      code = yarn.codes[style][ previous || 'normal' ];
      
      if (typeof code === 'undefined') { return fullReset(containers) };
      
      codes.push(code);
    }};
    
    return codes;
  };
  
  // Will return the codes to preform a full reset for a given set of
  // containing yarns. This will preform an SGR reset (`ESC[0m`) combined with
  // whatever codes necessary to apply all of the styles from all of the
  // containers.
  var fullReset = function (containers) { var styles;
    styles = new(Object);
    
    containers.slice()
      .map(function (container) { return container.styles })
      .forEach(function (styleSet) {
        styles = process.mixin(null, styles, styleSet)});
    
    // UHH: Will `ESC[0;1;2;3m` work? Or will the reset be ignored in
    //      favour of the other codes?
    return [0].concat(applyCodes(styles));
  };
  
  // Retreives the latest setting of a given style group from a stack of
  // containers.
  var activeOf = function (containers, style) { var value;
    for (var a = containers, l = a.length, i = 0, container = a[i];
             i < l; container = a[++i]) {
      if (typeof (value = container.styles[style]) !== 'undefined') {
        return value } };
    
    return null;
  };
  
  // ==================
  // = ANSI sequences =
  // ==================
  
  yarn.codes = { csi: "\033[", sgr: 'm', reset: 0
    
,   foreground: {
      'black'     : 30, 'black-hi'  : 90
,     'red'       : 31, 'red-hi'    : 91
,     'green'     : 32, 'green-hi'  : 92
,     'yellow'    : 33, 'yellow-hi' : 93
,     'blue'      : 34, 'blue-hi'   : 94
,     'magenta'   : 35, 'magenta-hi': 95
,     'cyan'      : 36, 'cyan-hi'   : 96
,     'white'     : 37, 'white-hi'  : 97
    }
    
,   background: {
      'black'     : 40, 'black-hi'  : 100
,     'red'       : 41, 'red-hi'    : 101
,     'green'     : 42, 'green-hi'  : 102
,     'yellow'    : 43, 'yellow-hi' : 103
,     'blue'      : 44, 'blue-hi'   : 104
,     'magenta'   : 45, 'magenta-hi': 105
,     'cyan'      : 46, 'cyan-hi'   : 106
,     'white'     : 47, 'white-hi'  : 107
    }
    
,   weight:    {normal: 22,   'bold': 1}
,   underline: {normal: 24,   'none': 24, 'single': 4}
,   blink:     {normal: 25,   'none': 25, 'slow': 5}
,   inverse:   {normal: 27,   'positive': 27, 'negative': 7}
  };
  
  yarn.constructor();
  
  return yarn;
})()
