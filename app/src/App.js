import './App.css';
import React, { useState, useEffect } from 'react';
import image1 from './back1.jpg';
import image2 from './back2.jpg';
import image3 from './back3.jpg';
import image4 from './back4.jpg';
import image5 from './back5.jpg';
import image6 from './back6.jpg';
import Audio from './alarm.mp3';

const App = () => {
  const [timeLeft, setTimeLeft] = useState(0.1 * 60); // 25 minutes in seconds
  const [breakTimeLeft, setBreakTimeLeft] = useState(0.1 * 60); // 5 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isPlay,setIsPlay] = useState(false);
  const [workTime,setWorkTime] = useState(25 * 60);
  // const [checkTime,setCheckTime] = useState(25 * 60);
  const [name,setName] = useState("");
  const [op,setOp]=useState(false);
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
      if('Notification' in window){
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

  const give=()=>{
    setOp(!op);
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
      <img id='img' src="image.png" alt="Logo" onClick={give}/>
    </div>
    <div id={op?'about':'not'}>
      <fieldset id='a'>
        <legend>About</legend>
        <p>The aim of <b>Focus Timer</b> is to help you focus on any task you are working on, such as study, writing, or coding. <br /><br />
        This app is inspired by Pomodoro Technique which is a time management method developed by Francesco Cirillo.</p>
      </fieldset>
      <fieldset id='a'>
        <legend>Pomodoro Technique</legend>
        <p>The <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique"><b>Pomodoro Technique</b></a> is a time management method developed by Francesco Cirillo in the late 1980s. It is named after the tomato-shaped kitchen timer (pomodoro means tomato in Italian) that Cirillo used to track his work sessions. The technique is designed to improve focus and productivity by breaking work into intervals called "pomodoros" with short breaks in between.</p><br />
        <p>The idea behind the Pomodoro Technique is that the time constraints of each pomodoro create a sense of urgency and encourage focused work. The short breaks help prevent burnout and maintain productivity over longer periods. By breaking work into manageable intervals and providing regular breaks, the technique aims to optimize productivity and reduce distractions.</p>
      </fieldset>
      <fieldset id='a'>
        <legend>Benefits</legend>
          <p>
          <ul>
            <li>Effective time management and allocation.</li>
            <li>Improved focus and concentration during work intervals.</li>
            <li>Increased productivity due to structured work sessions.</li>
            <li>Better task prioritization and management of workload.</li>
            <li>Reduction of procrastination by breaking tasks into manageable chunks.</li>
          </ul>
          </p>
        </fieldset>
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
            <li className='li'><img src={image1} alt="logo" id='1' className='im' onClick={choose}/></li>
            <li className='li'><img src={image2} alt="logo" id='2' className='im' onClick={choose}/></li>
            <li className='li'><img src={image3} alt="logo" id='3' className='im' onClick={choose}/></li>
            <li className='li'><img src={image4} alt="logo" id='4' className='im' onClick={choose}/></li>
            <li className='li'><img src={image5} alt="logo" id='5' className='im' onClick={choose}/></li>
            <li className='li'><img src={image6} alt="logo" id='6' className='im' onClick={choose}/></li>
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
