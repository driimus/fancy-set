export const fancify = (Base) => {
  class Fancy extends Base {
    union(...others) {
      return new this.constructor([...this, ...others.flatMap((set) => [...set])]);
    }

    intersection(...others) {
      const intersection = new this.constructor();

      for (const value of this.values())
        if (others.every((set) => set.has(value))) intersection.add(value);

      return intersection;
    }

    difference(...others) {
      const difference = new this.constructor();

      for (const value of this.values())
        if (!others.some((set) => set.has(value))) difference.add(value);

      return difference;
    }

    symmetricDifference(other) {
      return new this.constructor(other).difference(this).union(this.difference(other));
    }

    equals(other) {
      return this.size === other.size && this.isSubset(other);
    }

    isSubset(other) {
      return Array.from(this).every((value) => other.has(value));
    }

    isSuperset(other) {
      return Array.from(other).every((value) => this.has(value));
    }

    isDisjoint(other) {
      return Array.from(this).every((value) => other.has(value) === false);
    }

    update(...values) {
      for (const value of values) this.add(value);
    }

    clone() {
      return new this.constructor(this);
    }

    intersectionUpdate(...others) {
      const intersection = this.intersection(...others);

      for (const value of this) {
        if (!intersection.has(value)) this.delete(value);
      }
    }

    differenceUpdate(...others) {
      const difference = this.difference(...others);

      for (const value of this) {
        if (!difference.has(value)) this.delete(value);
      }
    }

    symmetricDifferenceUpdate(other) {
      const symmetricDifference = this.symmetricDifference(other);
      this.clear();
      this.update(...symmetricDifference);
    }
  }

  return Fancy;
};

export const FancySet = fancify(Set);
