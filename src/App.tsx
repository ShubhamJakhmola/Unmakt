import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import JoinCommunity from './pages/JoinCommunity';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useAuth } from './context/AuthContext';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const { user } = useAuth();

  useEffect(() => {
    const handleNavigate = (e: CustomEvent) => {
      setCurrentPage(e.detail);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('navigate', handleNavigate as EventListener);
    return () => window.removeEventListener('navigate', handleNavigate as EventListener);
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
