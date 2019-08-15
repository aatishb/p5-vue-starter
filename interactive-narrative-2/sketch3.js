// this p5 sketch is written in instance mode
// read more here: https://github.com/processing/p5.js/wiki/Global-and-instance-mode

function sketch(parent) { // we pass the sketch data from the parent
  return function( p ) { // p could be any variable name

    p.setup = function() {
      let canvas = p.createCanvas(600, 600);
      canvas.parent(parent.$el);
      p.background('red');
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(200);
      p.text('🎏', p.width/2, p.height/2);
      p.noLoop();
    };

    p.draw = function() {
    };

    // this is a new function we've added to p5
    // it runs only if the data changes
    p.dataChanged = function(val, oldVal) {
      // console.log('data changed');
      // console.log('x: ', val.x, 'y: ', val.y);
    };

  };
}