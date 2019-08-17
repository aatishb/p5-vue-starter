# p5-vue-starter

This is a set of examples for how to use [Vue.js](https://vuejs.org/) and [p5.js](https://p5js.org/) together, so that you can build interactive documents that include p5.js sketches as components.

## Try it out
- [One way binding](https://aatishb.com/p5-vue-starter/one-way-binding/)
- [Two way binding](https://aatishb.com/p5-vue-starter/two-way-binding/)
- [Data Watching](https://aatishb.com/p5-vue-starter/data-watching/)
- [Interactive Narrative (Single Canvas in background)](https://aatishb.com/p5-vue-starter/interactive-narrative/)
- [Interactive Narrative (Multiple Canvases)](https://aatishb.com/p5-vue-starter/interactive-narrative-2/)
- [Interactive Narrative (Whale Story)](https://aatishb.com/p5-vue-starter/whale-story/)

## One Way Binding Between Parent & p5 Sketch

In [this example](https://aatishb.com/p5-vue-starter/one-way-binding/), the p5 sketch reacts to data in the top layer. The p5 sketches are loaded in a [custom component](https://vuejs.org/v2/guide/components.html), created using the following command:

```
<p5 src="./sketch.js" :data="data"></p5>
```

where `sketch.js` points to the file containing the p5 code (written in ['instance mode'](https://github.com/processing/p5.js/wiki/Global-and-instance-mode)), and the sketch is being passed a `data` object.

We can then access the data in the p5 sketch using the variable `parent.data`. Since this is an object, `parent.data.x` and `parent.data.y` will give you the individual x & y values.

**Tip:** Ideally, the sketches should not modify the `data` directly, in keeping with the principle of [one-way data flow](https://vuejs.org/v2/guide/components-props.html#One-Way-Data-Flow). Although this will technically work (i.e., if you modify the parent data in the child sketch, the other components will react accordingly), this is considered a [bad practice](https://antenna.io/blog/2018/01/state-management-in-vue-js) in Vue as it can easily lead to bugs.


## Two Way Binding Between Parent & p5 Sketch

Sometimes, we might want two-way communication between the p5 sketches and the parent, where the sketches can react to the data *and* update the data as well. Instead of directly modifying the data object from the sketch, a better practice is for the sketch component to emit an update event which asks the top layer to change the data. We listen for this event in the top layer, and respond by updating the data. This sounds complicated, but Vue makes this quite easy to do.

To set this up in Vue, we need to create the p5 component as follows:

```
<p5 src="./sketch.js" :data="data" v-bind.sync="data"></p5>
```

Where the [.sync](https://vuejs.org/v2/guide/components-custom-events.html#sync-Modifier) part tells the parent to listen to events from the p5 component and update the data accordingly.

Now, in the p5 code, if we want to change the data, we can emit an update event like this:

```
parent.$emit('update:x', 100);
```
which updates the value of `data.x` to 100. Here's [an example](https://aatishb.com/p5-vue-starter/two-way-binding/) of two way binding in action.

**Heads up:** Be careful with two way binding! It's easy to accidentally create a situation where your sketches are sending conflicting update messages. If you are using mouse/touch input, it's a good idea to check that the input is coming from within the canvas of your sketch before sending an update event, like in [this example](https://github.com/aatishb/p5-vue-starter/blob/master/two-way-binding/sketch1.js#L20-L21).

## No Binding Between Parent & p5 Sketch

If you want to create multiple *independent* p5 canvases on a single page, and you don't need to share data between components, then using a framework like Vue is probably overkill. Instead, take a look at [this tutorial](http://joemckaystudio.com/multisketches/). Howevever, you could do this here like this:

```
<p5 src="./sketch.js"></p5>
```
where we are loading the component but not passing it any data.


## Data Watching

OK, so you've bound a p5 sketch to some data using the method above. Now, say you want your sketch to run some code whenever the data changes. Normally, you might do this by checking for a change in the data on each frame of the draw() loop. This approach can be computationally expensive, because it requires making a comparison for each frame of your draw loop (or about 60 comparisons a second).

Vue provides a more efficient solution. By using a [watcher](https://vuejs.org/v2/guide/computed.html#Watchers), we can execute code *only* when the data changes. Watchers are useful when you want to perform expensive computations in response to changing data.

To do this, we've added a custom p5 function called `dataChanged()`. Any code placed in this function will only be executed when the data changes.

```
p.dataChanged = function(val, oldVal) {
  // any code here only runs when the data changes
};

```

Here's [an example](https://aatishb.com/p5-vue-starter/data-watching/) of this in action.

## Code

Code available on [Github](https://github.com/aatishb/p5-vue-starter)
