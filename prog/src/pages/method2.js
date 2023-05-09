import './pomo.css';
import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(52 * 60); // 52 minutes in seconds
  const [breakTimeLeft, setBreakTimeLeft] = useState(17 * 60); // 17 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isPlay,setIsPlay] = useState(false);
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
        setTimeLeft(52*60);
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
  }, [timeLeft, breakTimeLeft, isBreak]);
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
    setTimeLeft(52 * 60);
    setBreakTimeLeft(17 * 60);
    setIsRunning(false);
    setIsBreak(false);
    setIsPlay(false);
  };


  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    document.title= `${minutes}:${seconds} | Focus Timer`;
    return `${minutes}:${seconds}`;
  };


  return (
    <div id="m2">
    <div id="div">
      <audio id="audio">
        <source src="alarm.mp3" type='audio/mpeg'/>
      </audio>
      <h1>{isBreak ? 'Break Time!' : 'Focus Time!'}</h1>
      <h2>{formatTime(timeLeft)}</h2>
      <button class="button" onClick={startTimer}><i class="fa-solid fa-play"></i></button>
      <button class="button" onClick={stopTimer}><i class="fa-solid fa-pause"></i></button>
      <button id="reset" onClick={resetTimer}><i class="fa-solid fa-rotate"></i></button>
    </div>
    </div>
  );
};

export default PomodoroTimer;
