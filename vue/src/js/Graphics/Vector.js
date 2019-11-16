"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        this._x = x;
        this._y = y;
    }
    Vector.prototype.getX = function () {
        return this._x;
    };
    Vector.prototype.getY = function () {
        return this._y;
    };
    Vector.prototype.setX = function (x) {
        this._x = x;
    };
    Vector.prototype.setY = function (y) {
        this._y = y;
    };
    Object.defineProperty(Vector.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this._y = value;
        },
        enumerable: true,
        configurable: true
    });
    return Vector;
}());
exports.default = Vector;
