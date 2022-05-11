# fancy-set

Constrained mixin that applies set-theoretic operations to set classes.

# Installation

```sh
pnpm add fancy-set
```

# Usage

Fancified versions of the native set classes (`Set` and `WeakSet`) can be directly imported:

```ts
import { FancySet } from "fancy-set";

const myFancySet = new FancySet([1, 2, 3]);
const mySuperFancySet = new FancySet([1, 2, 3, 4, 5]);

mySuperFancySet.isSuperset(myFancySet); // true
```

## TypeScript support

This module ships its own type definitions, so TypeScript is supported out of the box.

## Custom sets

The `fancify` mixin can be applied to custom set implementations:

```ts
import { fancify } from "fancy-set";

class MyCustomSet extends Set {
  /** ... */
}
const MyFancyCustomSet = fancify(MyCustomSet);
```

Alternatively, custom set implementations can be derived from fancy sets:

```ts
import { fancify, FancySet } from "fancy-set";

class MyFancyCustomSet extends fancify(Set) {
  /** ... */
}
// or
class MyFancyCustomSet extends FancySet {
  /** ... */
}
```
