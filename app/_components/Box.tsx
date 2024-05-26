import classNames from 'classnames';
import React from 'react';
import { END, PATH, START, VISITED, WALL } from '../_utils/constants';

const Box = ({ name }: { name: string }) => {
  return (
    <div
      className={classNames(
        'border-white border w-8 h-8',
        name === WALL && 'bg-black',
        name === PATH && 'bg-white',
        name === START && 'bg-blue-500',
        name === END && 'bg-red-500',
        name === VISITED && 'bg-orange-500',
      )}></div>
  );
};

export default Box;
