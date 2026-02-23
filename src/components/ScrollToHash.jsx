import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    const { hash } = location;

    const t = window.setTimeout(() => {
      if (!hash) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        return;
      }

      const id = decodeURIComponent(hash.replace(/^#/, ''));
      const el = document.getElementById(id);
      if (!el) return;

      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);

    return () => window.clearTimeout(t);
  }, [location]);

  return null;
};

export default ScrollToHash;

