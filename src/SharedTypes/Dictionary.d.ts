/** 
 * @Dictionary 
 * provides type definition for object as C# dictionary
 * 
 * @param T generic type for set type of value array
 * 
*/
declare type Dictionary<T> = { [key: string | Symbol]: Array<T> | T };

declare class Dictionary<T extends Object> {
    private dictionary: { [key: string | Symbol]: Array<T> | T } = {};

    add(key: string | Symbol, value: T) {
        this.dictionary[key] = value;
    };

    clear() {
        this.dictionary = {};
    };

    foreach(fn: (value: T, index: number, array: T[]) => void) {
        for (const key in this.dictionary) {
            const element = this.dictionary[key];
            fn()
        }
    }

}
