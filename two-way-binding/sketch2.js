// this p5 sketch is written in instance mode
// read more here: https://github.com/processing/p5.js/wiki/Global-and-instance-mode

function sketch(parent) { // we pass the sketch data from the parent
  return function( p ) { // p could be any variable name
    // p5 sketch goes here

    p.setup = function() {
      let canvas = p.createCanvas(400, 200);
      canvas.parent(parent.$el);
    };

    p.draw = function() {
      p.background(0);
      p.fill(255);
      p.ellipse(p.width - parent.data.x, p.height - parent.data.y, 50, 50);
      p.fill(0);
      p.text('Drag\nme!', p.width - parent.data.x - 12, p.height - parent.data.y - 5);
    };

    p.mouseDragged = function() {
      // check that input came from within this canvas
      if (0 < p.mouseX && p.mouseX < p.width && 0 < p.mouseY && p.mouseY < p.height)
      {
        parent.$emit('update:x', p.round(p.width - p.mouseX) );
        parent.$emit('update:y', p.round(p.height - p.mouseY) );
      }
    }

  };
}
