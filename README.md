# p5-vue-starter

[Try it out!](https://aatishb.com/p5-vue-starter/)

This is an example of how to use [Vue.js](https://vuejs.org/) to bind multiple [p5.js](https://p5js.org/) sketches together, so that they can share data with each other and with other components in a single document.

We can load in a component with the following command:

```
<p5 src="./sketch.js" :data="sourceData"></p5>
```

where `sketch.js` points to the p5 code, and the sketch is [bound](https://v1.vuejs.org/guide/syntax.html) to a `sourceData` object.

In this example, the `sourceData` object holds an x & y position and is defined in the [Vue instance](https://github.com/aatishb/p5-vue-starter/blob/master/vue-definitions.js#L48-L55). You can think of the Vue instance as the top layer, which holds the [single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth) for all shared, dynamic variables. You can inspect this data in the console by typing `app.sourceData.x` or `app.sourceData.y`.

The input sliders are bound to this data, meaning the slider & data variables are automatically kept in sync with each other, so that changes to one automatically affect the other. You can test this by opening the console and typing `app.sourceData.x = 100` and notice that the slider immediately updates.

Each p5 sketch is loaded using a custom `<p5>` Vue component. The sketches can access `sourceData` as a property. So, if we move the sliders, or update the value of sourceData.x, both p5 sketches will access the updated data.

This example has a top-down, one-way flow of information, where data flows from the top layer into the sketches. Ideally, the sketches should not modify the sourceData directly, in keeping with the principle of [one-way data flow](https://vuejs.org/v2/guide/components-props.html#One-Way-Data-Flow). If we need two-way communication (where the sketches can update the sourceData) the sketch component should emit an event that we listen for in the top layer to update the data.
