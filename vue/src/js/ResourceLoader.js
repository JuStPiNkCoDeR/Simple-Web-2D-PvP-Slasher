export default {
    load: function (type, resources) {
        let amountOfResources = (resources instanceof Array) ? resources.length : arguments.length - 1;
        let loadedResources = 0;
        let cache = {};

        function _load(url) {
            return new Promise(function (resolve, reject) {
                if (type === 'image') {
                    let img = new Image();
                    img.onload = function () {
                        loadedResources++;
                        resolve(img);
                    };
                    img.onerror = function (err) {
                        reject(err);
                    };
                    img.src = url;
                }
            })
        }

        return new Promise(function (resolve, reject) {
            if (resources instanceof Array) {
                resources.forEach(function (url) {
                    _load(url)
                        .then(result => {
                            cache[url] = result;
                            if (loadedResources === amountOfResources) resolve(cache);
                        })
                        .catch(error => {
                           cache[url] = null;
                           console.log(error);
                        })
                })
            }
        });
    }
}