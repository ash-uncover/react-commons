export declare const useClasses: (classes: (string | undefined)[]) => {
    classBuilder: ClassBuilder;
    classes: string;
};
type ClassDefinition = string | (string | undefined)[] | undefined;
declare class ClassBuilder {
    #private;
    constructor(classBase: ClassDefinition, listener: (value: string) => void);
    add(className: ClassDefinition): void;
    remove(className: ClassDefinition): void;
    toggle(className: ClassDefinition): void;
    set(className: ClassDefinition, active: boolean): void;
    private getClassName;
    private notify;
}
export {};
