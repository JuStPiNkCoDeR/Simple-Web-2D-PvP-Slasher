import Vector from './Vector';
import Resource from '../Resource';
import ResourceLoader from '../ResourceLoader';

export default class Zone {
    private _name: string;
    private _position: Vector;
    private _size: Vector;
    private _isReady: boolean;
    private _background: Resource;

    constructor(props) {
        let _ = this;
        this._isReady = false;
        this._name = props.name;
        this._position = props.position;
        this._size = props.size;

        ResourceLoader.load('image', [props.background])
            .then(result => {
                _._background = new Resource(
                    props.background,
                    result[props.background]
                );
                _._isReady = true;
            })
    }

    public getPosition(): Vector {
        return this._position;
    }

    public getSize(): Vector {
        return this._size;
    }

    public getBackground(): Resource {
        return this._background;
    }

    get position(): Vector {
        return this._position;
    }

    get size(): Vector {
        return this._size;
    }

    get background(): Resource {
        if (!this._isReady) return null;
        else return this._background;
    }

    set position(value: Vector) {
        this._position = value;
    }

    set size(value: Vector) {
        this._size = value;
    }
}