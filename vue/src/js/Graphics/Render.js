import Vector from './Vector';
var Direction;
(function (Direction) {
    Direction["BottomToTop"] = "bt";
    Direction["RightToLeft"] = "rl";
    Direction["TopToBottom"] = "tb";
    Direction["LeftToRight"] = "lr";
})(Direction || (Direction = {}));
function getVector(i, f) {
    var x = f.x - i.x;
    var y = f.y - i.y;
    return new Vector(x, y);
}
function isVectorAtZone(zone, vector) {
    return (vector.x >= 0 && vector.y >= 0) &&
        (vector.x < zone.size.x && vector.y < zone.size.y);
}
function calculateRectWidth(vector, zone, direction) {
    var width = null;
    switch (direction) {
        case Direction.RightToLeft:
            width = vector.x - zone.position.x;
            break;
        case Direction.LeftToRight:
            width = zone.position.x + zone.size.x - vector.x;
            break;
    }
    return width;
}
function calculateRectHeight(vector, zone, direction) {
    var height = null;
    switch (direction) {
        case Direction.BottomToTop:
            height = vector.y - zone.position.y;
            break;
        case Direction.TopToBottom:
            height = zone.position.y + zone.size.y - vector.y;
            break;
    }
    return height;
}
function calculateRectOffsetX(viewPortSizeX, rectSizeX, direction) {
    var offset = null;
    switch (direction) {
        case Direction.LeftToRight:
            offset = 0;
            break;
        case Direction.RightToLeft:
            offset = viewPortSizeX - rectSizeX;
    }
    return offset;
}
function calculateRectOffsetY(viewPortSizeY, rectSizeY, direction) {
    var offset = null;
    switch (direction) {
        case Direction.TopToBottom:
            offset = 0;
            break;
        case Direction.BottomToTop:
            offset = viewPortSizeY - rectSizeY;
            break;
    }
    return offset;
}
function calculateRectOffsets(viewPortSize, rectSize, direction) {
    return new Vector(calculateRectOffsetX(viewPortSize.x, rectSize.x, direction[0]), calculateRectOffsetY(viewPortSize.y, rectSize.y, direction[1]));
}
function calculateRectSize(vector, zone, direction) {
    return new Vector(calculateRectWidth(vector, zone, direction[0]), calculateRectHeight(vector, zone, direction[1]));
}
export default {
    getZonePartData: function (viewPort, zone) {
        var zonePosition = zone.position, zoneSize = zone.size, viewPortPoints = viewPort.endPoints;
        var vector = null;
        var pointsIndex = -1;
        do {
            pointsIndex++;
            var tmpVector = getVector(zonePosition, viewPortPoints[pointsIndex]);
            if (isVectorAtZone(zone, tmpVector))
                vector = viewPortPoints[pointsIndex];
        } while (vector === null && pointsIndex < viewPortPoints.length - 1);
        if (vector === null)
            return null;
        var renderDirection;
        switch (pointsIndex) {
            case 0:
                renderDirection = [Direction.RightToLeft, Direction.TopToBottom];
                break;
            case 1:
                renderDirection = [Direction.LeftToRight, Direction.TopToBottom];
                break;
            case 2:
                renderDirection = [Direction.LeftToRight, Direction.BottomToTop];
                break;
            case 3:
                renderDirection = [Direction.RightToLeft, Direction.BottomToTop];
                break;
        }
        var rectSize = calculateRectSize(vector, zone, renderDirection);
        if (rectSize.x === 0 || rectSize.y === 0)
            return null;
        var canvasOffset = calculateRectOffsets(viewPort.size, rectSize, renderDirection);
        return {
            offsets: canvasOffset,
            size: rectSize
        };
    },
    sortByIncreasingY: function (array) {
        function swap(array, a, b) {
            var tmp = array[a];
            array[a] = array[b];
            array[b] = tmp;
        }
        function partition(array, lo, hi) {
            var i = lo, j = hi + 1;
            while (i < j) {
                while (array[++i].position.y + array[i].size.y < array[lo].position.y + array[lo].size.y) {
                    if (i == hi)
                        break;
                }
                while (array[--j].position.y + array[j].size.y > array[lo].position.y + array[lo].size.y) {
                    if (j == lo)
                        break;
                }
                if (i >= j)
                    break;
                swap(array, i, j);
            }
            swap(array, lo, j);
            return j;
        }
        function sort(array, lo, hi) {
            if (hi <= lo)
                return;
            var j = partition(array, lo, hi);
            sort(array, lo, j - 1);
            sort(array, j + 1, hi);
        }
        sort(array, 0, array.length - 1);
        return array;
    }
};
//# sourceMappingURL=Render.js.map