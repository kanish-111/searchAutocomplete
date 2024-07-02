import React, { useState, useEffect } from 'react';
import './App.css';
import background from './background.jpg';
import { searchAlbums } from './utils/utils';
import Result from './components/Result'; // Import the Result component

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch('/data.json') // Ensure this path is correct
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        console.log(data); // Log the JSON data once loaded
      })
      .catch(error => {
        console.error('Error fetching the data:', error);
      });
  }, []);

  const handleInputChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.length > 3) {
      const searchResults = searchAlbums(data, term);
      setResults(searchResults);
      console.log(searchResults);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${background})`, backgroundPositionX: 'center', backgroundPositionY: 'bottom', backgroundSize: 'cover' }}>
      <div className="main">
        <div className="title">ALBUM SEARCH</div>
        <div className="box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          {results.length > 0 && (
            <ul className="results-list">
              {results.map((result, index) => (
                <Result key={index} result={result} searchTerm={searchTerm} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
