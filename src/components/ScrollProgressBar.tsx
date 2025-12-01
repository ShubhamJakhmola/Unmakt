import { useEffect, useState } from 'react';

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const updateProgress = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const doc = document.documentElement;
        const total = doc.scrollHeight - window.innerHeight || 1;
        const value = Math.min(100, Math.max(0, (window.scrollY / total) * 100));
        setProgress(value);
        ticking = false;
      });
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div
      className="fixed top-20 left-0 h-1 bg-gradient-to-r from-unmakt-1 via-unmakt-2 to-unmakt-3 transition-[width] duration-150 ease-out z-40 pointer-events-none"
      style={{ width: `${progress}%` }}
    />
  );
}

