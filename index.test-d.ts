import { expectAssignable, expectNotAssignable } from "tsd";
import { fancify, SetOperations } from ".";

expectNotAssignable<Parameters<typeof fancify>>(WeakSet);

class CustomSet<T> extends Set<T> {
    customMethod(customValue: `custom_${string}`) {
        console.log(customValue);
    }
}

expectAssignable<SetOperations<string>>(new (fancify(CustomSet)))
