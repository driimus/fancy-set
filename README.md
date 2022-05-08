# fancy-sets

Barebones extension of the native `Set` class with utilities aimed at supporting set-theoretic operations.

# Installation

```sh
pnpm add fancy-sets
```

# Usage

```ts
import { FancySet } from "fancy-sets";

const myFancySet = new FancySet([1, 2, 3]);
const mySuperFancySet = new FancySet([1, 2, 3, 4, 5]);

mySuperFancySet.isSuperset(myFancyset); // true
```

## TypeScript support

This module ships its own type definitions, so TypeScript is supported out of the box.

## Custom sets

The `fancify` mix-in can be used to extend custom set implementations.

```ts
import { fancify } from "fancy-sets";

class MyCustomSet extends Set {
  // ...custom implementation goes here
}

const MyFancyCustomSet = fancify(MyCustomSet);
```
