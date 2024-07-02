import React, { useState, useEffect } from 'react';
import './App.css';
import background from './background.jpg';


function App() {
  return (
    <div className="App" style={{ backgroundImage: `url(${background})` , backgroundPositionX: 'center' , backgroundPositionY: 'bottom' , backgroundSize:'cover'}}>
      <div className="main">
        <div className="title">ALBUM SEARCH</div>
      <div className="box">
        <input type="text" className="search-bar" placeholder="Search..." onChange={(e)=>
          {
            if(e.target.value.length >3){
              console.log(e.target.value)
            }
          
          
          }}/>
      </div>
      </div>
    </div>
  );
}

export default App;
