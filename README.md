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

This module ships its own type definitions.
