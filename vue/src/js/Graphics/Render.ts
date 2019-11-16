import Vector from './Vector';
import Zone from './Zone';
import ViewPort from './ViewPort';
import GameObject from "../Actor/GameObject";

enum Direction {
    BottomToTop = "bt", RightToLeft = "rl", TopToBottom = "tb", LeftToRight = "lr"
}

function getVector(i: Vector, f: Vector): Vector {
    let x = f.x - i.x;
    let y = f.y - i.y;

    return new Vector(x, y);
}

function isVectorAtZone(zone: Zone, vector: Vector): boolean {
    return (vector.x >= 0 && vector.y >= 0) &&
        (vector.x < zone.size.x && vector.y < zone.size.y);
}

function calculateRectWidth(vector: Vector, zone: Zone, direction: Direction): number | null {
    let width = null;

    switch (direction) {
        case Direction.RightToLeft:
            width = vector.x - zone.position.x;
            break;
        case Direction.LeftToRight:
            width = zone.position.x + zone.size.x - vector.x;
            break
    }

    return width;
}

function calculateRectHeight(vector: Vector, zone: Zone, direction: Direction): number | null {
    let height = null;

    switch (direction) {
        case Direction.BottomToTop:
            height = vector.y - zone.position.y;
            break;
        case Direction.TopToBottom:
            height = zone.position.y + zone.size.y - vector.y;
            break
    }

    return height;
}

function calculateRectOffsetX(viewPortSizeX: number, rectSizeX: number, direction: Direction): number | null {
    let offset = null;

    switch (direction) {
        case Direction.LeftToRight:
            offset = 0;
            break;
        case Direction.RightToLeft:
            offset = viewPortSizeX - rectSizeX;
    }

    return offset;
}

function calculateRectOffsetY(viewPortSizeY: number, rectSizeY: number, direction: Direction): number | null {
    let offset = null;

    switch (direction) {
        case Direction.TopToBottom:
            offset = 0;
            break;
        case Direction.BottomToTop:
            offset = viewPortSizeY - rectSizeY;
            break
    }

    return offset;
}

function calculateRectOffsets(viewPortSize: Vector, rectSize: Vector, direction: [Direction, Direction]): Vector {
    return new Vector(
        calculateRectOffsetX(viewPortSize.x, rectSize.x, direction[0]),
        calculateRectOffsetY(viewPortSize.y, rectSize.y, direction[1])
    );
}

function calculateRectSize(vector: Vector, zone: Zone, direction: [Direction, Direction]): Vector {
    return new Vector(
        calculateRectWidth(vector, zone, direction[0]),
        calculateRectHeight(vector, zone, direction[1])
    );
}

export default {
    getZonePartData: function (viewPort: ViewPort, zone: Zone) {
        let zonePosition = zone.position,
            zoneSize = zone.size,
            viewPortPoints = viewPort.endPoints;


        let vector = null;
        let pointsIndex = -1;

        do {
            pointsIndex++;

            let tmpVector = getVector(zonePosition, viewPortPoints[pointsIndex]);

            if (isVectorAtZone(zone, tmpVector)) vector = viewPortPoints[pointsIndex];
        } while (vector === null && pointsIndex < viewPortPoints.length - 1);

        if (vector === null) return null;

        let renderDirection: [Direction, Direction];

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
                break
        }

        let rectSize = calculateRectSize(vector, zone, renderDirection);

        if (rectSize.x === 0 || rectSize.y === 0) return null;

        let canvasOffset = calculateRectOffsets(viewPort.size, rectSize, renderDirection);

        return {
            offsets: canvasOffset,
            size: rectSize
        };
    },
    sortByIncreasingY: function (array: Array<GameObject>) {
        function swap(array: Array<GameObject>, a: number, b: number) {
            let tmp = array[a];
            array[a] = array[b];
            array[b] = tmp;
        }

        function partition(array: Array<GameObject>, lo, hi){
            let i = lo, j = hi + 1;

            while(i < j) {
                while(array[++i].position.y < array[lo].position.y){
                    if ( i == hi ) break;
                }
                while (array[--j].position.y > array[lo].position.y){
                    if ( j == lo ) break;
                }
                if (i >= j) break;
                swap(array, i,j);
            }
            swap(array, lo, j);
            return j;
        }

        function sort(array, lo, hi){
            if (hi <= lo) return;
            let j = partition(array, lo, hi);
            sort(array, lo, j-1);
            sort(array, j+1, hi);
        }
        sort(array, 0, array.length - 1);

        return array;
    }
}