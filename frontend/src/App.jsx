import { useLocation } from 'react-router-dom';
import AnimatedRoutes from './components/motion/AnimatedRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import CustomizerPage from './pages/CustomizerPage';
import CatalogPage from './pages/CatalogPage';
import QRPage from './pages/QRPage';
import AdminPage from './pages/AdminPage';
import MundialHubPage from './pages/MundialHubPage';

const publicRoutes = [
  { path: '/', element: <LandingPage /> },
  { path: '/personalizar', element: <CustomizerPage /> },
  { path: '/catalogo', element: <CatalogPage /> },
  { path: '/qr', element: <QRPage /> },
  { path: '/mundial', element: <MundialHubPage /> },
];

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
      <main className="main-routes">
        {isAdminArea ? <AdminPage /> : <AnimatedRoutes routes={publicRoutes} />}
      </main>
      {!isAdminArea && <Footer />}
    </div>
  );
}
