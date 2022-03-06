export class Stack<T> {
    private elements: Array<T>;
    public lenght: number;

    constructor() {
        this.elements = [];
        this.lenght = 0;
    }

    push(item: T): void {
        this.elements.push(item);
        this.lenght++;
    }

    pop(): T | undefined {
        const elem = this.elements[this.lenght - 2];
        this.elements.pop();
        if (this.lenght != 0) {
            this.lenght--;
        }
        return elem;
    }

    get(): T | undefined {
        if (this.lenght != 0) {
            this.elements[this.lenght - 1];
        } else return;
    }

    isEmpty(): boolean {
        return this.lenght >= 1 ? false : true;
    }

    has(item: T): boolean {
        return this.elements.includes(item);
    }
}
