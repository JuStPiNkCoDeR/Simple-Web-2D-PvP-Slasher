export default class Resource {
    private readonly _url: string;
    private readonly _cache;

    constructor(url: string, cache) {
        this._url = url;
        this._cache = cache;
    }

    get url(): string {
        return this._url;
    }

    get cache() {
        return this._cache;
    }
}