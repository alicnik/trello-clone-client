import * as styles from './dot.css'

interface DotProps {
  selected: boolean;
  index: number;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Dot = ({ selected, onClick, index }: DotProps) => {
  return (
    <button
      id={index.toString()}
      onClick={onClick}
      className={styles.dot}
      style={{
        backgroundColor: selected ? 'rgb(0, 184, 217)' : 'rgb(23, 43, 77)',
        width: selected ? '3.75rem' : '0.5rem',
      }}
    />
  );
};
