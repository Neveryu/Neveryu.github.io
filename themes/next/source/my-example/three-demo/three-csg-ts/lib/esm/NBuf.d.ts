import { Vector } from './Vector';
export declare class NBuf3 {
    top: number;
    array: Float32Array;
    constructor(ct: number);
    write(v: Vector): void;
}
export declare class NBuf2 {
    top: number;
    array: Float32Array;
    constructor(ct: number);
    write(v: Vector): void;
}
