import ResourcesLoader from '../ResourceLoader';
import Directions from './Directions';
import Vector from "../Graphics/Vector";

export default class Animation {
    private _ready: boolean;
    private _url: string;
    private _framesAmount: number;
    private _duration: number;
    private _x: number;
    private _y: number;
    private _direction: Directions;
    private _durationPerFrame: number;
    private _index: number;
    private _time: number;
    private _sheet;

    constructor(url: string, framesAmount: number, duration: number, sizeX: number, sizeY: number, direction: Directions = Directions.Horizontal) {
        let _ = this;
        this._ready = false;
        this._url = url;
        this._framesAmount = framesAmount;
        this._duration = duration;
        this._x = sizeX;
        this._y = sizeY;
        this._direction = direction;
        this._durationPerFrame = duration / framesAmount;
        this._index = 0;
        this._time = 0;

        ResourcesLoader.load('image', [url])
            .then(result => {
                _._sheet = result[url];
                _._ready = true;
            });
    }

    public getCurrentFrame(time: number) {
        if (!this._ready) return null;
        this._time += time;

        if (this._time > this._duration) this._time -= this._duration;

        let index = Math.floor(this._time / this._durationPerFrame);

        let sx = (this._direction === Directions.Horizontal) ? index * this._x : 0;
        let sy = (this._direction === Directions.Vectival) ? index * this._y : 0;

        return {
            sheet: this._sheet,
            sx: sx,
            sy: sy,
            sWidth: this._x,
            sHeight: this._y
        }
    }
}