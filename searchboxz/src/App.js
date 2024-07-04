import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import background from './background.jpg';
import { searchAndSuggest } from './utils/utils';
import Result from './components/Result'; // Import the Result component

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching the data:', error));
  }, []);

  const handleInputChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.length > 3) {
      const { results } = searchAndSuggest(data, term);
      setResults(results);
    } else {
      setResults([]);
    }
    setActiveIndex(-1);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      setActiveIndex((prevIndex) => Math.min(prevIndex + 1, results.length - 1));
    } else if (event.key === 'ArrowUp') {
      setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (event.key === 'Enter') {
      if (activeIndex >= 0) {
        const selectedResult = results[activeIndex];
        if (selectedResult.type === 'artist') {
          setSearchTerm(selectedResult.artist);
        } else if (selectedResult.type === 'description' || selectedResult.type === 'album') {
          setSearchTerm(selectedResult.title);
        } else {
          setSearchTerm(selectedResult.title);
        }
        setResults([]);
      }
    }
  };

  const handleResultClick = (result) => {
    if (result.type === 'artist') {
      setSearchTerm(result.artist);
    } else if (result.type === 'description' || result.type === 'album') {
      setSearchTerm(result.title);
    } else {
      setSearchTerm(result.title);
    }
    setResults([]);
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
            onKeyDown={handleKeyDown}
            ref={inputRef}
          />
          {results.length > 0 && (
            <ul className="results-list">
              {results.map((result, index) => (
                <li
                  key={index}
                  className={`result-item ${index === activeIndex ? 'active' : ''}`}
                  onMouseDown={() => handleResultClick(result)}
                >
                  <Result result={result} searchTerm={searchTerm} />
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
