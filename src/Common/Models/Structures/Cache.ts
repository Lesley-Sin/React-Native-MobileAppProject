export class Cache<T> {
    private elements: { [key: string]: T } = {}

    public add(k: string, v: T) {
        this.elements[k] = v;
    }

    public includes(k: string) {
        if (k in this.elements) {
            return true;
        } else return false;
    }

}