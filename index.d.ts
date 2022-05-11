declare const FancySet: Constructor<Fancy<Set<T>>>;
declare const FancyWeakSet: Constructor<Fancy<WeakSet<T>>>;

interface SetOperations<T extends Set | WeakSet, V = EntryType<T>> {
  union(...others: T[]): Fancy<T>;
  intersection(...others: T[]): Fancy<T>;
  difference(...others: T[]): Fancy<T>;
  symmetricDifference(other: T): Fancy<T>;
  equals(other: T): boolean;
  isSubset(other: T): boolean;
  isSuperset(other: T): boolean;
  isDisjoint(other: T): boolean;
  update(...values: V[]): void;
  clone(): Fancy<T>;
}

export type Fancy<T extends Set | WeakSet> = T & SetOperations<T, EntryType<T>>;

declare function fancify<BaseT extends Constructor<Set | WeakSet>>(
  Base: BaseT
): Constructor<Fancy<BaseT>>;

type Constructor<T, Arguments extends unknown[] = any[]> = new (
  ...arguments_: Arguments
) => T;

type EntryType<T extends Iterable> = T extends Set<infer U>
  ? U
  : T extends WeakSet<infer U>
  ? U
  : never;
