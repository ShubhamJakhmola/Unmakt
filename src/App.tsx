import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
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

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const { user } = useAuth();

  useEffect(() => {
    // Handle SPA navigation requests (from components) and push history state
    const handleNavigate = (e: CustomEvent) => {
      const page = e.detail;
      setCurrentPage(page);
      try {
        const url = page === 'home' ? '/' : `/${page}`;
        // push a new history entry so back/forward work
        window.history.pushState({ page }, '', url);
      } catch (err) {
        // ignore history errors in exotic environments
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('navigate', handleNavigate as EventListener);

    // Popstate handler: update app state when user uses back/forward buttons
    const onPopState = (ev: PopStateEvent) => {
      const page = (ev.state && (ev.state as any).page) || (window.location.pathname === '/' ? 'home' : window.location.pathname.replace(/^\//, ''));
      setCurrentPage(page);
    };
    window.addEventListener('popstate', onPopState);

    // Replace initial history state to include current page
    try {
      window.history.replaceState({ page: currentPage }, '', window.location.pathname);
    } catch (err) {}

    return () => {
      window.removeEventListener('navigate', handleNavigate as EventListener);
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  useEffect(() => {
    if (user && currentPage === 'login') {
      setCurrentPage('dashboard');
    }
  }, [user, currentPage]);

  const renderPage = () => {
      switch (currentPage) {
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
      case '404':
        return <NotFound />;
      case 'login':
        return <Login />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isAuthenticated={Boolean(user)}
      />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;
