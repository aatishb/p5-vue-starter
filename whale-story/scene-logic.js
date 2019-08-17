// Sets up the main Vue instance

var app = new Vue({
  el: '#story',

  // scene logic functions
  methods: {
    eatFish: function() {
      if(Math.random() <= 0.25)
        {
          this.sketch.scene = 4;
        }
      else {
          this.sketch.fishEaten += Math.round(Math.random()*50 + 50);
          this.sketch.scene = 3;
      }
    }
  },

  data: {

    // data that we want to access in html & the p5 sketch doesn't need to see


    // data that we want the p5 sketch to be able to access
    sketch: {
      scene: 0,
      fishEaten: 0,
      whale: '',
    }

  }

});
