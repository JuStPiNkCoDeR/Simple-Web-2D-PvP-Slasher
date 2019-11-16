import Vector from '../Graphics/Vector';
import States from './States';
import GameObject from './GameObject';
import SocketManager from '../SocketManager';

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

let pressed = new Set();

function initController() {
    document.addEventListener('keydown', function (event) {
        pressed.add(event.key.toLowerCase());
    });
    document.addEventListener('keyup', function (event) {
        pressed.delete(event.key.toLowerCase());
    });
}

function init(props) {
    if (props.accessToController) initController();
}

export default class Character extends GameObject {
    private movement;
    private readonly _accessToController: boolean;
    public opponentID = null;
    private _pressed = [];

    constructor(pos: Vector, props) {
        super({
            size: new Vector(128, 128),
            position: pos
        });
        this.movement = move.bind(this);

        this._accessToController = props.accessToController;
        init(props);
    }

    goUp() {
        this._position.y -= 5;
        this._sprite.state = States.Walking;
        if (this.opponentID) SocketManager.$emit('hero:game:event', {
            id: this.opponentID,
            event: 'up'
        });
    }

    goDown() {
        this._position.y += 5;
        this._sprite.state = States.Walking;

        if (this.opponentID) {
            SocketManager.$emit('hero:game:event', {
                id: this.opponentID,
                event: 'down'
            });
        }

    }

    goRight() {
        this._position.x += 5;
        this._sprite.state = States.Walking;
        this._sprite.mirror(false);
        if (this.opponentID) SocketManager.$emit('hero:game:event', {
            id: this.opponentID,
            event: 'right'
        });
    }

    goLeft() {
        this._position.x -= 5;
        this._sprite.state = States.Walking;
        this._sprite.mirror(true);
        if (this.opponentID) SocketManager.$emit('hero:game:event', {
            id: this.opponentID,
            event: 'left'
        });
    }

    update() {
        this._sprite.state = States.Idle;
        if (this._accessToController) {
            pressed.forEach((val) => {
                this.movement(val);
            });
        } else {
            this._pressed.forEach((val) => {
                this.movement(val);
            });
            this._pressed = [];
        }
    }

    get pressed() {
        return this._pressed;
    }
}