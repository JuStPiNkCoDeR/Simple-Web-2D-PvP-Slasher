"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = require("../Resource");
var ResourceLoader_1 = require("../ResourceLoader");
var Zone = /** @class */ (function () {
    function Zone(props) {
        var _ = this;
        this._isReady = false;
        this._name = props.name;
        this._position = props.position;
        this._size = props.size;
        ResourceLoader_1.default.load('image', [props.background])
            .then(function (result) {
            _._background = new Resource_1.default(props.background, result[props.background]);
            _._isReady = true;
        });
    }
    Zone.prototype.getPosition = function () {
        return this._position;
    };
    Zone.prototype.getSize = function () {
        return this._size;
    };
    Zone.prototype.getBackground = function () {
        return this._background;
    };
    Object.defineProperty(Zone.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (value) {
            this._position = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Zone.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (value) {
            this._size = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Zone.prototype, "background", {
        get: function () {
            if (!this._isReady)
                return null;
            else
                return this._background;
        },
        enumerable: true,
        configurable: true
    });
    return Zone;
}());
exports.default = Zone;
