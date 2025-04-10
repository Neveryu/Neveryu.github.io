import { Vector } from './Vector';
/**
 * Represents a vertex of a polygon. Use your own vertex class instead of this
 * one to provide additional features like texture coordinates and vertex
 * colors. Custom vertex classes need to provide a `pos` property and `clone()`,
 * `flip()`, and `interpolate()` methods that behave analogous to the ones
 * defined by `CSG.Vertex`. This class provides `normal` so convenience
 * functions like `CSG.sphere()` can return a smooth vertex normal, but `normal`
 * is not used anywhere else.
 */
export declare class Vertex {
    pos: Vector;
    normal: Vector;
    uv: Vector;
    color: Vector;
    constructor(pos: Vector, normal: Vector, uv: Vector, color: Vector);
    clone(): Vertex;
    flip(): void;
    interpolate(other: Vertex, t: number): Vertex;
}
