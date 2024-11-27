const API_URL = 'https://localhost:7126/api/Stock';

export const getStocks = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching stocks:', error);
      return [];
    }
  };

export const getStockById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return await response.json();
};

export const createStock = async (newStock) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newStock),
  });
  return await response.json();
};

export const updateStock = async (id, updatedStock) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedStock),
  });
};

export const deleteStock = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};
