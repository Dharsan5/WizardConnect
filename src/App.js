import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { motion } from 'framer-motion';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import SortingHat from './components/SortingHat';
import MagicalLibrary from './pages/MagicalLibrary';
import Duels from './pages/Duels';
import HoloClasses from './pages/HoloClasses';
import WizardNetwork from './pages/WizardNetwork';
import Navbar from './components/Navbar';
import './App.css';
import './styles/WizardStyleLibrary.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App magical-background">
          <Navbar />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="app-content"
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/sorting-hat" element={<SortingHat />} />
              <Route path="/library" element={<MagicalLibrary />} />
              <Route path="/duels" element={<Duels />} />
              <Route path="/holo-classes" element={<HoloClasses />} />
              <Route path="/network" element={<WizardNetwork />} />
            </Routes>
          </motion.div>
          <div className="magical-particles"></div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
