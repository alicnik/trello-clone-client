import * as popoverStyles from '../popover.css';

interface GridHeaderProps {
  heading: string;
  onClick: () => void;
}

export function GridHeader({ heading, onClick }: GridHeaderProps) {
  return (
    <header className={popoverStyles.gridHeader}>
      <h4 className={popoverStyles.gridHeaderTitle}>{heading}</h4>
      <button className={popoverStyles.seeMoreButton} onClick={onClick}>
        See more
      </button>
    </header>
  );
}
