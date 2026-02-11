export const saveToHistory = (entry) => {
    try {
        const history = JSON.parse(localStorage.getItem('fraud_history') || '[]');
        const newEntry = {
            ...entry,
            id: Date.now(),
            timestamp: entry.timestamp || new Date().toISOString()
        };
        const updatedHistory = [newEntry, ...history].slice(0, 50);
        localStorage.setItem('fraud_history', JSON.stringify(updatedHistory));
        return updatedHistory;
    } catch (error) {
        console.error('Error saving to history:', error);
        return [];
    }
};

export const getHistory = () => {
    try {
        return JSON.parse(localStorage.getItem('fraud_history') || '[]');
    } catch (error) {
        console.error('Error getting history:', error);
        return [];
    }
};

export const clearHistoryData = () => {
    localStorage.removeItem('fraud_history');
};
