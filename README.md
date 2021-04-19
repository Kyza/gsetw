# gsetw

The fastest object node waiter possible.

## Beware

This function was created for a *very* specific use case--intercepting and patching the `push` function of a `webpackJsonp` object--and is therefore fragile and has many caveats.

Only use this if you *absolutely need* the fastest response possible.

## Usage

```js
const gsetw = require("gsetw");

let obj = {};
gsetw(obj, "test.0.bruh", true).then(node => {
	// gsetw(..., ..., true), so it prints before the node on the object is set.
	console.log(obj.test); // undefined
});

setTimeout(() => {
	// Setting the node on the object like this will trigger the waiter.
	obj.test = [{ bruh:"fhdsk" }];
}, 1e3);
```

## Parameters

### `gsetw(object, nodePath, before = false)`

- `object` - `object` - The parent object of the node you want to wait for.
- `nodePath` - `string` - `"the.path.to.the.node"`. Can be any depth, though the deeper it is the more fragile it is.
- `before` - `boolean` - Whether to resolve the promise before or after the object is set.
