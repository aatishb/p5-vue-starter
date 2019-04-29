// this data object stores variables that we want to share between components
// this is not a good place to store data that doesn't need to be shared
let data = {
  x: 200,
  y: 100
}

// Defines a Vue <p5> Component

Vue.component('p5', {

  template: '<div></div>',

  props: ['src','data'],

  methods: {
    // loadScript from https://stackoverflow.com/a/950146
    // loads the p5 javscript code from a file
    loadScript: function (url, callback)
    {
      // Adding the script tag to the head as suggested before
      var head = document.head;
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;

      // Then bind the event to the callback function.
      // There are several events for cross browser compatibility.
      script.onreadystatechange = callback;
      script.onload = callback;

      // Fire the loading
      head.appendChild(script);
    },

    loadSketch: function() {
      let myp5 = new p5(sketch(this));
    }
  },

  mounted() {
    this.loadScript(this.src, this.loadSketch);
  }

})

// Sets up the main Vue instance

var app = new Vue({
  el: '#root',

  data: {data}

});
