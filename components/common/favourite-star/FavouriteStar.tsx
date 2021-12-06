import * as React from 'react';
import { useFavouriteBoard } from 'hooks/useFavouriteBoard';
import { HiOutlineStar, HiStar } from 'react-icons/hi';
import type { Board } from 'utils/api/types';
import * as styles from './favourite-star.css';
import clsx from 'clsx';

interface FavouriteStarProps {
  board: Board;
  isFavourite: boolean;
}

export function FavouriteStar({ board, isFavourite }: FavouriteStarProps) {
  const mutation = useFavouriteBoard();
  const [isMouseOverFavourite, setIsMouseOverFavourite] = React.useState(false);

  const handleMouseEnter = () => setIsMouseOverFavourite(true);
  const handleMouseLeave = () => setIsMouseOverFavourite(false);

  const handleFavouriteClick = (e: React.MouseEvent<SVGElement>) => {
    console.log('CLIKC');
    e.preventDefault();
    if (!board) return;
    const updatedBoard = { ...board };
    mutation.mutate(updatedBoard);
    setIsMouseOverFavourite(isFavourite);
  };

  if (isMouseOverFavourite && isFavourite) {
    return (
      <HiOutlineStar
        className={styles.star}
        onClick={handleFavouriteClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    );
  }

  if (isFavourite) {
    return (
      <HiStar
        className={clsx(styles.star, styles.favouriteStar)}
        onClick={handleFavouriteClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    );
  }

  return (
    <HiOutlineStar
      className={styles.star}
      onClick={handleFavouriteClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
}
