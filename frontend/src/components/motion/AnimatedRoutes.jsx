import { useEffect, useState } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import PageBallLoader from './PageBallLoader';

const LOADER_MS = 650;

export default function AnimatedRoutes({ routes }) {
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(true);
  const page = useRoutes(routes, location);

  useEffect(() => {
    setShowLoader(true);
    const hideTimer = window.setTimeout(() => setShowLoader(false), LOADER_MS);
    return () => window.clearTimeout(hideTimer);
  }, [location.pathname]);

  useEffect(() => {
    if (!showLoader) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, showLoader]);

  return (
    <>
      <AnimatePresence>{showLoader && <PageBallLoader key="loader" />}</AnimatePresence>

      <motion.div
        key={location.pathname}
        className="page-transition"
        initial={{ opacity: 0 }}
        animate={{ opacity: showLoader ? 0 : 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {page}
      </motion.div>
    </>
  );
}
