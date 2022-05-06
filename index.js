export const fancify = (Base) => {
  class Fancy extends Base {
    union(other) {
      return new Fancy([...this, ...other]);
    }

    intersection(other) {
      const intersection = new Fancy();

      for (const value of this.values())
        if (other.has(value)) intersection.add(value);

      return intersection;
    }

    difference(other) {
      const difference = new Fancy();

      for (const value of this.values())
        if (!other.has(value)) difference.add(value);

      return difference;
    }

    symmetricDifference(other) {
      return new Fancy(other).difference(this).update(this.difference(other));
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

  return Fancy;
};

export const FancySet = fancify(Set);
export const FancyWeakSet = fancify(WeakSet);
