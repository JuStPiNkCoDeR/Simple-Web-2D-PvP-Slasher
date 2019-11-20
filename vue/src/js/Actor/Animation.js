import ResourcesLoader from '../ResourceLoader';
import Directions from './Directions';
var Animation = /** @class */ (function () {
    function Animation(url, framesAmount, duration, sizeX, sizeY, direction) {
        if (direction === void 0) { direction = Directions.Horizontal; }
        var _ = this;
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
            .then(function (result) {
            _._sheet = result[url];
            _._ready = true;
        });
    }
    Animation.prototype.getCurrentFrame = function (time) {
        if (!this._ready)
            return null;
        this._time += time;
        if (this._time > this._duration)
            this._time -= this._duration;
        var index = Math.floor(this._time / this._durationPerFrame);
        if (index > this._framesAmount - 1)
            index = 0;
        var sx = (this._direction === Directions.Horizontal) ? index * this._x : 0;
        var sy = (this._direction === Directions.Vectival) ? index * this._y : 0;
        return {
            sheet: this._sheet,
            sx: sx,
            sy: sy,
            sWidth: this._x,
            sHeight: this._y
        };
    };
    return Animation;
}());
export default Animation;
//# sourceMappingURL=Animation.js.map