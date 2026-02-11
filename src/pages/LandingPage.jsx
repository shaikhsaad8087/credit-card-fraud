import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ShieldCheck, Zap, BarChart3, ArrowRight } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="container hero-container animate-fade-in-up">
                    <div className="hero-content">
                        <span className="badge">Advanced Fraud Prevention</span>
                        <h1>Securing Your <span>Financial Transactions</span> with AI</h1>
                        <p>
                            Leverage state-of-the-art machine learning to detect and prevent credit card fraud in real-time.
                            Our system analyzes patterns to distinguish legitimate activity from suspicious threats.
                        </p>
                        <div className="hero-btns">
                            <Link to="/predict" className="btn-primary-large">
                                Analyze Transaction <ArrowRight size={20} />
                            </Link>
                            <Link to="/dashboard" className="btn-secondary">
                                View History
                            </Link>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="card-mockup glass">
                            <div className="card-header">
                                <ShieldCheck color="var(--success)" size={48} />
                                <div>
                                    <h3>Live Protection</h3>
                                    <p>System Online</p>
                                </div>
                            </div>
                            <div className="card-stats">
                                <div className="stat">
                                    <span className="stat-label">Accuracy</span>
                                    <span className="stat-value">99.8%</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-label">Latency</span>
                                    <span className="stat-value">&lt; 50ms</span>
                                </div>
                            </div>
                            <div className="radar-animation">
                                <div className="circle circle-1"></div>
                                <div className="circle circle-2"></div>
                                <div className="circle circle-3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <div className="container">
                    <div className="section-header">
                        <h2>Why Choose <span>FraudShield AI</span>?</h2>
                        <p>Built with enterprise-grade security and modern machine learning architectures.</p>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card glass">
                            <Zap className="feature-icon" color="#f59e0b" />
                            <h3>Real-time Detection</h3>
                            <p>Process thousands of transactions per second with sub-millisecond latency.</p>
                        </div>
                        <div className="feature-card glass">
                            <ShieldCheck className="feature-icon" color="#10b981" />
                            <h3>Smart Analysis</h3>
                            <p>Identify sophisticated fraud patterns that traditional rule-based systems miss.</p>
                        </div>
                        <div className="feature-card glass">
                            <BarChart3 className="feature-icon" color="#3b82f6" />
                            <h3>Actionable Insights</h3>
                            <p>Detailed reports and dashboarding to understand transaction trends and risks.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
