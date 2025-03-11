import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Data {
  id: number;
  name: string; // Replace with your actual column names
}

const DataComponent: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from the backend
    axios
      .get('http://localhost:5000/dragons')
      .then((response) => {
        setData(response.data); // Store the fetched data
      })
      .catch((err) => {
        setError('Error fetching data');
        console.error(err);
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Data from PostgreSQL Database</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li> // Adjust based on your data structure
        ))}
      </ul>
    </div>
  );
};

export default DataComponent;