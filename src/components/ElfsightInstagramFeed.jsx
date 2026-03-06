import React, { useEffect, useMemo } from 'react';

const PLATFORM_SRC = 'https://elfsightcdn.com/platform.js';
const DEFAULT_APP_ID = 'e1077f31-d2f4-4b2c-8d9b-bb2e032f40da';

const ensurePlatformScript = () => {
  if (typeof document === 'undefined') return;
  if (document.querySelector(`script[src="${PLATFORM_SRC}"]`)) return;

  const script = document.createElement('script');
  script.src = PLATFORM_SRC;
  script.async = true;
  document.head.appendChild(script);
};

const ElfsightInstagramFeed = ({ appId = DEFAULT_APP_ID }) => {
  const className = useMemo(() => `elfsight-app-${appId}`, [appId]);

  useEffect(() => {
    ensurePlatformScript();
  }, []);

  // Rendered to match the official embed snippet as close as possible.
  return <div className={className} data-elfsight-app-lazy="" />;
};

export default ElfsightInstagramFeed;

