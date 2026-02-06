import * as React from 'react';

export function useClickOutside(handlerCallback: (e: MouseEvent) => void) {
  const handleClickOutsideRef = React.useRef<(e: MouseEvent) => void>(null);

  React.useEffect(() => {
    if (handleClickOutsideRef.current) {
      window.removeEventListener('mousedown', handleClickOutsideRef.current);
    }
    window.addEventListener('mousedown', handlerCallback);
    handleClickOutsideRef.current = handlerCallback;
    return () => {
      if (handleClickOutsideRef.current) {
        window.removeEventListener('mousedown', handleClickOutsideRef.current);
      }
      window.removeEventListener('mousedown', handlerCallback);
    };
  }, [handlerCallback]);
}
