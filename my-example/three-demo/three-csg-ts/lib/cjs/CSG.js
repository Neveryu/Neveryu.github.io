"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSG = void 0;
const three_1 = require("three");
const NBuf_1 = require("./NBuf");
const Node_1 = require("./Node");
const Polygon_1 = require("./Polygon");
const Vector_1 = require("./Vector");
const Vertex_1 = require("./Vertex");
/**
 * Holds a binary space partition tree representing a 3D solid. Two solids can
 * be combined using the `union()`, `subtract()`, and `intersect()` methods.
 */
class CSG {
    constructor() {
        this.polygons = [];
    }
    static fromPolygons(polygons) {
        const csg = new CSG();
        csg.polygons = polygons;
        return csg;
    }
    static fromGeometry(geom, objectIndex) {
        let polys = [];
        const posattr = geom.attributes.position;
        const normalattr = geom.attributes.normal;
        const uvattr = geom.attributes.uv;
        const colorattr = geom.attributes.color;
        const grps = geom.groups;
        let index;
        if (geom.index) {
            index = geom.index.array;
        }
        else {
            index = new Uint16Array((posattr.array.length / posattr.itemSize) | 0);
            for (let i = 0; i < index.length; i++)
                index[i] = i;
        }
        const triCount = (index.length / 3) | 0;
        polys = new Array(triCount);
        for (let i = 0, pli = 0, l = index.length; i < l; i += 3, pli++) {
            const vertices = new Array(3);
            for (let j = 0; j < 3; j++) {
                const vi = index[i + j];
                const vp = vi * 3;
                const vt = vi * 2;
                const x = posattr.array[vp];
                const y = posattr.array[vp + 1];
                const z = posattr.array[vp + 2];
                const nx = normalattr.array[vp];
                const ny = normalattr.array[vp + 1];
                const nz = normalattr.array[vp + 2];
                const u = uvattr === null || uvattr === void 0 ? void 0 : uvattr.array[vt];
                const v = uvattr === null || uvattr === void 0 ? void 0 : uvattr.array[vt + 1];
                vertices[j] = new Vertex_1.Vertex(new Vector_1.Vector(x, y, z), new Vector_1.Vector(nx, ny, nz), new Vector_1.Vector(u, v, 0), colorattr &&
                    new Vector_1.Vector(colorattr.array[vp], colorattr.array[vp + 1], colorattr.array[vp + 2]));
            }
            if (objectIndex === undefined && grps && grps.length > 0) {
                for (const grp of grps) {
                    if (i >= grp.start && i < grp.start + grp.count) {
                        polys[pli] = new Polygon_1.Polygon(vertices, grp.materialIndex);
                    }
                }
            }
            else {
                polys[pli] = new Polygon_1.Polygon(vertices, objectIndex);
            }
        }
        return CSG.fromPolygons(polys.filter((p) => !Number.isNaN(p.plane.normal.x)));
    }
    static toGeometry(csg, toMatrix) {
        let triCount = 0;
        const ps = csg.polygons;
        for (const p of ps) {
            triCount += p.vertices.length - 2;
        }
        const geom = new three_1.BufferGeometry();
        const vertices = new NBuf_1.NBuf3(triCount * 3 * 3);
        const normals = new NBuf_1.NBuf3(triCount * 3 * 3);
        const uvs = new NBuf_1.NBuf2(triCount * 2 * 3);
        let colors;
        const grps = [];
        const dgrp = [];
        for (const p of ps) {
            const pvs = p.vertices;
            const pvlen = pvs.length;
            if (p.shared !== undefined) {
                if (!grps[p.shared])
                    grps[p.shared] = [];
            }
            if (pvlen && pvs[0].color !== undefined) {
                if (!colors)
                    colors = new NBuf_1.NBuf3(triCount * 3 * 3);
            }
            for (let j = 3; j <= pvlen; j++) {
                const grp = p.shared === undefined ? dgrp : grps[p.shared];
                grp.push(vertices.top / 3, vertices.top / 3 + 1, vertices.top / 3 + 2);
                vertices.write(pvs[0].pos);
                vertices.write(pvs[j - 2].pos);
                vertices.write(pvs[j - 1].pos);
                normals.write(pvs[0].normal);
                normals.write(pvs[j - 2].normal);
                normals.write(pvs[j - 1].normal);
                if (uvs) {
                    uvs.write(pvs[0].uv);
                    uvs.write(pvs[j - 2].uv);
                    uvs.write(pvs[j - 1].uv);
                }
                if (colors) {
                    colors.write(pvs[0].color);
                    colors.write(pvs[j - 2].color);
                    colors.write(pvs[j - 1].color);
                }
            }
        }
        geom.setAttribute('position', new three_1.BufferAttribute(vertices.array, 3));
        geom.setAttribute('normal', new three_1.BufferAttribute(normals.array, 3));
        uvs && geom.setAttribute('uv', new three_1.BufferAttribute(uvs.array, 2));
        colors && geom.setAttribute('color', new three_1.BufferAttribute(colors.array, 3));
        for (let gi = 0; gi < grps.length; gi++) {
            if (grps[gi] === undefined) {
                grps[gi] = [];
            }
        }
        if (grps.length) {
            let index = [];
            let gbase = 0;
            for (let gi = 0; gi < grps.length; gi++) {
                geom.addGroup(gbase, grps[gi].length, gi);
                gbase += grps[gi].length;
                index = index.concat(grps[gi]);
            }
            geom.addGroup(gbase, dgrp.length, grps.length);
            index = index.concat(dgrp);
            geom.setIndex(index);
        }
        const inv = new three_1.Matrix4().copy(toMatrix).invert();
        geom.applyMatrix4(inv);
        geom.computeBoundingSphere();
        geom.computeBoundingBox();
        return geom;
    }
    static fromMesh(mesh, objectIndex) {
        const csg = CSG.fromGeometry(mesh.geometry, objectIndex);
        const ttvv0 = new three_1.Vector3();
        const tmpm3 = new three_1.Matrix3();
        tmpm3.getNormalMatrix(mesh.matrix);
        for (let i = 0; i < csg.polygons.length; i++) {
            const p = csg.polygons[i];
            for (let j = 0; j < p.vertices.length; j++) {
                const v = p.vertices[j];
                v.pos.copy(ttvv0.copy(v.pos.toVector3()).applyMatrix4(mesh.matrix));
                v.normal.copy(ttvv0.copy(v.normal.toVector3()).applyMatrix3(tmpm3));
            }
        }
        return csg;
    }
    static toMesh(csg, toMatrix, toMaterial) {
        const geom = CSG.toGeometry(csg, toMatrix);
        const m = new three_1.Mesh(geom, toMaterial);
        m.matrix.copy(toMatrix);
        m.matrix.decompose(m.position, m.quaternion, m.scale);
        m.rotation.setFromQuaternion(m.quaternion);
        m.updateMatrixWorld();
        m.castShadow = m.receiveShadow = true;
        return m;
    }
    static union(meshA, meshB) {
        const csgA = CSG.fromMesh(meshA);
        const csgB = CSG.fromMesh(meshB);
        return CSG.toMesh(csgA.union(csgB), meshA.matrix, meshA.material);
    }
    static subtract(meshA, meshB) {
        const csgA = CSG.fromMesh(meshA);
        const csgB = CSG.fromMesh(meshB);
        return CSG.toMesh(csgA.subtract(csgB), meshA.matrix, meshA.material);
    }
    static intersect(meshA, meshB) {
        const csgA = CSG.fromMesh(meshA);
        const csgB = CSG.fromMesh(meshB);
        return CSG.toMesh(csgA.intersect(csgB), meshA.matrix, meshA.material);
    }
    clone() {
        const csg = new CSG();
        csg.polygons = this.polygons
            .map((p) => p.clone())
            .filter((p) => Number.isFinite(p.plane.w));
        return csg;
    }
    toPolygons() {
        return this.polygons;
    }
    union(csg) {
        const a = new Node_1.Node(this.clone().polygons);
        const b = new Node_1.Node(csg.clone().polygons);
        a.clipTo(b);
        b.clipTo(a);
        b.invert();
        b.clipTo(a);
        b.invert();
        a.build(b.allPolygons());
        return CSG.fromPolygons(a.allPolygons());
    }
    subtract(csg) {
        const a = new Node_1.Node(this.clone().polygons);
        const b = new Node_1.Node(csg.clone().polygons);
        a.invert();
        a.clipTo(b);
        b.clipTo(a);
        b.invert();
        b.clipTo(a);
        b.invert();
        a.build(b.allPolygons());
        a.invert();
        return CSG.fromPolygons(a.allPolygons());
    }
    intersect(csg) {
        const a = new Node_1.Node(this.clone().polygons);
        const b = new Node_1.Node(csg.clone().polygons);
        a.invert();
        b.clipTo(a);
        b.invert();
        a.clipTo(b);
        b.clipTo(a);
        a.build(b.allPolygons());
        a.invert();
        return CSG.fromPolygons(a.allPolygons());
    }
    // Return a new CSG solid with solid and empty space switched. This solid is
    // not modified.
    inverse() {
        const csg = this.clone();
        for (const p of csg.polygons) {
            p.flip();
        }
        return csg;
    }
    toMesh(toMatrix, toMaterial) {
        return CSG.toMesh(this, toMatrix, toMaterial);
    }
    toGeometry(toMatrix) {
        return CSG.toGeometry(this, toMatrix);
    }
}
exports.CSG = CSG;
