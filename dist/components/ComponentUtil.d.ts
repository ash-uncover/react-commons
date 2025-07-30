export declare class ClassBuilder {
    #private;
    constructor(classBase: string | (string | undefined)[] | undefined);
    get className(): string;
    add(className: string | (string | undefined)[] | undefined): void;
    remove(className: string | (string | undefined)[] | undefined): void;
    toggle(className: string | (string | undefined)[] | undefined): void;
}
