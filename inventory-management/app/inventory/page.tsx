"use client";
import { useState } from 'react';

// Mock data - later we will move this to Redux
const initialProducts = [
  { id: '1', name: 'Laptop', category: 'Electronics', quantity: 15, price: 1200, status: 'In Stock' },
  { id: '2', name: 'Desk Chair', category: 'Furniture', quantity: 3, price: 150, status: 'Low Stock' },
];

export default function AdminInventory() {
  const [products, setProducts] = useState(initialProducts);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#1e293b' }}>Inventory Management</h1>
        <button style={{ 
          backgroundColor: '#2563eb', color: 'white', padding: '10px 20px', 
          borderRadius: '6px', border: 'none', cursor: 'pointer' 
        }}>
          + Add New Item
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
        <thead style={{ backgroundColor: '#f1f5f9', textAlign: 'left' }}>
          <tr>
            <th style={tableHeaderStyle}>Product Name</th>
            <th style={tableHeaderStyle}>Category</th>
            <th style={tableHeaderStyle}>Quantity</th>
            <th style={tableHeaderStyle}>Price</th>
            <th style={tableHeaderStyle}>Status</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={tableCellStyle}>{item.name}</td>
              <td style={tableCellStyle}>{item.category}</td>
              <td style={tableCellStyle}>{item.quantity}</td>
              <td style={tableCellStyle}>Rs.{item.price}</td>
              <td style={tableCellStyle}>
                <span style={{ 
                  padding: '4px 8px', borderRadius: '12px', fontSize: '12px',
                  backgroundColor: item.status === 'In Stock' ? '#dcfce7' : '#fef3c7',
                  color: item.status === 'In Stock' ? '#166534' : '#92400e'
                }}>
                  {item.status}
                </span>
              </td>
              <td style={tableCellStyle}>
                <button style={{ marginRight: '10px', color: '#2563eb', border: 'none', background: 'none', cursor: 'pointer' }}>Edit</button>
                <button style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tableHeaderStyle = { padding: '12px 15px', fontWeight: '600', color: '#475569' };
const tableCellStyle = { padding: '12px 15px', color: '#1e293b' };