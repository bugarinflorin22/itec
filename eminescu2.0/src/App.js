import './App.css';
import React, {useState} from 'react';

function App() {
  const [backEndData, setBackendData] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch('http://localhost:1616/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: backEndData,
      }),
    })
    .then((res) => res.json())
    .then((data) => setBackendData(data.message))
  };

  return (
  <div className="App">
    <form onSubmit={handleSubmit}>
      <label htmlFor="message">Message</label>
      <textarea id="message" value={backEndData} onChange={(e) => setBackendData(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
    <div>{backEndData}</div>
  </div>
  );
}

export default App;

