"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plane = void 0;
const Polygon_1 = require("./Polygon");
const Vector_1 = require("./Vector");
/**
 * Represents a plane in 3D space.
 */
class Plane {
    constructor(normal, w) {
        this.normal = normal;
        this.w = w;
        this.normal = normal;
        this.w = w;
    }
    clone() {
        return new Plane(this.normal.clone(), this.w);
    }
    flip() {
        this.normal.negate();
        this.w = -this.w;
    }
    // Split `polygon` by this plane if needed, then put the polygon or polygon
    // fragments in the appropriate lists. Coplanar polygons go into either
    // `coplanarFront` or `coplanarBack` depending on their orientation with
    // respect to this plane. Polygons in front or in back of this plane go into
    // either `front` or `back`.
    splitPolygon(polygon, coplanarFront, coplanarBack, front, back) {
        const COPLANAR = 0;
        const FRONT = 1;
        const BACK = 2;
        const SPANNING = 3;
        // Classify each point as well as the entire polygon into one of the above
        // four classes.
        let polygonType = 0;
        const types = [];
        for (let i = 0; i < polygon.vertices.length; i++) {
            const t = this.normal.dot(polygon.vertices[i].pos) - this.w;
            const type = t < -Plane.EPSILON ? BACK : t > Plane.EPSILON ? FRONT : COPLANAR;
            polygonType |= type;
            types.push(type);
        }
        // Put the polygon in the correct list, splitting it when necessary.
        switch (polygonType) {
            case COPLANAR:
                (this.normal.dot(polygon.plane.normal) > 0
                    ? coplanarFront
                    : coplanarBack).push(polygon);
                break;
            case FRONT:
                front.push(polygon);
                break;
            case BACK:
                back.push(polygon);
                break;
            case SPANNING: {
                const f = [], b = [];
                for (let i = 0; i < polygon.vertices.length; i++) {
                    const j = (i + 1) % polygon.vertices.length;
                    const ti = types[i], tj = types[j];
                    const vi = polygon.vertices[i], vj = polygon.vertices[j];
                    if (ti != BACK)
                        f.push(vi);
                    if (ti != FRONT)
                        b.push(ti != BACK ? vi.clone() : vi);
                    if ((ti | tj) == SPANNING) {
                        const t = (this.w - this.normal.dot(vi.pos)) /
                            this.normal.dot(new Vector_1.Vector().copy(vj.pos).sub(vi.pos));
                        const v = vi.interpolate(vj, t);
                        f.push(v);
                        b.push(v.clone());
                    }
                }
                if (f.length >= 3)
                    front.push(new Polygon_1.Polygon(f, polygon.shared));
                if (b.length >= 3)
                    back.push(new Polygon_1.Polygon(b, polygon.shared));
                break;
            }
        }
    }
    static fromPoints(a, b, c) {
        const n = new Vector_1.Vector()
            .copy(b)
            .sub(a)
            .cross(new Vector_1.Vector().copy(c).sub(a))
            .normalize();
        return new Plane(n.clone(), n.dot(a));
    }
}
exports.Plane = Plane;
Plane.EPSILON = 1e-5;
