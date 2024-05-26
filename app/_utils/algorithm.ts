import { Dispatch, SetStateAction } from 'react';
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
import { isInBounds, sound, wait } from '.';

export const bfs = async (
  maze: Matrix,
  setMaze: Dispatch<SetStateAction<Matrix>>,
) => {
  const queue: [number, number][] = [[STARTROW, STARTCOL]];
  const visited = new Set<string>();
  visited.add(`${STARTROW},${STARTCOL}`);

  while (queue.length > 0) {
    const [row, col] = queue.shift()!;
    visited.add(`${row},${col}`);

    if (row === ENDROW && col === ENDCOL) {
      sound('final');
      return maze;
    }

    maze[row][col] = VISITED;

    if (row === STARTROW && col === STARTCOL) {
      maze[STARTROW][STARTCOL] = START;
    }

    await wait(500);
    setMaze([...maze]);
    sound('step');

    for (const direction of directionOfBFSDFS) {
      const newRow = row + direction.row;
      const newCol = col + direction.col;

      if (
        isInBounds(newRow, newCol) &&
        (maze[newRow][newCol] === PATH || maze[newRow][newCol] === 'end') &&
        !visited.has(`${newRow},${newCol}`)
      ) {
        queue.push([newRow, newCol]);
      }
    }
  }
};

export const dfs = async (
  maze: Matrix,
  setMaze: Dispatch<SetStateAction<Matrix>>,
) => {
  const stack: [number, number][] = [[STARTROW, STARTCOL]];
  const visited = new Set<string>();

  while (stack.length > 0) {
    const [row, col] = stack.pop()!;
    visited.add(`${row},${col}`);

    if (row === ENDROW && col === ENDCOL) {
      sound('final');
      return maze;
    }

    maze[row][col] = VISITED;

    if (row === STARTROW && col === STARTCOL) {
      maze[STARTROW][STARTCOL] = START;
    }

    await wait(500);
    setMaze([...maze]);
    sound('step');

    for (const direction of directionOfBFSDFS) {
      const newRow = row + direction.row;
      const newCol = col + direction.col;
      if (
        isInBounds(newRow, newCol) &&
        (maze[newRow][newCol] === PATH || maze[newRow][newCol] === 'end') &&
        !visited.has(`${newRow},${newCol}`)
      ) {
        stack.push([newRow, newCol]);
      }
    }
  }

  return [];
};
