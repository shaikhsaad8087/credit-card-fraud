import React from 'react';
import { AlertTriangle, CheckCircle2, ShieldAlert, ShieldCheck, ArrowLeft, RotateCcw } from 'lucide-react';
import './PredictionResult.css';

const PredictionResult = ({ result, onReset }) => {
    const isFraud = result.prediction.toLowerCase() === 'fraud';

    return (
        <div className={`prediction-result animate-fade-in-up ${isFraud ? 'is-fraud' : 'is-legit'}`}>
            <div className="result-card glass">
                <div className="result-icon-container">
                    {isFraud ? (
                        <div className="icon-wrapper fraud">
                            <ShieldAlert size={64} />
                        </div>
                    ) : (
                        <div className="icon-wrapper legit">
                            <ShieldCheck size={64} />
                        </div>
                    )}
                </div>

                <div className="result-content">
                    <h3>
                        {isFraud ? 'Fraudulent Transaction Detected' : 'Transaction Verified Legit'}
                    </h3>
                    <p className="description">
                        {isFraud
                            ? 'Our AI model has flagged this transaction as highly suspicious. We recommend blocking this transaction immediately.'
                            : 'Our AI model has analyzed the transaction patterns and found them to be consistent with legitimate behavior.'}
                    </p>

                    <div className="result-details">
                        <div className="detail-item">
                            <span className="label">Confidence Score</span>
                            <span className="value">{(result.confidence * 100).toFixed(2)}%</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Status</span>
                            <span className={`status-pill ${isFraud ? 'fraud' : 'legit'}`}>
                                {isFraud ? 'High Risk' : 'Secure'}
                            </span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Analyzed At</span>
                            <span className="value">{new Date(result.timestamp).toLocaleTimeString()}</span>
                        </div>
                    </div>

                    <div className="result-actions">
                        <button onClick={onReset} className="btn-outline">
                            <RotateCcw size={18} /> Analyze Another
                        </button>
                        <button className={`btn-action ${isFraud ? 'fraud' : 'legit'}`}>
                            {isFraud ? 'Flag Transaction' : 'Approve Transaction'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PredictionResult;
