// this p5 sketch is written in instance mode
// read more here: https://github.com/processing/p5.js/wiki/Global-and-instance-mode

function sketch(parent) { // we pass the sketch data from the parent
  return function( p ) { // p could be any variable name

    // p5 sketch goes here
    let size = 0;

    p.setup = function() {
      let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      canvas.parent(parent.$el);
      p.background(0);
      p.stroke(255);
      p.fill(255);
      for (var i = 0; i < 100; i++) {
        p.point(p.random(p.width), p.random(p.height));
      }
      p.noStroke();
    };

    p.draw = function() {
      if (parent.data.scene == 3) {

        p.fill('blue');
        p.circle(p.width/2, p.height/2, size);
        size += 1;

      } else if (parent.data.scene == 4) {

        p.fill('yellow');
        p.circle(p.width/2, p.height/2, size);
        size += 1;

      }
    };

    // this is a new function we've added to p5
    // it runs only if the data changes
    p.dataChanged = function(val, oldVal) {
      // console.log('data changed');
      // console.log('x: ', val.x, 'y: ', val.y);
    };

  };
}