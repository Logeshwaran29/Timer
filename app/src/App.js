import './App.css';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [breakTimeLeft, setBreakTimeLeft] = useState(5 * 60); // 5 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isPlay,setIsPlay] = useState(false);
  const [workTime,setWorkTime] = useState(25 * 60);
  const [name,setName] = useState("");
  const a=document.querySelector('#audio');

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft === 0) {
      if(!isPlay){
        a.play();
        setIsPlay(true);
      }
      let text;
      setIsRunning(false);
      if(isBreak){
        setIsBreak(false);
        setTimeLeft(workTime);
        text=`Alright ${name}! Breaks time over, Get back to your work`;
      }else{
        setIsBreak(true);
        setTimeLeft(breakTimeLeft);
        if(name===""){
          text="You have been working for a quite a time, Time to take a break!";
        }else{
          text=`Hello ${name}! You have been working for a quite a time, Time to take a break!`;
        }
        
      }
      Notification.requestPermission().then((perm) => {
        if(perm==='granted'){
          new Notification("Focus Timer",{
            body:text,
            tag:'Message'
          });
        }
      });
    }
  }, [timeLeft, breakTimeLeft, isBreak, workTime]);

  const startTimer = () => {
    if(isPlay){
      a.pause();
      a.currentTime=0;
      setIsPlay(false);
    }
    setIsRunning(true);
  };

  const stopTimer = () => {
    if(isPlay){
      a.pause();
      a.currentTime=0;
      setIsPlay(false);
    }
    setIsRunning(false);
  };

  const resetTimer = () => {
    a.pause();
    a.currentTime=0;
    setTimeLeft(workTime);
    setBreakTimeLeft(5 * 60);
    setIsRunning(false);
    setIsBreak(false);
    setIsPlay(false);
  };

  const getValue=()=>{
    if(isPlay){
      a.pause();
      a.currentTime=0;
      setIsPlay(false);
    }
    const a1=document.querySelector('#before'),b1=document.querySelector('#after');
    a1.style.display='none';
    b1.style.display='block';
    const work=document.querySelector('#min').value,br=document.querySelector('#sec').value;
    const name=document.querySelector('#name').value;
    setTimeLeft(work * 60);
    setWorkTime(work * 60);
    setBreakTimeLeft(br * 60);
    setName(name);
  }

  const change=()=>{
    const a1=document.querySelector('#before'),b1=document.querySelector('#after');
    a1.style.display='block';
    b1.style.display='none';
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    document.title= `${minutes}:${seconds} | Focus Timer`;
    return `${minutes}:${seconds}`;
  };


  return (
    <>
    <div id='logo'><img src="logo.jpg" alt="Logo"/></div>
    <div id="pomo">
      <div id="before">
        <h2>Settings</h2>
        <div id="time">
          <fieldset>
            <legend>Choose Time</legend>
            <div className='in'>
              <label htmlFor="min">Minutes:</label>
              <input type="number" id='min' step={1} min={1} max={90} required/> 
            </div>
            <div className='in'>
              <label htmlFor="sec">Break:</label>
              <input type="number" id='sec' step={1} min={1} max={90} required/>
            </div>  
          </fieldset>
        </div> 
        <div id="field">
        <fieldset>
          <legend>Background</legend>
          <label>Select Background <i class="fa-solid fa-chevron-right"/></label>
        </fieldset>
        </div>
        <div id='field'>
          <fieldset>
            <legend>Name</legend>
            <label htmlFor="name">Enter Name:</label>
            <input type="text" id='name'/>
          </fieldset>
        </div>
        <button id='button' onClick={getValue}>OK</button>
      </div>
      <div id='back'>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div id="after">
        <audio id="audio">
          <source src="alarm.mp3" type='audio/mpeg'/>
        </audio>
        <h1>{isBreak ? 'Break Time!' : 'Focus Time!'}</h1>
        <h2>{formatTime(timeLeft)}</h2>
        <button className="button" onClick={startTimer}><i class="fa-solid fa-play"></i></button>
        <button className="button" onClick={stopTimer}><i class="fa-solid fa-pause"></i></button>
        <button id="reset" onClick={resetTimer}><i class="fa-solid fa-rotate"></i></button>
        <button id="reset" onClick={change}><i class="fa-solid fa-gear"></i></button>
      </div>
    </div>
    </>
  );
};

export default App;
