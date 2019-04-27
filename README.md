# p5-vue-starter

This is an example of how to use [Vue.js](https://vuejs.org/) to bind multiple [p5.js](https://p5js.org/) sketches together, so that they can share data with each other and with other components in a single document.

In this example, the `sourceData` object holds an x & y position and is stored in a Vue instance. You can think of this like the top layer, which is the [single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth) for all shared, dynamic variables. You can inspect this data in the console by typing `app.sourceData.x` or `app.sourceData.y`.

The input sliders are bound to this data, meaning the slider & data variables are automatically kept in sync with each other, so that changes to one automatically affect the other. You can test this by opening the console and typing `app.sourceData.x = 100` and notice that the slider immediately updates. Similarly, moving the first slider changes the value of `app.sourceData.x`.

Each p5 sketch is loaded using the same Vue component (with a different javascript source file). The sketches can access `sourceData` as a property. So, if we move the sliders, or update the value of sourceData.x, both p5 sketches will receive the updated variable.

The provide example has a top-down flow of information, where data flows from the top layer into the sketches. Ideally, the sketches should not modify the sourceData directly, in keeping with the principle of [one-way data flow](https://vuejs.org/v2/guide/components-props.html#One-Way-Data-Flow). If we need two-way communication where the sketches can also update the sourceData, the sketch component should emit an update event that we listen for in the top layer to update the data.