import { faker } from "@faker-js/faker";
import assert from "node:assert";
import test from "node:test";
import { FancySet } from "./index.js";

test("union", async (t) => {
  /**
   * @returns {number[]}
   */
  const range = (start, stop, step = 1) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );

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

test("isSubset", async (t) => {
  await t.test("returns true if the other set has all the elements", () => {
    const elements = Array.from({ length: 10 }, () => faker.lorem.word());

    const subset = new FancySet(elements.slice(0, 5));

    assert.ok(subset.isSubset(new Set(elements)));
  });

  await t.test("returns true if the sets are equivalent", () => {
    const elements = Array.from({ length: 10 }, () => faker.lorem.word());

    assert.ok(new FancySet(elements).isSubset(new Set(elements)));
  });

  await t.test(
    "returns false if some values aren't included in the compared set",
    () => {
      const elements = Array.from({ length: 10 }, () => faker.lorem.word());

      const set = new FancySet(elements.slice(0, 5));
      set.add(faker.lorem.word());

      assert.equal(set.isSubset(new Set(elements)), false);
    }
  );
});

test("isSuperset", async (t) => {
  await t.test("returns true if the other set has all the elements", () => {
    const elements = Array.from({ length: 10 }, () => faker.lorem.word());

    const subset = new Set(elements);

    assert.ok(new FancySet(elements).isSuperset(subset));
  });

  await t.test("returns true if the sets are equivalent", () => {
    const elements = Array.from({ length: 10 }, () => faker.lorem.word());

    assert.ok(new FancySet(elements).isSuperset(new Set(elements)));
  });

  await t.test(
    "returns false if some values are exclusive to the compared set",
    () => {
      const elements = Array.from({ length: 10 }, () => faker.lorem.word());

      const set = new Set(elements);
      set.add(faker.lorem.word());

      assert.equal(new FancySet(elements).isSuperset(set), false);
    }
  );
});

test("update should allow inserting multiple values at once", () => {
  const elements = Array.from({ length: 10 }, () => faker.lorem.word());
  const set = new FancySet([faker.lorem.word()]);

  set.update(...elements);

  assert.equal(set.size, elements.length + 1);
});