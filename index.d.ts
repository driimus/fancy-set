declare class FancySet<T> extends fancify(Set)<T> {}

interface SetOperations<T> {
  /**
   * Returns a new set with elements from this set and all others.
   *
   * @param others list of sets from which to copy elements
   */
  union(...others: Set<T>[]): Fancy<T>;

  /**
   * Returns a new set with elements common to this set and all others.
   *
   * @param others list of sets to intersect entries with
   */
  intersection(...others: Set<T>[]): Fancy<T>;

  /**
   * Returns a new set with elements from this set that are not in any others.
   *
   * @param others list of sets to differenciate with
   */
  difference(...others: Set<T>[]): Fancy<T>;

  /**
   * Returns a new set with elements found in either set, but not in both.
   *
   * @param other set to compare against
   */
  symmetricDifference(other: Set<T>): Fancy<T>;

  /**
   * Whether both sets have the same elements.
   *
   * @param other set to compare against
   */
  equals(other: Set<T>): boolean;

  /**
   * Whether this set is a subset of the other set.
   *
   * @param other set to compare against
   */
  isSubset(other: Set<T>): boolean;

  /**
   * Whether this set is a superset of the other set.
   *
   * @param other set to compare against
   */
  isSuperset(other: Set<T>): boolean;

  /**
   * Whether this set has no elements in common with the other set.
   *
   * @param other set to compare against
   */
  isDisjoint(other: Set<T>): boolean;

  /**
   * Updates the set, adding elements from all others.
   *
   * @remarks similar to `union`, but in-place
   *
   * @param others list of sets from which to add elements
   */
  update(...others: Set<T>[]): void;

  /**
   * Updates the set, keeping elements which can be found in this set and all others.
   *
   * @remarks similar to `intersection`, but in-place
   *
   * @param others list of sets to intersect entries with
   */
  intersectionUpdate(...others: Set<T>[]): void;

  /**
   * Updates the set, removing elements found in all others.
   *
   * @remarks similar to `difference`, but in-place
   *
   * @param others list of sets to differenciate with
   */
  differenceUpdate(...others: Set<T>[]): void;

  /**
   * Updates the set, keeping elements which are found in one set, but not in the other.
   *
   * @remarks similar to `symmetricDifference`, but in-place
   *
   * @param other set for which to find the symmetric difference
   */
  symmetricDifferenceUpdate(other: Set<T>): void;

  /**
   * Returns a shallow copy of the set.
   */
  clone(): Fancy<T>;
}

export type Fancy<V> = Set<V> & SetOperations<V>;

/**
 * Returns a new set class which implements `SetOperations`
 *
 * @param Base set-like class constructor
 *
 * @example
 *
 * ```ts
 * import { fancify } from "fancy-set";
 *
 * class MyCustomSet extends Set {}
 * const MyFancyCustomSet = fancify(MyCustomSet);
 *
 * const fancyCustomSet = new MyFancyCustomSet();
 * ```
 */
declare function fancify<BaseT extends SetConstructor>(
  Base: BaseT
): {
  new <V = any>(values?: readonly V[] | null): Fancy<V>;
};
