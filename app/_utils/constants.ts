export const WALL = 'wall';
export const PATH = 'path';
export const START = 'start';
export const END = 'end';
export const VISITED = 'visited';

export const ROWS = 12;
export const COLS = 12;

export const ENDROW = ROWS - 2;
export const ENDCOL = COLS - 1;
export const STARTROW = 1;
export const STARTCOL = 0;

export const directions = [
  {
    row: -2,
    col: 0,
  },
  {
    row: 2,
    col: 0,
  },
  {
    row: 0,
    col: -2,
  },
  {
    row: 0,
    col: 2,
  },
];

export const directionOfBFSDFS = [
  { row: -1, col: 0 }, // up
  { row: 1, col: 0 }, // down
  { row: 0, col: -1 }, // left
  { row: 0, col: 1 }, // right
];
