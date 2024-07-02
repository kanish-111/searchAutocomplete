import React from 'react';

const highlightTerm = (text, term) => {
  const parts = text.split(new RegExp(`(${term})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === term.toLowerCase() ? <span key={index} className="highlight">{part}</span> : part
  );
};

const Result = ({ result, searchTerm }) => {
  return (
    <li className={`result-${result.type}`}>
      {result.type === 'album' && (
        <div className="eachResultDiv">
          <div><strong>Artist:</strong> {highlightTerm(result.artist, searchTerm)}<br /></div>
          <div><strong>Album:</strong> {highlightTerm(result.title, searchTerm)}<br /></div>
          <div><strong>Songs:</strong> {result.numberOfSongs}<br /></div>
          <div><strong>Description:</strong> {highlightTerm(result.description, searchTerm)}...</div>
        </div>
      )}
      {result.type === 'song' && (
        <div className="eachResultDiv">
          <div><strong>Artist:</strong> {highlightTerm(result.artist, searchTerm)}<br /></div>
          <div><strong>Song:</strong> {highlightTerm(result.title, searchTerm)}<br /></div>
          <div><strong>Length:</strong> {result.length}<br /></div>
          <div><strong>Album:</strong> {highlightTerm(result.albumTitle, searchTerm)}</div>
        </div>
      )}
      {result.type === 'description' && (
        <div className="eachResultDiv">
          <div><strong>Artist:</strong> {highlightTerm(result.artist, searchTerm)}<br /></div>
          <div><strong>Album:</strong> {highlightTerm(result.title, searchTerm)}<br /></div>
          <div><strong>Snippet:</strong> {highlightTerm(result.snippet, searchTerm)}...<br /></div>
          <div><strong>Songs:</strong> {result.numberOfSongs}</div>
        </div>
      )}
    </li>
  );
};

export default Result;
