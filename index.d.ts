declare class FancySet<T> extends fancify(Set)<T> {}
declare class FancyWeakSet<T extends object> extends fancify(WeakSet)<T> {}

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

export type Fancy<
  T extends SetConstructor | WeakSetConstructor,
  V,
  I = InstanceType<T>
> = I & SetOperations<I, V>;

declare function fancify<BaseT extends SetConstructor>(
  Base: BaseT
): {
  new <V = any>(values?: readonly V[] | null): Fancy<BaseT, V>;
};

declare function fancify<BaseT extends WeakSetConstructor>(
  Base: BaseT
): {
  new <V extends object = object>(values?: readonly V[] | null): Fancy<
    BaseT,
    V
  >;
};

type EntryType<T extends Iterable> = T extends Set<infer U>
  ? U
  : T extends WeakSet<infer U>
  ? U
  : never;
