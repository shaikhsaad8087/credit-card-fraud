import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const predictTransaction = async (data) => {
    try {
        // In a real scenario, this would call the ML backend
        const response = await api.post('/predict', data);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);

        // Fallback for demonstration if API fails/not implemented
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simple mock logic: If amount > 10000 or type is "High Risk", set as Fraud
                const isFraud = data.amount > 10000 || data.type === 'Wire Transfer';
                resolve({
                    prediction: isFraud ? 'Fraud' : 'Legit',
                    confidence: (Math.random() * 0.2 + 0.75).toFixed(4),
                    timestamp: new Date().toISOString()
                });
            }, 1500);
        });
    }
};

export default api;
