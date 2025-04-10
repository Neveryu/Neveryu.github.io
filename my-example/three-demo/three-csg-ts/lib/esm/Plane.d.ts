import { Polygon } from './Polygon';
import { Vector } from './Vector';
/**
 * Represents a plane in 3D space.
 */
export declare class Plane {
    normal: Vector;
    w: number;
    static EPSILON: number;
    constructor(normal: Vector, w: number);
    clone(): Plane;
    flip(): void;
    splitPolygon(polygon: Polygon, coplanarFront: Polygon[], coplanarBack: Polygon[], front: Polygon[], back: Polygon[]): void;
    static fromPoints(a: Vector, b: Vector, c: Vector): Plane;
}
