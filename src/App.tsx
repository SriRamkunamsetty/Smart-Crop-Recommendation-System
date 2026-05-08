import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Leaf, BarChart3, FileText, Home as HomeIcon, Cpu, Languages } from 'lucide-react';

import Home from './pages/Home';
import Predict from './pages/Predict';
import Dashboard from './pages/Dashboard';
import Documentation from './pages/Documentation';
import Train from './pages/Train';
import { useLanguage } from './lib/LanguageContext';

function App() {
  const { lang, setLang, t } = useLanguage();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
        
        {/* Navbar */}
        <nav className="bg-emerald-700 text-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center space-x-2 font-bold text-xl tracking-tight">
                <Leaf className="h-6 w-6 text-emerald-300" />
                <span>AgriSmart AI</span>
              </Link>
              
              <div className="flex items-center space-x-1 sm:space-x-4">
                <Link to="/" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-emerald-600 transition-colors">
                  <HomeIcon className="h-4 w-4" />
                  <span className="hidden sm:inline font-medium">{t('nav.home')}</span>
                </Link>
                <Link to="/predict" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-emerald-600 transition-colors">
                  <Leaf className="h-4 w-4" />
                  <span className="hidden sm:inline font-medium">{t('nav.predict')}</span>
                </Link>
                <Link to="/train" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-emerald-600 transition-colors">
                  <Cpu className="h-4 w-4" />
                  <span className="hidden sm:inline font-medium">{t('nav.train')}</span>
                </Link>
                <Link to="/dashboard" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-emerald-600 transition-colors">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline font-medium">{t('nav.dashboard')}</span>
                </Link>
                <Link to="/docs" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-emerald-600 transition-colors">
                  <FileText className="h-4 w-4" />
                  <span className="hidden lg:inline font-medium">{t('nav.report')}</span>
                </Link>
                
                <div className="pl-2 ml-2 border-l border-emerald-600 flex items-center">
                  <button 
                    onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
                    className="flex items-center space-x-1 px-2 py-1.5 rounded-md text-emerald-100 hover:text-white hover:bg-emerald-600 transition-colors"
                  >
                    <Languages className="h-4 w-4" />
                    <span className="text-sm font-bold uppercase">{lang}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/predict" element={<Predict />} />
            <Route path="/train" element={<Train />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/docs" element={<Documentation />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-emerald-950 text-emerald-200 py-8 text-center text-sm">
          <p>© {new Date().getFullYear()} Smart Crop Recommendation System. All rights reserved.</p>
          <p className="mt-2 text-emerald-400">Designed for Indian Farmers</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
