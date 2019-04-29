function sketch(parent) {
  return function( p ) { // p could be any variable name
    // p5 sketch goes here

    p.setup = function() {
      let canvas = p.createCanvas(400, 200);
      canvas.parent(parent.$el);
    };

    p.draw = function() {
      p.background(0);
      p.fill(255);
      p.ellipse(p.width - parent.data.x, p.height - parent.data.y,50,50);
      p.text('Drag me!', 0, 10);
    };

    p.mouseDragged = function() {
      if (0 < p.mouseX && p.mouseX < p.width && 0 < p.mouseY && p.mouseY < p.height)
      {
        parent.$emit('update:x', p.width - p.mouseX);
        parent.$emit('update:y', p.height - p.mouseY);
      }
    }

  };
}

console.log('p5 script 2 loaded');