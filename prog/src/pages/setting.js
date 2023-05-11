import React from 'react';
import './pomo.css';

const setting=()=>{
    const change=()=>{
      const a=document.querySelector('#back');
      console.log(a.value);
      document.body.style.backgroundImage='url(`back${a}.jpg`)';
    }
  
    return (
      <div id='div1'>
        <label htmlFor="back">Choose Backgroud:</label>
        <select name="" id="back">
          <option value="1" onClick={change}>Back1</option>
          <option value="2" onClick={change}>Back2</option>
          <option value="3" onClick={change}>Back3</option>
          <option value="4" onClick={change}>Back4</option>
          <option value="5" onClick={change}>Back5</option>
          <option value="6" onClick={change}>Back6</option>
          <option value="7" onClick={change}>Back7</option>
        </select>
        </div>
    );
};

export default setting;