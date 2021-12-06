import * as Popover from '@radix-ui/react-popover';
import { VscChromeClose, VscChevronLeft } from 'react-icons/vsc';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import * as styles from './popover-header.css';

interface PopoverHeaderProps {
  heading: React.ReactNode;
  showBackButton?: boolean;
  goBack?: () => void;
}

export function PopoverHeader({
  heading,
  showBackButton,
  goBack,
}: PopoverHeaderProps) {
  return (
    <header className={styles.header}>
      {showBackButton ? (
        <span className={styles.backButton} onClick={goBack}>
          <HiOutlineChevronLeft />
        </span>
      ) : null}
      <h3 className={styles.title}>{heading}</h3>
      <Popover.Close className={styles.closeButton} asChild>
        <span>
          <VscChromeClose />
        </span>
      </Popover.Close>
    </header>
  );
}
