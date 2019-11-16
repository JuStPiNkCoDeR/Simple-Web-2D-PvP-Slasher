"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var States_1 = require("./States");
var Sprite = /** @class */ (function () {
    function Sprite() {
        this.animations = {};
        this.state = States_1.default.Idle;
        this._reversed = false;
    }
    Sprite.prototype.addAnimation = function (name, animation) {
        this.animations[name] = animation;
    };
    Sprite.prototype.mirror = function (value) {
        this._reversed = value;
    };
    Sprite.prototype.getFrame = function (time) {
        var frameData = this.animations[this._state].getCurrentFrame(time);
        if (frameData)
            frameData.reversed = this._reversed;
        return frameData;
    };
    Object.defineProperty(Sprite.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (value) {
            this._state = value;
        },
        enumerable: true,
        configurable: true
    });
    return Sprite;
}());
exports.default = Sprite;
