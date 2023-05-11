import React from 'react';
import './pomo.css';

const setting=()=>{
    const change=()=>{
      const a=document.querySelector('#back').value;
      
      document.body.style.backgroundImage='url(`back${a}.jpg`)';
    }
  
    return (
      <div id='div1'>
        <label htmlFor="back">Choose Backgroud:</label>
        <select name="" id="back">
          <option value="1">Back1</option>
          <option value="2">Back2</option>
          <option value="3">Back3</option>
          <option value="4">Back4</option>
          <option value="5">Back5</option>
          <option value="6">Back6</option>
          <option value="7">Back7</option>
        </select>
        </div>
    );
};

export default setting;