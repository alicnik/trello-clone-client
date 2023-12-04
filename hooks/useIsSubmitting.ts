import * as React from 'react';
import { useRouter } from 'next/router';


export const useIsSubmitting = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      setIsSubmitting(false);
    });
  }, [router]);

  return [isSubmitting, setIsSubmitting] as const;
};