export enum Direction{
    LEFT= 'left',
    RIGHT= 'right',
    TOP= 'top',
    BOTTOM= 'bottom',
    RIGHT_TOP= 'right-top',
    RIGHT_BOTTOM= 'right-bottom'
};

export function invertDirection(direction: Direction) {
    switch (direction) {
        case Direction.LEFT:
            return Direction.RIGHT;
        case Direction.RIGHT:
        case Direction.RIGHT_TOP:
        case Direction.RIGHT_BOTTOM:
            return Direction.LEFT;
        case Direction.TOP:
            return Direction.BOTTOM;
        case Direction.BOTTOM:
            return Direction.TOP;
        default:
            throw new Error('Invalid direction');
    }
}