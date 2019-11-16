"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vector_1 = require("./Vector");
var Render_1 = require("./Render");
var ViewPort = /** @class */ (function () {
    function ViewPort(ctx, pos, size) {
        this._ctx = ctx;
        this._worldPoisition = pos;
        this._size = size;
    }
    ViewPort.prototype.update = function (characterPosition) {
        var newX = characterPosition.x - this._size.x / 2;
        var newY = characterPosition.y - this._size.y / 2;
        this._worldPoisition.x = newX;
        this._worldPoisition.y = newY;
    };
    ViewPort.prototype.drawZones = function (zones) {
        var _this = this;
        this._ctx.save();
        this._ctx.fillStyle = "black";
        this._ctx.fillRect(0, 0, this._size.x, this._size.y);
        this._ctx.restore();
        zones.forEach(function (zone) {
            var data = Render_1.default.getZonePartData(_this, zone);
            if (!data)
                return;
            var back = zone.background;
            if (!back)
                return;
            _this._ctx.save();
            _this._ctx.fillStyle = _this._ctx.createPattern(back.cache, 'repeat');
            _this._ctx.fillRect(data.offsets.x, data.offsets.y, data.size.x, data.size.y);
            _this._ctx.restore();
        });
    };
    ViewPort.prototype.drawGameObjects = function (gameObjects, time) {
        var _this = this;
        gameObjects.forEach(function (gameObject) {
            var frame = gameObject.getFrame(time);
            if (!frame)
                return;
            var cx = gameObject.position.x - _this._worldPoisition.x - gameObject.size.x / 2;
            var cy = gameObject.position.y - _this._worldPoisition.y - gameObject.size.y / 2;
            _this._ctx.save();
            if (frame.reversed) {
                _this._ctx.setTransform(-1, 0, 0, 1, (cx * 2) + gameObject.size.x, 0);
            }
            _this._ctx.drawImage(frame.sheet, frame.sx, frame.sy, frame.sWidth, frame.sHeight, cx, cy, gameObject.size.x, gameObject.size.y);
            _this._ctx.restore();
        });
    };
    Object.defineProperty(ViewPort.prototype, "endPoints", {
        get: function () {
            return [
                new Vector_1.default(this._worldPoisition.x + this.size.x, this._worldPoisition.y),
                new Vector_1.default(this._worldPoisition.x, this._worldPoisition.y),
                new Vector_1.default(this._worldPoisition.x, this._worldPoisition.y + this.size.y),
                new Vector_1.default(this._worldPoisition.x + this.size.x, this._worldPoisition.y + this.size.y)
            ];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewPort.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (value) {
            this._size = value;
        },
        enumerable: true,
        configurable: true
    });
    return ViewPort;
}());
exports.default = ViewPort;
