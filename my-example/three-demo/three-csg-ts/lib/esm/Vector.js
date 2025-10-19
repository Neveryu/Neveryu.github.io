import { Vector3 } from 'three';
/**
 * Represents a 3D vector.
 */
export class Vector {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    copy(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        return this;
    }
    clone() {
        return new Vector(this.x, this.y, this.z);
    }
    negate() {
        this.x *= -1;
        this.y *= -1;
        this.z *= -1;
        return this;
    }
    add(a) {
        this.x += a.x;
        this.y += a.y;
        this.z += a.z;
        return this;
    }
    sub(a) {
        this.x -= a.x;
        this.y -= a.y;
        this.z -= a.z;
        return this;
    }
    times(a) {
        this.x *= a;
        this.y *= a;
        this.z *= a;
        return this;
    }
    dividedBy(a) {
        this.x /= a;
        this.y /= a;
        this.z /= a;
        return this;
    }
    lerp(a, t) {
        return this.add(new Vector().copy(a).sub(this).times(t));
    }
    unit() {
        return this.dividedBy(this.length());
    }
    length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
    }
    normalize() {
        return this.unit();
    }
    cross(b) {
        const a = this.clone();
        const ax = a.x, ay = a.y, az = a.z;
        const bx = b.x, by = b.y, bz = b.z;
        this.x = ay * bz - az * by;
        this.y = az * bx - ax * bz;
        this.z = ax * by - ay * bx;
        return this;
    }
    dot(b) {
        return this.x * b.x + this.y * b.y + this.z * b.z;
    }
    toVector3() {
        return new Vector3(this.x, this.y, this.z);
    }
}
