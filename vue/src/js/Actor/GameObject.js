"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sprite_1 = require("./Sprite");
var GameObject = /** @class */ (function () {
    function GameObject(props) {
        this._position = props.position;
        this._size = props.size;
        this._sprite = new Sprite_1.default();
    }
    GameObject.prototype.getFrame = function (time) {
        return this._sprite.getFrame(time);
    };
    Object.defineProperty(GameObject.prototype, "sprite", {
        get: function () {
            return this._sprite;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (value) {
            this._position = value;
        },
        enumerable: true,
        configurable: true
    });
    return GameObject;
}());
exports.default = GameObject;
