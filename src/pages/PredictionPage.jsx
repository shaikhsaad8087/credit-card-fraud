import React, { useState } from 'react';
import TransactionForm from '../components/TransactionForm';
import PredictionResult from '../components/PredictionResult';
import { predictTransaction } from '../services/api';
import { saveToHistory } from '../utils/storage';
import './PredictionPage.css';

const PredictionPage = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleFormSubmit = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await predictTransaction(formData);
            setResult(data);

            // Save to history using utility
            saveToHistory({ ...formData, ...data });

        } catch (err) {
            setError('An error occurred during prediction. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setResult(null);
        setError(null);
    };

    return (
        <div className="prediction-page">
            <div className="container container-narrow">
                {!result ? (
                    <>
                        <div className="page-header animate-fade-in-up">
                            <h1>Transaction <span>Security Check</span></h1>
                            <p>Run our ML model to evaluate the risk score of any transaction.</p>
                        </div>
                        {error && (
                            <div className="error-banner glass animate-fade-in-up">
                                {error}
                            </div>
                        )}
                        <TransactionForm onSubmit={handleFormSubmit} isLoading={loading} />
                    </>
                ) : (
                    <PredictionResult result={result} onReset={handleReset} />
                )}
            </div>
        </div>
    );
};

export default PredictionPage;
