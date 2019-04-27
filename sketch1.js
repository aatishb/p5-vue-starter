// p5 sketch goes here
function sketch(local, holder) {
  return function( p ) { // p could be any variable name
    p.setup = function() {
      let canvas = p.createCanvas(400, 200);
      canvas.parent(holder);
    };

    p.draw = function() {
      p.background(0);
      p.fill(255);
      p.rect(local.x, local.y,50,50);
    };
  };
}

console.log('p5 script 1 loaded');