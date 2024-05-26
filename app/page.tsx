'use client';

import dynamic from 'next/dynamic';
import { deepCopyMaze, generateMaze } from './_utils';
import {
  COLS,
  END,
  PATH,
  ROWS,
  START,
  VISITED,
  WALL,
} from './_utils/constants';
import Button from './_components/Button';
import { useRef, useState } from 'react';
import { bfs, dfs } from './_utils/algorithm';
const Box = dynamic(() => import('./_components/Box'), {
  ssr: false,
  loading: () => <div className='border-white border w-10 h-10'></div>,
});

export default function Home() {
  const initialMaze = useRef(generateMaze(ROWS, COLS));
  const [maze, setMaze] = useState(initialMaze.current);

  const handleReShuffle = () => {
    const newMaze = generateMaze(ROWS, COLS);
    initialMaze.current = newMaze;
    setMaze(newMaze);
  };

  const handleReset = () => {
    setMaze([...initialMaze.current]);
  };

  const flattedMaze = maze.flat();

  return (
    <div className='flex flex-col justify-center items-center gap-5 bg-pink-100 p-10 w-full min-h-screen'>
      <div className='flex gap-8'>
        <Button onClick={handleReShuffle}>Re Shuffle</Button>
        <Button onClick={handleReset}>Reset</Button>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        }}>
        {flattedMaze.map((row, index) => (
          <Box name={row} key={index} />
        ))}
      </div>

      <div className='flex gap-8'>
        <Button
          onClick={async () => {
            const matrix = (await bfs(deepCopyMaze(maze), setMaze)) ?? [];
            setMaze(() => [...matrix]);
          }}>
          BFS
        </Button>

        <Button
          onClick={async () => {
            const matrix = (await dfs(deepCopyMaze(maze), setMaze)) ?? [];
            setMaze(() => [...matrix]);
          }}>
          DFS
        </Button>
      </div>
    </div>
  );
}
