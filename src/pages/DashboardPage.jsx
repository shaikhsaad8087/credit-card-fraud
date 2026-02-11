import React, { useState, useEffect } from 'react';
import { ShieldAlert, ShieldCheck, Trash2, Filter, Download } from 'lucide-react';
import { getHistory, clearHistoryData } from '../utils/storage';
import './DashboardPage.css';

const DashboardPage = () => {
    const [history, setHistory] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        setHistory(getHistory());
    }, []);

    const clearHistory = () => {
        if (window.confirm('Are you sure you want to clear all history?')) {
            clearHistoryData();
            setHistory([]);
        }
    };

    const filteredHistory = history.filter(item => {
        if (filter === 'all') return true;
        return item.prediction.toLowerCase() === filter;
    });

    return (
        <div className="dashboard-page">
            <div className="container">
                <div className="dashboard-header animate-fade-in-up">
                    <div>
                        <h1>Security <span>Intelligence</span></h1>
                        <p>Monitor previous transaction analyses and trends.</p>
                    </div>
                    <div className="dashboard-actions">
                        <button className="btn-icon" onClick={clearHistory}>
                            <Trash2 size={20} /> Clear
                        </button>
                        <button className="btn-icon">
                            <Download size={20} /> Export
                        </button>
                    </div>
                </div>

                <div className="stats-grid">
                    <div className="stat-card glass animate-fade-in-up">
                        <span className="label">Total Analyzed</span>
                        <span className="value">{history.length}</span>
                    </div>
                    <div className="stat-card glass animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <span className="label">Flagged Fraud</span>
                        <span className="value danger">{history.filter(h => h.prediction.toLowerCase() === 'fraud').length}</span>
                    </div>
                    <div className="stat-card glass animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <span className="label">Verified Legit</span>
                        <span className="value success">{history.filter(h => h.prediction.toLowerCase() === 'legit').length}</span>
                    </div>
                </div>

                <div className="history-section glass animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <div className="table-header">
                        <h3>Recent Analysis</h3>
                        <div className="table-filters">
                            <button
                                className={filter === 'all' ? 'active' : ''}
                                onClick={() => setFilter('all')}
                            >All</button>
                            <button
                                className={filter === 'fraud' ? 'active' : ''}
                                onClick={() => setFilter('fraud')}
                            >Fraud</button>
                            <button
                                className={filter === 'legit' ? 'active' : ''}
                                onClick={() => setFilter('legit')}
                            >Legit</button>
                        </div>
                    </div>

                    <div className="table-container">
                        {filteredHistory.length > 0 ? (
                            <table className="premium-table">
                                <thead>
                                    <tr>
                                        <th>Date & Time</th>
                                        <th>Merchant</th>
                                        <th>Category</th>
                                        <th>Amount</th>
                                        <th>Result</th>
                                        <th>Confidence</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredHistory.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <div className="datetime">
                                                    <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                                                    <span className="small">{new Date(item.timestamp).toLocaleTimeString()}</span>
                                                </div>
                                            </td>
                                            <td>{item.merchant}</td>
                                            <td>{item.category}</td>
                                            <td className="amount">${parseFloat(item.amount).toFixed(2)}</td>
                                            <td>
                                                <span className={`status-pill small ${item.prediction.toLowerCase() === 'fraud' ? 'fraud' : 'legit'}`}>
                                                    {item.prediction.toLowerCase() === 'fraud' ? <ShieldAlert size={14} /> : <ShieldCheck size={14} />}
                                                    {item.prediction}
                                                </span>
                                            </td>
                                            <td>{(item.confidence * 100).toFixed(1)}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="empty-state">
                                <p>No transaction history found. Start by analyzing a transaction.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
