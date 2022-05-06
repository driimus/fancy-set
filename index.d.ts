declare class FancySet<T> extends Set<T> {
  intersection(other: Set<T>): FancySet<T>;

  difference(other: Set<T>): FancySet<T>;

  symmetricDifference(other: Set<T>): FancySet<T>;

  union(other: Set<T>): FancySet<T>;

  isSubset(other: Set<T>): boolean;

  isSuperset(other: Set<T>): boolean;

  update(...values: T[]): void;
}
