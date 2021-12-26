import * as React from 'react';
import * as Popover from '@radix-ui/react-popover';
import * as styles from './navbar-item.css';
import { VscChromeClose } from 'react-icons/vsc';
import { HiOutlineChevronDown } from 'react-icons/hi';
import clsx from 'clsx';

interface NavbarItemProps {
  title: string;
  label: string;
  withChevron?: boolean;
  className?: string;
}

const NavbarContext = React.createContext<NavbarContextValue | null>(null);

interface NavbarContextValue {
  closeDropdown: () => void;
}

export function NavbarItem({
  title,
  label,
  children,
  className,
  withChevron = true,
}: React.PropsWithChildren<NavbarItemProps>) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef(null);
  const [hasInteractedOutside, setHasInteractedOutside] = React.useState(false);

  return (
    <NavbarContext.Provider value={{ closeDropdown: () => setOpen(false) }}>
      <Popover.Root modal={false} open={open}>
        <Popover.Trigger asChild>
          <li
            className={clsx(styles.listItem, className)}
            ref={triggerRef}
            onClick={() => {
              if (hasInteractedOutside) {
                setHasInteractedOutside(false);
                return;
              }
              setOpen(!open);
            }}
          >
            {title}
            {withChevron && (
              <HiOutlineChevronDown className={styles.downChevron} />
            )}
          </li>
        </Popover.Trigger>
        <Popover.Content
          className={styles.content}
          sideOffset={15}
          align="start"
          onInteractOutside={(e) => {
            const target = e.target as HTMLElement;
            const isTriggerElement =
              target === triggerRef.current ||
              target.parentElement === triggerRef.current ||
              target.parentElement?.parentElement === triggerRef.current;
            if (isTriggerElement) {
              setHasInteractedOutside(true);
            }
            setOpen(false);
          }}
        >
          <header className={styles.labelContainer}>
            <div className={styles.label}>{label}</div>
            <span className={styles.closeButton} onClick={() => setOpen(false)}>
              <VscChromeClose />
            </span>
          </header>
          {children}
        </Popover.Content>
      </Popover.Root>
    </NavbarContext.Provider>
  );
}

export function useNavbarContext() {
  const context = React.useContext(NavbarContext);
  if (!context) {
    throw new Error('You need to be in a NavbarContext Provider');
  }
  return context;
}
