var Resource = /** @class */ (function () {
    function Resource(url, cache) {
        this._url = url;
        this._cache = cache;
    }
    Object.defineProperty(Resource.prototype, "url", {
        get: function () {
            return this._url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Resource.prototype, "cache", {
        get: function () {
            return this._cache;
        },
        enumerable: true,
        configurable: true
    });
    return Resource;
}());
export default Resource;
//# sourceMappingURL=Resource.js.map