cord
====
A `cord` is a sexy, styled JavaScript `String` that can print itself prettily.

This project was forked off of [percival][].

Currently, this involves intelligently handling ANSI escape codes for printing
styled strings to terminals; eventually, this should also print identically to
HTML source that can be injected into a document.

  [percival]: http://github.com/elliottcable/percival "Pompous pretty-printer"

Usage
=====
`cord`s are created with plain `String`s and other `cord`s as child elements.
The stylings on nested `cord`s intelligently stack when printed.

Let’s look at some examples. A basic `cord` just consists of a plain `String`,
and some sort of styling:

    sys.puts( cord.beget({ styles : {foreground: 'green'},
                         elements : ["Hello, world!"] }) );
![Basic example of a `cord`][basic]

Not too difficult, right? Let’s move on to nesting `cord`, for more advanced
functionality:

    sys.puts( cord.beget({ styles : {foreground: 'red'},
                         elements : ["Merry ",
                                     cord.beget({ styles : {foreground: 'green'},
                                                elements : ["Christmas"] }),
                                     "!"] }) );
![A nested `cord`][nested]

That, fairly obviously, creates a red `cord`, containing another (green)
`cord` as a child element. Finally, let’s examine a fairly complex multiply-
nested `cord`:

    var c  = cord.beget(), c2 = cord.beget(),
        c3 = cord.beget(), c4 = cord.beget();
    
    c .elements.push('foo ', c2, ' grault');
    c2.elements.push('bar ', c3, ' corge');
    c3.elements.push('baz ', c4, ' quux');
    c4.elements.push(      'qux'      );
    
    c .style({ foreground: 'red'   });    c2.style({ underline: 'single' });
    c3.style({ foreground: 'green' });    c4.style({ underline: 'single' });
    
    sys.puts('['+c.toString()+']');
![Quite a complex `cord`][complex]

There’s several important things to notice about how that ended up getting
displayed:

- The underline effect continued throughout the sub-nested styled strings
- The end of the nested, underlined element did *not* cause the end of the
  underline, it was already in effect, and the end of the outer `cord` with an
  underline had not yet been reached
- When the end of the green `cord` had been reached, the red colour was
  restored (quite a difficult task, using ANSI codes, if I do say so myself!)
- At the culmination of the entire `cord`, no wayward styles are left over
  (i.e. the closing bracket is plain white, with no styling)… this is
  important, as a stray code could screw up the display of everything else in
  the user’s Terminal

These are the problems with previous, simpler ANSI printers that I was trying
to solve with cord. I believe it achieves these goals wonderfully! ^_^

  [basic]: http://github.com/elliottcable/cord/raw/Master/examples/basic.png
  [nested]: http://github.com/elliottcable/cord/raw/Master/examples/nested.png
  [complex]: http://github.com/elliottcable/cord/raw/Master/examples/complex.png
