// this p5 sketch is written in instance mode
// read more here: https://github.com/processing/p5.js/wiki/Global-and-instance-mode

function sketch(parent) { // we pass the sketch data from the parent
  return function( p ) { // p could be any variable name

    // p5 sketch goes here
    let time = 0;
    let sceneTime = 0;
    let scene = 0;

    let fishPos, whalePos, boatPos;
    let whaleX, whaleY;
    let whaleSize;

    let finalScene = false;
    let finalSceneStartTime;

    let x, y;

    p.setup = function() {
      let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      canvas.parent(parent.$el);
      p.noStroke();
      whaleSize = p.height / 2.5;
      p.textSize(whaleSize);
      p.textAlign(p.CENTER, p.CENTER);
    };

    p.draw = function() {

      // DRAW WAVES

      if (!finalScene) {

        for(let y = -25; y < p.height; y += 50) {
          let blueVal = p.map(y, -25, p.height, 230, 50);
          p.fill(50, 50, blueVal);

          p.beginShape();
          p.vertex(0, p.height);
          for (let x=0; x < p.width; x++) {
            let wavelength = 70;
            let k = 2 * Math.PI / wavelength;
            let v = 0.1 * y/p.height;
            let amplitude = 20;
            let verticalOffset = y + 10 * p.sin(0.1 * (y + 0.01 * time));
            p.vertex(x, amplitude * p.sin(k * (x + v * time)) + verticalOffset);
          }
          p.vertex(p.width, p.height);
          p.endShape();
        }

      }


      if (parent.data.scene == 2) {
        p.textSize(whaleSize);
        p.text(parent.data.whale, 0.8 * p.width, 0.8 * p.height);

        fishPos = p.map(sceneTime, 0, 2000, 0, 0.25 * p.width, true);

        p.textSize(whaleSize/2);
        p.text('🐠🐟', fishPos, 0.7 * p.height);
        p.text('🐟🐟', fishPos, 0.8 * p.height);
        p.text('🐟🐠', fishPos, 0.9 * p.height);

        whaleX = 0.8 * p.width;
        whaleY = 0.8 * p.height;

      }

      else if (parent.data.scene == 3) {

        p.textSize(whaleSize/2);
        p.text('🐠🐟', fishPos, 0.7 * p.height);
        p.text('🐟🐟', fishPos, 0.8 * p.height);
        p.text('🐟🐠', fishPos, 0.9 * p.height);

        whalePos = p.map(sceneTime, 0, 1200, 0.8 * p.width, fishPos, true);

        p.textSize(whaleSize);
        p.text(parent.data.whale, whalePos, 0.8 * p.height);

      }

      else if (parent.data.scene == 4) {

        p.textSize(whaleSize/2);
        p.text('🐠🐟', fishPos, 0.7 * p.height);
        p.text('🐡🐟', fishPos, 0.8 * p.height);
        p.text('🐟🐠', fishPos, 0.9 * p.height);

        whalePos = p.map(sceneTime, 0, 1200, 0.8 * p.width, fishPos, true);

        p.textSize(whaleSize);

        if (sceneTime < 1200) {
          p.text(parent.data.whale, whalePos, 0.8 * p.height);
        }

        else {
          // dizzy animation
          whaleX = whalePos + whaleSize/2 * p.sin(0.002 * sceneTime);
          whaleY = 0.8 * p.height + whaleSize/2 * p.sin(0.004 * sceneTime);

          p.text(parent.data.whale, whaleX, whaleY);

        }
      }

      else if (parent.data.scene == 5) {

        let prevWhaleY;
        if(!prevWhaleY) {prevWhaleY = whaleY;}
        // rise to the surface
        p.textSize(whaleSize);
        whaleY = prevWhaleY + p.map(sceneTime, 0, 1000, 0, -prevWhaleY + whaleSize/2, true);
        p.text(parent.data.whale, whaleX, whaleY);

        // People in a boat see you and wave.
        if (sceneTime > 500) {
          boatPos = p.map(sceneTime, 500, 1500, p.width + whaleSize, 0.8 * p.width, true);
          p.text('⛵', boatPos, whaleY);
        }


      }

      else if (parent.data.scene == 6) {

        // The whale song grows louder.

        let prevWhaleY;
        if(!prevWhaleY) {prevWhaleY = whaleY;}

        // if there was a boat, move it away
        if (boatPos) {

          boatPos = p.map(sceneTime, 0, 1000, 0.8 * p.width, 1.2 * p.width, true);
          p.text('⛵', boatPos, prevWhaleY);
        }

        x = p.map(sceneTime, 0, 1000, whaleX, 0.8 * p.width, true);
        y = p.map(sceneTime, 0, 1000, whaleY, 0.8 * p.height, true);

        p.textSize(whaleSize);
        p.text(parent.data.whale, x, y);

      }

      else if (parent.data.scene == 7) {

        x = p.map(sceneTime, 0, 1000, 0.8 * p.width, -0.2 * p.width, true);
        y = 0.8 * p.height;

        if (x < 0) {x += p.width;}
        p.textSize(whaleSize);
        p.text(parent.data.whale, x, y);
      }

      else if (parent.data.scene == 8) {

        x = p.map(sceneTime, 0, 1000, 0.8 * p.width, -0.2 * p.width, true);
        y = 0.8 * p.height;

        if (x < 0) {x += p.width;}
        p.textSize(whaleSize);
        p.text(parent.data.whale, x, y);
      }

     else if (parent.data.scene == 9) {

       // The sun has set. The ocean turns dark.

       let fade = p.map(sceneTime, 0, 2000, 0, 255, true);

       p.background(0, 0, 0, fade);

       p.textSize(whaleSize);
       p.text(parent.data.whale, 0.8 * p.width, 0.8 * p.height);

     }

     else if (parent.data.scene == 10) {

       // Another whale hears your whale song..

       let fade = p.map(sceneTime, 0, 1000, 255, 0, true);

       p.background(0, 0, 0, fade);

       p.textSize(whaleSize);
       p.text(parent.data.whale, 0.8 * p.width, 0.8 * p.height);

       if (sceneTime > 1000) {
         x = p.map(sceneTime, 1000, 2000, -0.2 * p.width, 0.2 * p.width, true);
         p.text(parent.data.whale, x, 0.8 * p.height);
       }

     }

     else if (parent.data.scene == 11) {

       // You approach the other whale

       x = p.map(sceneTime, 0, 1000, 0.8 * p.width, 0.3 * p.width, true);

       p.text(parent.data.whale, 0.2 * p.width, 0.8 * p.height);

       p.textSize(whaleSize);
       p.text(parent.data.whale, x, 0.8 * p.height);

       whaleX = x;
       whaleY = 0.8 * p.height;

       friendWhaleX = 0.2 * p.width;
       friendWhaleY = 0.8 * p.height;
     }

     else if (parent.data.scene == 12) {

       // The other whale approaches.

       x = p.map(sceneTime, 0, 1000, 0.2 * p.width, 0.7 * p.width, true);

       p.textSize(whaleSize);
       p.text(parent.data.whale, 0.8 * p.width, 0.8 * p.height);
       p.text(parent.data.whale, x, 0.8 * p.height);

       whaleX = 0.8 * p.width;
       whaleY = 0.8 * p.height;

       friendWhaleX = x;
       friendWhaleY = 0.8 * p.height;

     }

     else if (parent.data.scene == 13) {

       // Together, you frolick in the garden.

      let prevLeftWhaleX, prevLeftWhaleY, whaleOrder, whaleSpacing;
      if(!prevLeftWhaleX) {
        prevLeftWhaleX = p.min(whaleX, friendWhaleX);
        prevLeftWhaleY = p.min(whaleY, friendWhaleY);
        whaleSpacing = p.abs(whaleX - friendWhaleX);
      }

      if (sceneTime < 1000) {
        x = p.map(sceneTime, 0, 1000, prevLeftWhaleX, 0.5 * p.width, true);
        y = p.map(sceneTime, 0, 1000, prevLeftWhaleY, 0.5 * p.height, true);

        p.textSize(whaleSize);
        p.text(parent.data.whale, x - whaleSpacing/2, y);
        p.text(parent.data.whale, x + whaleSpacing/2, y);
      }

      else if (sceneTime < 2500) {
        let fade = p.map(sceneTime, 1000, 2000, 0, 255);
        p.background(0, 0, 0, fade);

        p.textSize(whaleSize);
        p.text(parent.data.whale, x - whaleSpacing/2, y);
        p.text(parent.data.whale, x + whaleSpacing/2, y);
      }

      else {
        finalScene = true;
        // underwater garden
        p.background(10, 10);
        p.fill(40, 200, 40);

        if(!finalSceneStartTime) {
          finalSceneStartTime = sceneTime;
        }


        for (let x0 = 0; x0 <= p.width; x0 = x0 + 30) {
          for (let y0 = 0; y0 <= p.height; y0 = y0 + 30) {
            // starting point of each circle depends on mouse position
            let xAngle = 3.5 * p.PI;
            let yAngle = 3.5 * p.PI;
            // and also varies based on the particle's location
            let angle = xAngle * (x0 / p.width) + yAngle * (y0 / p.height);

            // each particle moves in a circle
            let myX = x0 + 20 * p.cos(2 * p.PI * sceneTime/5000 + angle);
            let myY = y0 + 20 * p.sin(2 * p.PI * sceneTime/5000 + angle);

            p.ellipse(myX, myY, 10); // draw particle
          }
        }


        let x1 = x + 2 * whaleSize * p.sin(0.001 * (sceneTime - finalSceneStartTime));
        let y1 = y + whaleSize * p.sin(0.002 * (sceneTime - finalSceneStartTime));

        p.textSize(whaleSize);
        p.text(parent.data.whale, x1, y1);
        p.text(parent.data.whale, x1 + whaleSpacing, y1);

      }

     }

      time += p.deltaTime;
      sceneTime += p.deltaTime;
    }


    // this is a new function we've added to p5
    // it runs only if the data changes
    p.dataChanged = function(val, oldVal) {
      scene = val.scene;
      sceneTime = 0;
    };

  };
}