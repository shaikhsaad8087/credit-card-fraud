import React, { useState } from 'react';
import { CreditCard, DollarSign, Clock, Tag, ShoppingBag, Plus, Trash2 } from 'lucide-react';
import './TransactionForm.css';

const TransactionForm = ({ onSubmit, isLoading }) => {
    const [formData, setFormData] = useState({
        amount: '',
        time: '',
        type: 'Purchase',
        category: 'Retail',
        merchant: '',
        v_features: {} // For potential PCA features from the ML model
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.amount || formData.amount <= 0) newErrors.amount = 'Valid amount is required';
        if (!formData.time) newErrors.time = 'Time is required';
        if (!formData.merchant) newErrors.merchant = 'Merchant name is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    return (
        <div className="transaction-form-container glass">
            <div className="form-header">
                <CreditCard className="header-icon" />
                <h2>Transaction Analysis</h2>
                <p>Enter transaction details to check for fraudulent activity.</p>
            </div>

            <form onSubmit={handleSubmit} className="premium-form">
                <div className="form-grid">
                    <div className={`form-group ${errors.amount ? 'has-error' : ''}`}>
                        <label><DollarSign size={16} /> Amount (USD)</label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="e.g. 199.99"
                            step="0.01"
                        />
                        {errors.amount && <span className="error-text">{errors.amount}</span>}
                    </div>

                    <div className={`form-group ${errors.time ? 'has-error' : ''}`}>
                        <label><Clock size={16} /> Transaction Time (Hours)</label>
                        <input
                            type="number"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            placeholder="0-24"
                            min="0"
                            max="24"
                        />
                        {errors.time && <span className="error-text">{errors.time}</span>}
                    </div>

                    <div className="form-group">
                        <label><Tag size={16} /> Transaction Type</label>
                        <select name="type" value={formData.type} onChange={handleChange}>
                            <option value="Purchase">Purchase</option>
                            <option value="Withdrawal">Withdrawal</option>
                            <option value="Transfer">Transfer</option>
                            <option value="Wire Transfer">Wire Transfer</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label><ShoppingBag size={16} /> Merchant Category</label>
                        <select name="category" value={formData.category} onChange={handleChange}>
                            <option value="Retail">Retail</option>
                            <option value="Travel">Travel</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Food & Dining">Food & Dining</option>
                            <option value="Services">Services</option>
                            <option value="Online Store">Online Store</option>
                        </select>
                    </div>

                    <div className={`form-group full-width ${errors.merchant ? 'has-error' : ''}`}>
                        <label>Merchant Name / Description</label>
                        <input
                            type="text"
                            name="merchant"
                            value={formData.merchant}
                            onChange={handleChange}
                            placeholder="e.g. Amazon, Starbucks"
                        />
                        {errors.merchant && <span className="error-text">{errors.merchant}</span>}
                    </div>
                </div>

                <button type="submit" className="btn-submit" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <div className="spinner"></div>
                            <span>Processing...</span>
                        </>
                    ) : (
                        'Run AI Analysis'
                    )}
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;
