import React, { useEffect, useState } from 'react';
import { getStocks, deleteStock, createStock, updateStock } from './services/api';
import './StockList.css';

const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState('');
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isModifyFormOpen, setIsModifyFormOpen] = useState(false);
  const [currentStock, setCurrentStock] = useState({ Name: '', Amount: 0, Category: '' });
  const [stockToModify, setStockToModify] = useState(null);
  const [deletingStockId, setDeletingStockId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getStocks();
        setStocks(result);
      } catch (error) {
        setError('Failed to fetch stocks.');
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  const handleAdd = async () => {
    try {
      await createStock(currentStock);
      setStocks([...stocks, currentStock]);
      setIsAddFormOpen(false);
    } catch (error) {
      console.error('Error adding stock:', error);
    }
  };

  const handleModify = async () => {
    try {
      await updateStock(stockToModify.Id, currentStock);
      setStocks(
        stocks.map((stock) =>
          stock.Id === stockToModify.Id ? { ...stock, ...currentStock } : stock
        )
      );
      setIsModifyFormOpen(false);
    } catch (error) {
      console.error('Error modifying stock:', error);
    }
  };

  const handleDelete = async (id) => {
    setDeletingStockId(id);
    setTimeout(async () => {
      try {
        await deleteStock(id);
        setStocks(stocks.filter((stock) => stock.Id !== id));
        setDeletingStockId(null);
      } catch (error) {
        console.error('Error deleting stock:', error);
      }
    }, 300); // Delay to allow animation to complete
  };

  return (
    <div className="container">
      <h1>Stock Manager</h1>
      <button className="button" onClick={() => setIsAddFormOpen(true)}>
        Add Stock
      </button>
      <table className="stock-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr
              key={stock.Id}
              className={deletingStockId === stock.Id ? 'fade-out' : ''}
            >
              <td>{stock.Name}</td>
              <td>{stock.Amount}</td>
              <td>{stock.Category}</td>
              <td>
                <button
                  className="button"
                  onClick={() => {
                    setStockToModify(stock);
                    setCurrentStock(stock);
                    setIsModifyFormOpen(true);
                  }}
                >
                  Modify
                </button>
                <button className="button" onClick={() => handleDelete(stock.Id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Stock Form */}
      {isAddFormOpen && (
        <div className="form-modal slide-in">
          <h2>Add New Stock</h2>
          <input
            type="text"
            placeholder="Name"
            value={currentStock.Name}
            onChange={(e) => setCurrentStock({ ...currentStock, Name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            value={currentStock.Amount}
            onChange={(e) => setCurrentStock({ ...currentStock, Amount: +e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            value={currentStock.Category}
            onChange={(e) => setCurrentStock({ ...currentStock, Category: e.target.value })}
          />
          <button className="button" onClick={handleAdd}>
            Add
          </button>
          <button className="button" onClick={() => setIsAddFormOpen(false)}>
            Cancel
          </button>
        </div>
      )}

      {/* Modify Stock Form */}
      {isModifyFormOpen && (
        <div className="form-modal slide-in">
          <h2>Modify Stock</h2>
          <input
            type="text"
            placeholder="Name"
            value={currentStock.Name}
            onChange={(e) => setCurrentStock({ ...currentStock, Name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            value={currentStock.Amount}
            onChange={(e) => setCurrentStock({ ...currentStock, Amount: +e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            value={currentStock.Category}
            onChange={(e) => setCurrentStock({ ...currentStock, Category: e.target.value })}
          />
          <button className="button" onClick={handleModify}>
            Save
          </button>
          <button className="button" onClick={() => setIsModifyFormOpen(false)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default StockList;
