import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

const App: React.FC = () => {
  const location = useLocation();
  const isUserPanelRoute = location.pathname.startsWith('/userpanel');

  return (
    <div className="flex flex-col min-h-screen">
      {!isUserPanelRoute && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      {!isUserPanelRoute && <Footer />}

    </div>
  );
};

const AppWrapper: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;