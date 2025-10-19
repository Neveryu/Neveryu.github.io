"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NBuf2 = exports.NBuf3 = void 0;
class NBuf3 {
    constructor(ct) {
        this.top = 0;
        this.array = new Float32Array(ct);
    }
    write(v) {
        this.array[this.top++] = v.x;
        this.array[this.top++] = v.y;
        this.array[this.top++] = v.z;
    }
}
exports.NBuf3 = NBuf3;
class NBuf2 {
    constructor(ct) {
        this.top = 0;
        this.array = new Float32Array(ct);
    }
    write(v) {
        this.array[this.top++] = v.x;
        this.array[this.top++] = v.y;
    }
}
exports.NBuf2 = NBuf2;
