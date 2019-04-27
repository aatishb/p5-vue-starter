// defining p5 component
Vue.component('p5', {

  template: '<div ref="holder"></div>',

  props: ['src','data'],

  methods: {
    // loadScript from https://stackoverflow.com/a/950146
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
      let local = this.data;
      let holder = this.$refs.holder;
      let myp5 = new p5(sketch(local, holder));
    }
  },

  mounted() {

    //let local = this;
    this.loadScript(this.src, this.loadSketch);


  }

})

var app = new Vue({
  el: '#root',

  data: {
    sourceData: {
      x: 10,
      y: 10
    }
  }

});
