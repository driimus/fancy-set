import { expectAssignable, expectNotAssignable } from "tsd";
import { fancify, SetOperations } from ".";

expectAssignable<Parameters<typeof fancify>[0]>(Set);
expectNotAssignable<Parameters<typeof fancify>[0]>(WeakSet);

class CustomSet<T> extends Set<T> {
    customMethod(customValue: `custom_${string}`) {
        console.log(customValue);
    }
}

expectAssignable<Parameters<typeof fancify>[0]>(CustomSet);
expectAssignable<SetOperations<string>>(new (fancify(CustomSet)))
