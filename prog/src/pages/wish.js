import './pomo.css';
import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(1*60); 
  const [breakTimeLeft, setBreakTimeLeft] = useState(1*60); 
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isPlay,setIsPlay] = useState(false);
  const [workTime,setWorkTime] = useState(0*60);
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
        text="Alright! Breaks time over, Get back to your work";
      }else{
        setIsBreak(true);
        setTimeLeft(breakTimeLeft);
        text="You have been working for a quite a time, Time to take a break!";
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
    setIsRunning(false);
    setIsBreak(false);
    setIsPlay(false);
  };

  const getValue=()=>{
    const a1=document.querySelector('#before'),b1=document.querySelector('#after');
    a1.style.display='none';
    b1.style.display='block';
    const work=document.querySelector('#min').value,br=document.querySelector('#sec').value;
    setTimeLeft(work*60);
    setWorkTime(work*60);
    setBreakTimeLeft(br*60);
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
    <div id="div">
      <div id="before">
        <h2>Choose Time</h2>
        <div className='in'>
          <label htmlFor="min">Minutes:</label>
        <input type="number" id='min' step={1} min={1} max={90} required/> 
        </div>
        <div className='in'>
          <label htmlFor="sec">Break:</label>
        <input type="number" id='sec' step={1} min={1} max={90} required/>
        </div>
        <button onClick={getValue}>Save</button> 
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
  );
};

export default PomodoroTimer;
