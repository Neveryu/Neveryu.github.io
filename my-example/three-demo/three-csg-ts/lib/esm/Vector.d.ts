import { Vector3 } from 'three';
/**
 * Represents a 3D vector.
 */
export declare class Vector {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    copy(v: Vector | Vector3): Vector;
    clone(): Vector;
    negate(): Vector;
    add(a: Vector): Vector;
    sub(a: Vector): Vector;
    times(a: number): Vector;
    dividedBy(a: number): Vector;
    lerp(a: Vector, t: number): Vector;
    unit(): Vector;
    length(): number;
    normalize(): Vector;
    cross(b: Vector): Vector;
    dot(b: Vector): number;
    toVector3(): Vector3;
}
