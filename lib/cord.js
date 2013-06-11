// A `cord` is a `String` that knows how to display itself stylishly.
return module.exports = (function(){ var
  cord = new(Object),
  
  _ = require('lodash');
  
  // Constructs a new `cord`, given styles, labels, and some other `String`s
  // or `cord`s.
  cord.constructor = function (blueprint) { blueprint = blueprint || new Object
    this.styles   = blueprint.styles   || new(Object);
    this.labels   = blueprint.labels   || new(Array);
    this.elements = blueprint.elements || new(Array);
  };
  cord.constructor.prototype = cord;
  
  // Applies new styles
  cord.style = function (styles) {
    this.styles = _.defaults(styles, this.styles); return this; };
  
  // Applies new labels
  cord.label = function () {
    this.labels = this.labels.concat(Array.prototype.slice.apply(arguments));
    return this; };
  
  // Return full styling, including all specific styles *and* quilting on
  // labels
  cord.styling = function (quilt) { var styles;
    styles = new(Object);
    
    this.labels.forEach(function (label) {
      if (typeof quilt[label] !== 'undefined') {
        styles = _.defaults(styles, quilt[label]) } });
    
    return _.defaults(this.styles, styles);
  };
  
  // Clears all styles and labels
  cord.strip = function () {
    this.styles = new(Object), this.labels = new(Array) };
  
  // Where the magic happens. Converts a `cord` into a plain `String`,
  // converting styles into ANSI codes.
  //--
  // TODO: Support output to HTML, for inserting into a document as debugging
  //       info.
  cord.toString = function (quilt, containers) { var out, codes;
           out = new(Array),
         quilt = quilt || new(Object),
    containers = containers || new(Array);
    
    if ((codes = this.applyCodes(quilt)).length > 0) {
      out.push(cord.codes['csi'], codes.join(';'), cord.codes['sgr']) };
    
    containers.push(this);
    this.elements.forEach(function (element) {
      out.push( cord.isPrototypeOf(element) ?
        element.toString(quilt, containers) : element.toString() ) });
    containers.pop();
    
    if ((codes = this.unapplyCodes(containers, quilt)).length > 0) {
      out.push(cord.codes['csi'], codes.join(';'), cord.codes['sgr']) };
    
    return out.join('');
  };
  
  // Returns styling codes for a given set of styles.
  cord.applyCodes = function (quilt) { var codes, styles;
    codes = new(Array);
    
    styles = this.styling(quilt);
    for (style in styles) { if (styles.hasOwnProperty(style) &&
                                typeof styles[style] === 'string') {
      codes.push(cord.codes[style][ styles[style] ]) }};
    
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
  cord.unapplyCodes = function (containers, quilt) { var codes, styles;
    codes = new(Array);
    
    styles = this.styling(quilt);
    for (style in styles) { if (styles.hasOwnProperty(style) &&
                                typeof styles[style] === 'string') {
      previous = activeOf(containers, style, quilt);
      code = cord.codes[style][ previous || 'normal' ];
      
      if (typeof code === 'undefined') { return fullReset(containers, quilt) };
      
      codes.push(code);
    }};
    
    return codes;
  };
  
  // Will return the codes to preform a full reset for a given set of
  // containing `cord`s. This will preform an SGR reset (`ESC[0m`) combined with
  // whatever codes necessary to apply all of the styles from all of the
  // containers.
  var fullReset = function (containers, quilt) { var codes;
    codes = new(Array);
    
    containers.forEach(function (container) {
      codes = codes.concat(container.applyCodes(quilt)) });
    
    // UHH: Will `ESC[0;1;2;3m` work? Or will the reset be ignored in
    //      favour of the other codes?
    return [0].concat(codes);
  };
  
  // Retreives the latest setting of a given style group from a stack of
  // containers.
  var activeOf = function (containers, style, quilt) { var value;
    for (var a = containers, l = a.length, i = 0, container = a[i];
             i < l; container = a[++i]) {
      if (typeof (value = container.styling(quilt)[style]) !== 'undefined') {
        return value } };
    
    return null;
  };
  
  // ======================================
  // = Convenience methods for `elements` =
  // ======================================
  
  cord.push = function () {
    return Array.prototype.push.apply(this.elements, arguments) };
  
  cord.pop = function () {
    return Array.prototype.pop.apply(this.elements, arguments) };
  
  cord.shift = function () {
    return Array.prototype.shift.apply(this.elements, arguments) };
  
  cord.unshift = function () {
    return Array.prototype.unshift.apply(this.elements, arguments) };
  
  // ==================
  // = ANSI sequences =
  // ==================
  
  cord.codes = { csi: "\033[", sgr: 'm', reset: 0
    
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
  
  cord.constructor({});
  
  return cord;
})()
