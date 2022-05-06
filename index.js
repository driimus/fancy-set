export class FancySet extends Set {
  union(other) {
    return new FancySet([...this, ...other]);
  }

  intersection(other) {
    const intersection = new FancySet();

    for (const value of this.values())
      if (other.has(value)) intersection.add(value);

    return intersection;
  }

  difference(other) {
    const difference = new FancySet();

    for (const value of this.values())
      if (!other.has(value)) difference.add(value);

    return difference;
  }

  symmetricDifference(other) {
    return this.difference(other).update(new FancySet(other).difference(this));
  }

  isSubset(other) {
    return Array.from(this).every((value) => other.has(value));
  }

  isSuperset(other) {
    return Array.from(other).every((value) => this.has(value));
  }

  update(...values) {
    for (const value of values) this.add(value);
  }
}
