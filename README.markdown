Yarn
====
A `yarn` is a sexy, styled JavaScript `String` that can print itself prettily.

This project was forked off of [Percival][]

Currently, this involves intelligently handling ANSI escape codes for printing
styled strings to terminals; eventually, this should also print identically to
HTML source that can be injected into a document.

  [Percival]: http://github.com/elliottcable/Percival "Pompous pretty-printer"

Usage
=====
`yarn`s are created with plain `String`s and other `yarn`s as child elements.
The stylings on nested `yarn`s intelligently stack when printed.

Let’s look at some examples. A basic `yarn` just consists of a plain `String`,
and some sort of styling:

    puts( yarn.beget({foreground: 'green'}, "Hello, world!") );

Not too difficult, right? That looks like this:
![Basic example of a `yarn`][basic]

Let’s move on to nesting `yarns`, for more advanced functionality:

    puts( yarn.beget({foreground: 'red'}, "Merry",
            yarn.beget({foreground: 'green'}, "Christmas"), "!") );

That, fairly obviously, creates a red `yarn`, containing another (green)
`yarn` as a child element. It looks like this: ![A nested `yarn`][nested]

Finally, let’s examine a fairly complex multiply-nested `yarn`:

    var y  = yarn.beget(), y2 = yarn.beget(),
        y3 = yarn.beget(), y4 = yarn.beget();
    
    y .elements.push('foo ', y2, ' grault');
    y2.elements.push('bar ', y3, ' corge');
    y3.elements.push('baz ', y4, ' quux');
    y4.elements.push(      'qux'      );
    
    y .style({ foreground: 'red'   });    y2.style({ underline: 'single' });
    y3.style({ foreground: 'green' });    y4.style({ underline: 'single' });
    
    process.stdio.write('['+y.toString()+']' + '\n');

Let’s peek at the end result, and then break it down:
![Quite a complex `yarn`][complex]

There’s several important things to notice about how that ended up getting
displayed:

- The underline effect continued throughout the sub-nested styled strings
- The end of the nested, underlined element did *not* cause the end of the
  underline, it was already in effect, and the end of the outer `yarn` with an
  underline had not yet been reached
- When the end of the green `yarn` had been reached, the red colour was
  restored (quite a difficult task, using ANSI codes, if I do say so myself!)

These are the problems with previous, simpler ANSI printers that I was trying
to solve with Yarn. I believe it achieves these goals wonderfully! ^_^

  [basic]: http://github.com/elliottcable/Yarn/blob/Master/examples/basic.png
  [nested]: http://github.com/elliottcable/Yarn/blob/Master/examples/nested.png
  [complex]: http://github.com/elliottcable/Yarn/blob/Master/examples/complex.png
