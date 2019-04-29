# p5-vue-starter

This is an example of how to use [Vue.js](https://vuejs.org/) to bind multiple [p5.js](https://p5js.org/) sketches together, so that they can share data with each other and with other components in a single document.

## Try it out
- [One way binding](https://aatishb.com/p5-vue-starter/one-way-binding/)
- [Two way binding](https://aatishb.com/p5-vue-starter/two-way-binding/)

In this example, the `data` object holds an x & y position and is defined in the [Vue instance](https://github.com/aatishb/p5-vue-starter/blob/master/vue-definitions.js). You can think of the Vue instance as the 'parent' or the top layer, and it holds the [single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth) for all shared, dynamic variables. You can inspect this data in the console by typing `app.data.x` or `app.data.y`.

The input sliders are bound to this data, meaning the slider & data variables are automatically kept in sync with each other, so that changes to one automatically affect the other. You can test this by opening the console and typing `app.data.x = 100` and notice that the slider immediately updates.

Each p5 sketch is loaded using a custom `<p5>` Vue component. The sketches can access `data` as a property. So, if we move the sliders, or update the value of `app.data.x`, both p5 sketches will access the updated data.

## One Way Binding Between Parent & p5 Sketch

In [this example](https://aatishb.com/p5-vue-starter/one-way-binding/), the p5 sketch reacts to data in the top layer. The p5 sketches are loaded in a custom component, created using the following command:

```
<p5 src="./sketch.js" :data="data"></p5>
```

where `sketch.js` points to the file containing the p5 code (written in ['instance mode'](https://github.com/processing/p5.js/wiki/Global-and-instance-mode)), and the sketch is being passed a `data` object.

We can then access the data in the p5 sketch using the variable `parent.data`. Since this is an object, `parent.data.x` and `parent.data.y` will give you the individual x & y values.

Ideally, the sketches should not modify the `data` directly, in keeping with the principle of [one-way data flow](https://vuejs.org/v2/guide/components-props.html#One-Way-Data-Flow). While it will technically work (i.e. if youmodify the inherited data in the sketch, the other components will react accordingly), this is considered an [anti-pattern in Vue](https://antenna.io/blog/2018/01/state-management-in-vue-js) as it can easily lead to bugs that are hard to catch.

## Two Way Binding Between Parent & p5 Sketch

Sometimes, we might want two-way communication between the p5 sketches and the parent, where the sketches can react to the data *and* update the data as well. Instead of directly modifying the data object from the sketch, a better practice is for the sketch component to emit an update event which asks the top layer to change the data. We listen for this event in the top layer, and respond by updating the data.

To set this up, all we need to do is create the p5 component as follows:

```
<p5 src="./sketch.js" :data="data" v-bind.sync="data"></p5>
```

Now, in the p5 code, if we want to change the data, we can emit an update event as follows:

```
parent.$emit('update:x', 10);
```
which updates the value of `data.x` to 10. Here's [an example](https://aatishb.com/p5-vue-starter/two-way-binding/) of two way binding in action.

## No Binding Between Parent & p5 Sketch

If you want to create multiple *independent* p5 canvases on a single page, and you don't need to share data between components, then using a framework like Vue is probably overkill. Instead, take a look at [this tutorial](http://joemckaystudio.com/multisketches/).

## Code

Code available on [Github](https://github.com/aatishb/p5-vue-starter)
