import Sprite from './Sprite';
import Collision from "../Collisions/Collision";
var GameObject = /** @class */ (function () {
    function GameObject(props) {
        this._name = props.name;
        this._position = props.position;
        this._size = props.size;
        this._sprite = new Sprite();
        this._collision = new Collision({
            object: this,
            collide: props.collide
        });
    }
    GameObject.prototype.getFrame = function (time) {
        return this._sprite.getFrame(time);
    };
    GameObject.prototype.onResize = function (diffConst) {
        this.position.x *= diffConst.x;
        this.position.y *= diffConst.y;
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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "collision", {
        get: function () {
            return this._collision;
        },
        enumerable: true,
        configurable: true
    });
    return GameObject;
}());
export default GameObject;
//# sourceMappingURL=GameObject.js.map