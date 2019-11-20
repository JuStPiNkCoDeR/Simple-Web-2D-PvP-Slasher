var Vector = /** @class */ (function () {
    function Vector(x, y) {
        this._x = x;
        this._y = y;
    }
    Vector.prototype.sum = function (vector) {
        return new Vector(this._x + vector.x, this._y + vector.y);
    };
    Vector.prototype.subtract = function (vector) {
        return new Vector(this._x - vector.x, this._y - vector.y);
    };
    Vector.prototype.divide = function (num) {
        return new Vector(this._x / num, this._y / num);
    };
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
    Object.defineProperty(Vector.prototype, "length", {
        get: function () {
            return Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2));
        },
        enumerable: true,
        configurable: true
    });
    return Vector;
}());
export default Vector;
//# sourceMappingURL=Vector.js.map