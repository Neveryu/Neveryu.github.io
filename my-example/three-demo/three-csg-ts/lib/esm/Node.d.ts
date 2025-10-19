import { Plane } from './Plane';
import { Polygon } from './Polygon';
/**
 * Holds a node in a BSP tree. A BSP tree is built from a collection of polygons
 * by picking a polygon to split along. That polygon (and all other coplanar
 * polygons) are added directly to that node and the other polygons are added to
 * the front and/or back subtrees. This is not a leafy BSP tree since there is
 * no distinction between internal and leaf nodes.
 */
export declare class Node {
    polygons: Polygon[];
    plane: Plane;
    front: Node;
    back: Node;
    constructor(polygons?: Polygon[]);
    clone(): Node;
    invert(): void;
    clipPolygons(polygons: Polygon[]): Polygon[];
    clipTo(bsp: Node): void;
    allPolygons(): Polygon[];
    build(polygons: Polygon[]): void;
}
