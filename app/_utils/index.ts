import {
  COLS,
  END,
  ENDCOL,
  ENDROW,
  PATH,
  ROWS,
  START,
  STARTCOL,
  STARTROW,
  VISITED,
  WALL,
  directionOfBFSDFS,
  directions,
} from './constants';
import { Matrix } from '../_types';

export const isInBounds = (row: number, col: number): boolean => {
  return row >= 0 && row < ROWS && col >= 0 && col < COLS;
};

export const deepCopyMaze = (maze: Matrix) => {
  return maze.map((row) => [...row]);
};

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const shuffle = (array: typeof directions) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const curvePath = (matrix: Matrix, row: number, col: number) => {
  matrix[row][col] = PATH;
  const shuffledDirections = shuffle(directions);

  for (const direction of shuffledDirections) {
    const newRow = row + direction.row;
    const newCol = col + direction.col;
    const betweenRow = row + direction.row / 2;
    const betweenCol = col + direction.col / 2;

    if (isInBounds(newRow, newCol) && matrix[newRow][newCol] === WALL) {
      matrix[betweenRow][betweenCol] = PATH;
      curvePath(matrix, newRow, newCol);
    }
  }
};

export const generateMaze = (rows = 10, cols = 10) => {
  const matrix: Matrix = [];

  for (let row = 0; row < rows; row++) {
    const row: string[] = [];
    for (let col = 0; col < cols; col++) {
      row.push(WALL);
    }
    matrix.push(row);
  }

  curvePath(matrix, 1, 1);

  matrix[STARTROW][STARTCOL] = START;
  matrix[ENDROW][ENDCOL] = END;

  return matrix;
};

export const sound = (flag: 'step' | 'final') => {
  if (flag === 'step') {
    const audio = new Audio('/step.mp3');
    audio.play();
  } else {
    const audio = new Audio('/game-over.mp3');
    audio.play();
  }
};
