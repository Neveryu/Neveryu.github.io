import { BufferGeometry, Material, Matrix4, Mesh } from 'three';
import { Polygon } from './Polygon';
/**
 * Holds a binary space partition tree representing a 3D solid. Two solids can
 * be combined using the `union()`, `subtract()`, and `intersect()` methods.
 */
export declare class CSG {
    static fromPolygons(polygons: Polygon[]): CSG;
    static fromGeometry(geom: BufferGeometry, objectIndex?: any): CSG;
    static toGeometry(csg: CSG, toMatrix: Matrix4): BufferGeometry;
    static fromMesh(mesh: Mesh, objectIndex?: any): CSG;
    static toMesh(csg: CSG, toMatrix: Matrix4, toMaterial?: Material | Material[]): Mesh;
    static union(meshA: Mesh, meshB: Mesh): Mesh;
    static subtract(meshA: Mesh, meshB: Mesh): Mesh;
    static intersect(meshA: Mesh, meshB: Mesh): Mesh;
    private polygons;
    clone(): CSG;
    toPolygons(): Polygon[];
    union(csg: CSG): CSG;
    subtract(csg: CSG): CSG;
    intersect(csg: CSG): CSG;
    inverse(): CSG;
    toMesh(toMatrix: Matrix4, toMaterial?: Material | Material[]): Mesh;
    toGeometry(toMatrix: Matrix4): BufferGeometry;
}
