import './App.css';
import React, { useState, useEffect } from 'react';
import image1 from './back1.jpg';
import image2 from './back2.jpg';
import image3 from './back3.jpg';
import image4 from './back4.jpg';
import image5 from './back5.jpg';
import image6 from './back6.jpg';

const App = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [breakTimeLeft, setBreakTimeLeft] = useState(5 * 60); // 5 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isPlay,setIsPlay] = useState(false);
  const [workTime,setWorkTime] = useState(25 * 60);
  const [checkTime,setCheckTime] = useState(25 * 60);
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
            tag:'Message',
            icon:'logo.jpg'
          });
        }
      });
    }
  }, [timeLeft, breakTimeLeft, isBreak, workTime, name]);

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

  const open=()=>{
    const a=document.querySelector('#back'),b=document.querySelector('#before');
    a.style.display='block';
    b.style.display='none';
  }

  const choose=(event)=>{
    const img = `./back${event.target.id}.jpg`;
    const body=document.querySelector('#body');
    console.log(event.target.id);
    body.style.backgroundImage='url('+img+') cover cover / center';

    const a=document.querySelector('#back'),b=document.querySelector('#before');
    a.style.display='none';
    b.style.display='block';
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    document.title= `${minutes}:${seconds} | Focus Timer`;
    return `${minutes}:${seconds}`;
  };


  return (
    <>
    <div id='logo'>
      <img id='img' src="image.png" alt="Logo"/>
    </div>
    <div id="pomo">
      <div id="before">
        <h2>Settings</h2>
        <div id="time">
          <fieldset>
            <legend>Choose Time</legend>
            <div className='in'>
              <label htmlFor="min">Minutes:</label>
              <input type="number" id='min' placeholder='1' step={1} min={1} max={90} required/> 
            </div>
            <div className='in'>
              <label htmlFor="sec">Break:</label>
              <input type="number" id='sec' placeholder='1' step={1} min={1} max={90} required/>
            </div>  
          </fieldset>
        </div> 
        <div id="field" onClick={open}>
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
        <fieldset id='f'>
          <legend>Choose Background</legend>
          <ul id='list'>
            <li><img src={image1} alt="logo" id='1' className='im' onClick={choose}/></li>
            <li><img src={image2} alt="logo" id='2' className='im' onClick={choose}/></li>
            <li><img src={image3} alt="logo" id='3' className='im' onClick={choose}/></li>
            <li><img src={image4} alt="logo" id='4' className='im' onClick={choose}/></li>
            <li><img src={image5} alt="logo" id='5' className='im' onClick={choose}/></li>
            <li><img src={image6} alt="logo" id='6' className='im' onClick={choose}/></li>
          </ul>
        </fieldset>
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
