import Vector from './Vector';
import Render from './Render';
var ViewPort = /** @class */ (function () {
    function ViewPort(ctx, pos, size) {
        this._ctx = ctx;
        this._worldPosition = pos;
        this._size = size;
    }
    ViewPort.prototype.update = function () {
        this._gameObjects.hero[0].update();
        var newX = this._gameObjects.hero[0].position.x - this._size.x / 2;
        var newY = this._gameObjects.hero[0].position.y - this._size.y / 2;
        this._worldPosition.x = newX;
        this._worldPosition.y = newY;
    };
    ViewPort.prototype.drawZones = function (zones) {
        var _this = this;
        if (zones === void 0) { zones = this._zones; }
        this._ctx.save();
        this._ctx.fillStyle = "black";
        this._ctx.fillRect(0, 0, this._size.x, this._size.y);
        this._ctx.restore();
        zones.forEach(function (zone) {
            var data = Render.getZonePartData(_this, zone);
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
    ViewPort.prototype.drawGameObjects = function (time, gameObjects) {
        var _this = this;
        if (gameObjects === void 0) { gameObjects = this._gameObjects; }
        var gameObjectsAsArray = Object.values(this._gameObjects);
        //@ts-ignore
        var gameObj = gameObjectsAsArray.flat();
        var gameObjectsAsSortedArray = Render.sortByIncreasingY(gameObj);
        gameObjectsAsSortedArray.forEach(function (gameObject) {
            var frame = gameObject.getFrame(time);
            if (!frame)
                return;
            var cx = gameObject.position.x - _this._worldPosition.x - gameObject.size.x / 2;
            var cy = gameObject.position.y - _this._worldPosition.y - gameObject.size.y / 2;
            _this._ctx.save();
            if (frame.reversed) {
                _this._ctx.setTransform(-1, 0, 0, 1, (cx * 2) + gameObject.size.x, 0);
            }
            _this._ctx.drawImage(frame.sheet, frame.sx, frame.sy, frame.sWidth, frame.sHeight, cx, cy, gameObject.size.x, gameObject.size.y);
            _this._ctx.restore();
        });
    };
    ViewPort.prototype.resize = function (size) {
        var gameObjectsAsArray = Object.values(this._gameObjects);
        //@ts-ignore
        var gameObj = gameObjectsAsArray.flat();
        var diffConst = new Vector(size.x / this._size.x, size.y / this._size.y);
        this._zones.forEach(function (zone) {
            zone.onResize(diffConst);
        });
        gameObj.forEach(function (obj) {
            obj.onResize(diffConst);
        });
    };
    Object.defineProperty(ViewPort.prototype, "endPoints", {
        get: function () {
            return [
                new Vector(this._worldPosition.x + this.size.x, this._worldPosition.y),
                new Vector(this._worldPosition.x, this._worldPosition.y),
                new Vector(this._worldPosition.x, this._worldPosition.y + this.size.y),
                new Vector(this._worldPosition.x + this.size.x, this._worldPosition.y + this.size.y)
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
            this.resize(value);
            this._size = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewPort.prototype, "zones", {
        set: function (values) {
            this._zones = values;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewPort.prototype, "gameObjects", {
        set: function (values) {
            this._gameObjects = values;
        },
        enumerable: true,
        configurable: true
    });
    return ViewPort;
}());
export default ViewPort;
//# sourceMappingURL=ViewPort.js.map