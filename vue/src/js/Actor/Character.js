"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Vector_1 = require("../Graphics/Vector");
var States_1 = require("./States");
var GameObject_1 = require("./GameObject");
var SocketManager_1 = require("../SocketManager");
function move(key) {
    switch (key) {
        case "w":
            this.goUp();
            break;
        case "s":
            this.goDown();
            break;
        case "a":
            this.goLeft();
            break;
        case "d":
            this.goRight();
            break;
    }
}
var pressed = new Set();
function initController() {
    document.addEventListener('keydown', function (event) {
        pressed.add(event.key.toLowerCase());
    });
    document.addEventListener('keyup', function (event) {
        pressed.delete(event.key.toLowerCase());
    });
}
function init(props) {
    if (props.accessToController)
        initController();
}
var Character = /** @class */ (function (_super) {
    __extends(Character, _super);
    function Character(pos, props) {
        var _this = _super.call(this, {
            size: new Vector_1.default(128, 128),
            position: pos
        }) || this;
        _this.opponentID = null;
        _this._pressed = [];
        _this.movement = move.bind(_this);
        _this._accessToController = props.accessToController;
        init(props);
        return _this;
    }
    Character.prototype.goUp = function () {
        this._position.y -= 5;
        this._sprite.state = States_1.default.Walking;
        if (this.opponentID)
            SocketManager_1.default.$emit('hero:game:event', {
                id: this.opponentID,
                event: 'up'
            });
    };
    Character.prototype.goDown = function () {
        this._position.y += 5;
        this._sprite.state = States_1.default.Walking;
        if (this.opponentID) {
            SocketManager_1.default.$emit('hero:game:event', {
                id: this.opponentID,
                event: 'down'
            });
        }
    };
    Character.prototype.goRight = function () {
        this._position.x += 5;
        this._sprite.state = States_1.default.Walking;
        this._sprite.mirror(false);
        if (this.opponentID)
            SocketManager_1.default.$emit('hero:game:event', {
                id: this.opponentID,
                event: 'right'
            });
    };
    Character.prototype.goLeft = function () {
        this._position.x -= 5;
        this._sprite.state = States_1.default.Walking;
        this._sprite.mirror(true);
        if (this.opponentID)
            SocketManager_1.default.$emit('hero:game:event', {
                id: this.opponentID,
                event: 'left'
            });
    };
    Character.prototype.update = function () {
        var _this = this;
        this._sprite.state = States_1.default.Idle;
        if (this._accessToController) {
            pressed.forEach(function (val) {
                _this.movement(val);
            });
        }
        else {
            this._pressed.forEach(function (val) {
                _this.movement(val);
            });
            this._pressed = [];
        }
    };
    Object.defineProperty(Character.prototype, "pressed", {
        get: function () {
            return this._pressed;
        },
        enumerable: true,
        configurable: true
    });
    return Character;
}(GameObject_1.default));
exports.default = Character;
