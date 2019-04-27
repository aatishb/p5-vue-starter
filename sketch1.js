function sketch(data, holder) {
  return function( p ) { // p could be any variable name
    // p5 sketch goes here

    p.setup = function() {
      let canvas = p.createCanvas(400, 200);
      canvas.parent(holder);
      p.rectMode(p.CENTER);
    };

    p.draw = function() {
      p.background(0);
      p.fill(255);
      p.rect(data.x, data.y,50,50);
    };

  };
}

console.log('p5 script 1 loaded');