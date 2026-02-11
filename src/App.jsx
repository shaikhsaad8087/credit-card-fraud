import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import PredictionPage from './pages/PredictionPage';
import DashboardPage from './pages/DashboardPage';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <main style={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/predict" element={<PredictionPage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
