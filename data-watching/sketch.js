// this p5 sketch is written in instance mode
// read more here: https://github.com/processing/p5.js/wiki/Global-and-instance-mode

function sketch(parent) { // we pass the sketch data from the parent
  return function( p ) { // p could be any variable name

    // p5 sketch goes here

    p.setup = function() {
      let canvas = p.createCanvas(400, 200);
      canvas.parent(parent.$el);
      p.rectMode(p.CENTER);
      p.fill(255);
      p.background(0);
      p.rect(parent.data.x, parent.data.y, 50, 50);
      p.noLoop();
    };

    p.draw = function() {
    };

    // this is a new function we've added to p5
    // it runs only if the data changes
    p.dataChanged = function(val, oldVal) {
      p.background(0);
      p.rect(val.x, val.y, 50, 50);
    };

  };
}