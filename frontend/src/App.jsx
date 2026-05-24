import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/motion/PageTransition';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import CustomizerPage from './pages/CustomizerPage';
import CatalogPage from './pages/CatalogPage';
import QRPage from './pages/QRPage';
import AdminPage from './pages/AdminPage';
import MundialHubPage from './pages/MundialHubPage';

export default function App() {
  const location = useLocation();
  const isAdminArea = location.pathname.startsWith('/admin');

  return (
    <div
      className={`min-h-screen text-[var(--text-primary)]${
        isAdminArea ? '' : ' bg-page'
      }`}
    >
      {!isAdminArea && <Navbar />}
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <LandingPage />
                </PageTransition>
              }
            />
            <Route
              path="/personalizar"
              element={
                <PageTransition>
                  <CustomizerPage />
                </PageTransition>
              }
            />
            <Route
              path="/catalogo"
              element={
                <PageTransition>
                  <CatalogPage />
                </PageTransition>
              }
            />
            <Route
              path="/qr"
              element={
                <PageTransition>
                  <QRPage />
                </PageTransition>
              }
            />
            <Route
              path="/mundial"
              element={
                <PageTransition>
                  <MundialHubPage />
                </PageTransition>
              }
            />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      {!isAdminArea && <Footer />}
    </div>
  );
}
