import { faker } from "@faker-js/faker";
import assert from "node:assert";
import test from "node:test";
import { FancySet } from "./index.js";

/**
 * @returns {number[]}
 */
const range = (start, stop, step = 1) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

test("union", async (t) => {
  await t.test("returns a fancy set with values found in either set", () => {
    const setA = new FancySet(range(0, 10));
    const setB = new Set(range(5, 15));

    const union = setA.union(setB);

    assert.deepStrictEqual(union, new FancySet(range(0, 15)));
  });
});

test("intersection", async (t) => {
  await t.test(
    "returns a fancy set exclusively containing values present in both sets",
    () => {
      const commonValues = [1, 2, 3];
      const setA = new FancySet([
        ...commonValues,
        ...Array.from({ length: 5 }, () =>
          faker.datatype.number({ min: 10, max: 20 })
        ),
      ]);
      const setB = new Set([
        ...commonValues,
        ...Array.from({ length: 5 }, () =>
          faker.datatype.number({ min: 50, max: 100 })
        ),
      ]);

      const intersection = setA.intersection(setB);

      assert.deepStrictEqual(intersection, new FancySet(commonValues));
    }
  );
});

test("difference", async (t) => {
  await t.test(
    "returns a set containing elements which are not in the other",
    () => {
      const commonValues = [1, 2, 3];
      const exclusiveValues = range(5, 10);

      const setA = new FancySet([...commonValues, ...exclusiveValues]);

      assert.deepStrictEqual(
        setA.difference(new Set(commonValues)),
        new FancySet(exclusiveValues)
      );
    }
  );
});

test("symmetricDifference", async (t) => {
  await t.test(
    "return a fancy set with elements in either the set or other but not both",
    () => {
      const commonWords = faker.helpers.uniqueArray(
        () => faker.unique(faker.lorem.word),
        5
      );
      const wordsExclusiveToA = faker.helpers.uniqueArray(
        () => faker.unique(faker.lorem.word),
        5
      );
      const wordsExclusiveToB = faker.helpers.uniqueArray(
        () => faker.unique(faker.lorem.word),
        5
      );
      const setA = new FancySet([...wordsExclusiveToA, ...commonWords]);
      const setB = new Set([...wordsExclusiveToB, ...commonWords]);

      assert.deepStrictEqual(
        setA.symmetricDifference(setB),
        new FancySet([...wordsExclusiveToA, ...wordsExclusiveToB])
      );
    }
  );

  await t.test("should be commutative", () => {
    const setA = new FancySet(
      faker.helpers.uniqueArray(faker.datatype.bigInt, 10)
    );
    const setB = new FancySet(
      faker.helpers.uniqueArray(faker.datatype.bigInt, 10)
    );

    assert.deepStrictEqual(
      setA.symmetricDifference(setB),
      setB.symmetricDifference(setA)
    );
  });
});

test("isSubset", async (t) => {
  await t.test("returns true if the sets are equivalent", () => {
    assert.ok(new FancySet([]).equals(new Set([])));
    assert.ok(new FancySet(range(1, 10)).equals(new Set(range(1, 10))));
  });

  await t.test(
    "returns false if some values are exclusive to one of the sets",
    () => {
      const setA = new FancySet(range(1, 10));
      const setB = setA.clone().add(11);

      assert.equal(setA.equals(setB), false);
    }
  );
});

test("isSubset", async (t) => {
  await t.test("returns true if the other set has all the elements", () => {
    const elements = Array.from({ length: 10 }, () => faker.datatype.number());

    const subset = new FancySet(elements.slice(0, 5));

    assert.ok(subset.isSubset(new Set(elements)));
  });

  await t.test("returns true if the sets are equivalent", () => {
    const elements = Array.from({ length: 10 }, () => faker.datatype.number());

    assert.ok(new FancySet(elements).isSubset(new Set(elements)));
  });

  await t.test(
    "returns false if some values aren't included in the compared set",
    () => {
      const elements = Array.from({ length: 10 }, (_, i) =>
        faker.lorem.word(i)
      );

      const set = new FancySet(elements.slice(0, 5));
      set.add(faker.datatype.number());

      assert.equal(set.isSubset(new Set(elements)), false);
    }
  );
});

test("isSuperset", async (t) => {
  await t.test("returns true if the other set has all the elements", () => {
    const elements = Array.from({ length: 10 }, () => faker.datatype.number());

    const subset = new Set(elements);

    assert.ok(new FancySet(elements).isSuperset(subset));
  });

  await t.test("returns true if the sets are equivalent", () => {
    const elements = Array.from({ length: 10 }, () => faker.datatype.number());

    assert.ok(new FancySet(elements).isSuperset(new Set(elements)));
  });

  await t.test(
    "returns false if some values are exclusive to the compared set",
    () => {
      const elements = Array.from({ length: 10 }, () =>
        faker.datatype.number()
      );

      const set = new Set(elements);
      set.add(faker.datatype.number());

      assert.equal(new FancySet(elements).isSuperset(set), false);
    }
  );
});

test("isDisjoint", async (t) => {
  await t.test("returns true if the sets have no elements in common", () => {
    const setA = new FancySet(range(1, 10));
    const setB = new FancySet(range(11, 20));

    assert.ok(setA.isDisjoint(setB));
  });

  await t.test("returns true if both sets are empty", () => {
    assert.ok(new FancySet([]).isDisjoint(new Set([])));
  });

  await t.test("returns false if some entries are present in both sets", () => {
    const elements = range(1, 10);

    assert.equal(
      new FancySet(elements).isDisjoint(new Set(range(10, 15))),
      false
    );
  });
});

test("update should allow inserting multiple values at once", () => {
  const elements = range(1, 10);
  const set = new FancySet([0]);

  set.update(...elements);

  assert.equal(set.size, elements.length + 1);
});

test("intersectionUpdate should only keep elements found in all sets", () => {
  const commonValues = [0];
  const set = new FancySet([...commonValues, range(-1, -3)]);

  set.intersectionUpdate(
    new Set([...commonValues, range(1, 3)]),
    new Set([...commonValues, range(4, 6)])
  );

  assert.deepStrictEqual(set, new FancySet(commonValues));
});

test("differenceUpdate should remove all elements found in other sets", () => {
  const entries = faker.helpers.uniqueArray(
    () => faker.unique(faker.lorem.word),
    10
  );
  const set = new FancySet(entries);

  set.differenceUpdate(new Set(entries.slice(2, 6)), new Set(entries.slice(6)));

  assert.deepStrictEqual(set, new FancySet(entries.slice(0, 2)));
});

test("symmetricDifferenceUpdate should keep only elements found in either set, but not in both", () => {
  const entries = faker.helpers.uniqueArray(
    () => faker.unique(faker.lorem.word),
    10
  );
  const set = new FancySet(entries.slice(0, 6));

  set.symmetricDifferenceUpdate(new Set(entries.slice(5)));

  assert.deepStrictEqual(
    set,
    new FancySet([...entries.slice(0, 5), ...entries.slice(6)])
  );
});

test("clone should return a copy of the set", () => {
  const originalSet = new FancySet(
    faker.helpers.uniqueArray(faker.lorem.slug, 5)
  );
  const clone = originalSet.clone();

  clone.add("only found in clone");

  assert.equal(clone.has("only found in clone"), true);
  assert.equal(originalSet.has("only found in clone"), false);
});
