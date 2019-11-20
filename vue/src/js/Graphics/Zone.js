import Resource from '../Resource';
import ResourceLoader from '../ResourceLoader';
var Zone = /** @class */ (function () {
    function Zone(props) {
        var _ = this;
        this._isReady = false;
        this._name = props.name;
        this._position = props.position;
        this._size = props.size;
        ResourceLoader.load('image', [props.background])
            .then(function (result) {
            _._background = new Resource(props.background, result[props.background]);
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
    Zone.prototype.onResize = function (diffConst) {
        this._position.x *= diffConst.x;
        this._position.y *= diffConst.y;
        this._size.x *= diffConst.x;
        this._size.y *= diffConst.y;
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
export default Zone;
//# sourceMappingURL=Zone.js.map