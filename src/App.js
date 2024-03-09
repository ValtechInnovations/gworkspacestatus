// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';


function App() {
  const [productData, setProductData] = useState([]);
  
  
      useEffect(() => {
          fetch('https://gworkspacestatus.pythonanywhere.com/get_json')
              .then(response => response.json())
              .then(data => {
                  const productsToDisplay = ["Classroom", "Gmail", "Google Calendar", "Google Chat", "Google Docs", "Google Drive", "Google Meet", "Google Sheets", "Google Slides"];
                  const filteredData = data.filter(product => productsToDisplay.includes(product.product_name));
                  setProductData(filteredData);
              })
              .catch(error => console.error('Error fetching data:', error));
      }, []);

      
          const getStatusIcon = (statusContainerLabel, endMarkerLabel) => {
              if (statusContainerLabel === "Disruption status") {
                  return <img src="cross_icon.png" className="icon" alt="Disruption" />;
              } else if (statusContainerLabel === "Available status" && endMarkerLabel === "Available status") {
                  return <img src="check_icon.png" className="icon" alt="Available" />;
              } else {
                  return null; // No icon
              }
          };

  return (
    <div className="container"> {/* Wrap the table in a container for Bootstrap styling */}
    <h1 className="mt-4 mb-3">Product Status</h1> {/* Add margin to the heading */}
    <table className="table"> {/* Add Bootstrap table class */}
      <thead className="thead-dark"> {/* Add dark background to the table header */}
        <tr>
          <th>Product Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {productData.map(product => (
          <tr key={product.product_name}>
            <td>{product.product_name}</td>
            <td>{getStatusIcon(product.status_container_label, product.end_marker_label)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

export default App;
