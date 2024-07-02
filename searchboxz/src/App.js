import React, { useState, useEffect } from 'react';
import './App.css';
import background from './background.jpg';
import { searchAlbums } from './utils/utils';

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        setData(data);
        console.log(data); // Log the JSON data once loaded
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
                <li key={index} className={`result-${result.type}`}>
                  {result.type === 'album' && (
                    <div>
                      <strong>Album:</strong> {result.title}<br />
                      <strong>Songs:</strong> {result.numberOfSongs}<br />
                      <strong>Description:</strong> {result.description}...
                    </div>
                  )}
                  {result.type === 'song' && (
                    <div>
                      <strong>Song:</strong> {result.title}<br />
                      <strong>Length:</strong> {result.length}<br />
                      <strong>Album:</strong> {result.albumTitle}
                    </div>
                  )}
                  {result.type === 'description' && (
                    <div>
                      <strong>Album:</strong> {result.title}<br />
                      <strong>Snippet:</strong> {result.snippet}...<br />
                      <strong>Songs:</strong> {result.numberOfSongs}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
