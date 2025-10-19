import { Plane } from './Plane';
import { Vertex } from './Vertex';
/**
 * Represents a convex polygon. The vertices used to initialize a polygon must
 * be coplanar and form a convex loop. They do not have to be `Vertex`
 * instances but they must behave similarly (duck typing can be used for
 * customization).
 *
 * Each convex polygon has a `shared` property, which is shared between all
 * polygons that are clones of each other or were split from the same polygon.
 * This can be used to define per-polygon properties (such as surface color).
 */
export declare class Polygon {
    vertices: Vertex[];
    shared: any;
    plane: Plane;
    constructor(vertices: Vertex[], shared: any);
    clone(): Polygon;
    flip(): void;
}
