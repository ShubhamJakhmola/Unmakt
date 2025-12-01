import { useCallback, useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import ScrollProgressBar from './components/ScrollProgressBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import JoinCommunity from './pages/JoinCommunity';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useAuth } from './context/AuthContext';
import ServiceDetailPage from './pages/ServiceDetailPage';
import { serviceDetailContent, serviceDetailSlugs } from './data/serviceDetails';

const basePages = [
  'home',
  'about',
  'join',
  'contact',
  'privacy',
  'terms',
  'login',
  'dashboard'
];

const validPages = new Set([...basePages, ...serviceDetailSlugs]);

const resolvePageFromLocation = () => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.replace(/\/+$/, '');
  const slug = path === '' || path === '/' ? 'home' : path.replace(/^\//, '');
  return validPages.has(slug) ? slug : '404';
};

function App() {
  const [currentPage, setCurrentPage] = useState(resolvePageFromLocation);
  const { user } = useAuth();

  const navigateTo = useCallback(
    (page: string, options?: { replace?: boolean; scroll?: boolean }) => {
      setCurrentPage(validPages.has(page) ? page : '404');
      if (typeof window === 'undefined') return;

      const url = page === 'home' ? '/' : `/${page}`;
      try {
        if (options?.replace) {
          window.history.replaceState({ page }, '', url);
        } else {
          window.history.pushState({ page }, '', url);
        }
      } catch (err) {
        // ignore history errors in constrained environments
      }

      if (options?.scroll !== false) {
        const behavior = 'scrollBehavior' in document.documentElement.style ? 'smooth' : 'auto';
        window.scrollTo({ top: 0, behavior: behavior as ScrollBehavior });
      }
    },
    []
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Ensure initial history state contains the current page for correct refresh/back behavior
    try {
      window.history.replaceState({ page: currentPage }, '', window.location.pathname + window.location.search + window.location.hash);
    } catch (err) {
      // ignore errors
    }
  }, [currentPage]);

  useEffect(() => {
    const handleNavigateEvent = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      if (customEvent.detail) {
        navigateTo(customEvent.detail);
      }
    };
    window.addEventListener('navigate', handleNavigateEvent as EventListener);

    return () => {
      window.removeEventListener('navigate', handleNavigateEvent as EventListener);
    };
  }, [navigateTo]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const pageFromState = (event.state && (event.state as any).page) || resolvePageFromLocation();
      navigateTo(pageFromState, { replace: true });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigateTo]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  useEffect(() => {
    if (user && currentPage === 'login') {
      navigateTo('dashboard', { replace: true });
    }
  }, [user, currentPage, navigateTo]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'join':
        return <JoinCommunity />;
      case 'contact':
        return <Contact />;
      case 'privacy':
        return <Privacy />;
      case 'terms':
        return <Terms />;
      case 'login':
        return <Login />;
      case 'dashboard':
        return <Dashboard />;
      default:
        if (serviceDetailContent[currentPage]) {
          return <ServiceDetailPage detail={serviceDetailContent[currentPage]} />;
        }
        return <NotFound />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation
        currentPage={currentPage}
        onNavigate={(page) => navigateTo(page)}
        isAuthenticated={Boolean(user)}
      />
      <ScrollProgressBar />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;
