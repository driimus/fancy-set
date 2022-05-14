declare class FancySet<T> extends fancify(Set)<T> {}

interface SetOperations<T> {
  union(...others: Set<T>[]): Fancy<T>;
  intersection(...others: Set<T>[]): Fancy<T>;
  difference(...others: Set<T>[]): Fancy<T>;
  symmetricDifference(other: Set<T>): Fancy<T>;
  equals(other: Set<T>): boolean;
  isSubset(other: Set<T>): boolean;
  isSuperset(other: Set<T>): boolean;
  isDisjoint(other: Set<T>): boolean;
  update(...values: T[]): void;
  clone(): Fancy<T>;
}

export type Fancy<V> = Set<V> & SetOperations<V>;

declare function fancify<BaseT extends SetConstructor>(
  Base: BaseT
): {
  new <V = any>(values?: readonly V[] | null): Fancy<V>;
};
