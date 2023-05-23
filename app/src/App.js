import './App.css';
import React, { useState, useEffect } from 'react';
import image1 from './back1.jpg';
import image2 from './back2.jpg';
import image3 from './back3.jpg';
import image4 from './back4.jpg';
import image5 from './back5.jpg';
import image6 from './back6.jpg';
// import Audio from './alarm.mp3';
import SpotifyPlayer from 'react-spotify-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRotate, faGear, faChevronRight, faChartSimple, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faClock, faMugSaucer, faBusinessTime } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [breakTimeLeft, setBreakTimeLeft] = useState(5 * 60); // 5 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isPlay,setIsPlay] = useState(false);
  const [workTime,setWorkTime] = useState(25 * 60);
  const [wTime,setWTime]=useState(0);
  const [bTime,setBTime]=useState(0);
  const [total,setTotal]=useState(0);
  const [checkTime,setCheckTime] = useState(0);
  const [name,setName] = useState("");
  const [bgimage,setbgimage] = useState(image1);
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
  }, [isRunning, isBreak]);

  useEffect(() =>{
    let interval=null;
    if(isRunning) {
      interval = setInterval(() =>{
        if(isBreak){
          setBTime(prevTimeLeft => prevTimeLeft + 1);
        }else{
          setWTime(prevTimeLeft => prevTimeLeft + 1);
        }
        setTotal(prevTimeLeft => prevTimeLeft + 1);
        setCheckTime(prevTimeLeft => prevTimeLeft + 1);
        if(Math.floor(checkTime / 60) == 10 && timeLeft > 5 * 30){
          setCheckTime(0);
          if('Notification' in window){
            Notification.requestPermission().then((perm) => {
              if(perm==='granted'){
                new Notification("Focus Timer",{
                  body:'Hold a second, take a deap breath and drink some water or take a coffe to make yourself energitic',
                  tag:'Message',
                  icon:'Focus timer.png'
                });
              }
            });
          }
        } 
      },1000);
    }else{
      clearInterval(interval);
    }
    return () => clearInterval(interval); 
  },[isRunning, isBreak]);

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
              icon:'Focus timer.png'
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
  }

  const getM =(e)=>{
    const a=e.target.value;
    setTimeLeft(a * 60);
    setWorkTime(a * 60);
  }

  const getB =(e)=>{
    const a=e.target.value;
    setBreakTimeLeft(a * 60);
  }

  const getN =(e)=>{
    const a= e.target.value;
    setName(a);
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

  const reports=()=>{
    const a=document.querySelector('#before'),b=document.querySelector('.up');
    a.style.display='none';
    b.style.display='block';
  }

  const close1=()=>{
    const a=document.querySelector('.up'),b=document.querySelector('#after');
    a.style.display='none';
    b.style.display='block';
  }

  const choose=(event)=>{
    const count=`${event.target.id}`;
    var img=image1;
    switch (count) {
      case '1':
        img=(image1);
        break;
      case '2':
        img=(image2);
        break;
      case '3':
        img=(image3);
        break;
      case '4':
        img=(image4);
        break;
      case '5':
        img=(image5);
        break;
      case '6':
        img=(image6);
        break;
      default:
        break;
    }
    setbgimage(img);
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
    <div
    className='main'
    style={{
    backgroundImage: `url(${bgimage})`, 
    overflow: "hidden",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    transition: "3s"
    }}>
    <div id='logo'>
      <img id='img' src="image.png" alt="Logo" onClick={give}/>
    </div>
    <div className='spotify'>
      <SpotifyPlayer uri="https://open.spotify.com/playlist/0vvXsWCC9xrXsKd4FyS8kM"/>
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
            <legend>Choose Duration</legend>
            <div className='in'>
              <label htmlFor="min">Focus:</label>
              <input type="number" id='min' placeholder='1' onChange={getM} step={1} min={1} max={90} required/> 
            </div>
            <div className='in'>
              <label htmlFor="sec">Break:</label>
              <input type="number" id='sec' placeholder='1' onChange={getB} step={1} min={1} max={90} required/>
            </div>  
          </fieldset>
        </div> 
        <div id="field" onClick={open}>
        <fieldset>
          <legend>Background</legend>
          <label>Select Background <FontAwesomeIcon icon={faChevronRight} /></label>
        </fieldset>
        </div>
        <div id='field'>
          <fieldset>
            <legend>Name</legend>
            <label htmlFor="name">Enter Name:</label>
            <input type="text" id='name' onChange={getN}/>
          </fieldset>
        </div>
        <div id='field' onClick={reports}>
          <fieldset>
            <legend>Stats</legend>
            <label>See Report <FontAwesomeIcon icon={faChartSimple} /></label>
          </fieldset>
        </div>
        <button id='button' onClick={getValue}>OK</button>
      </div>
      <div className="up">
      <FontAwesomeIcon icon={faXmark} size="xl" style={{marginLeft:"85%", marginTop: "2.5%"}} onClick={close1}/>
      <div className="rep">
        <fieldset id='s'>
          <legend>Summary</legend>
          <div className="total"><FontAwesomeIcon icon={faClock} /><div className="t">{Math.floor(wTime / 60)} mins</div></div>
          <div className="total"><FontAwesomeIcon icon={faMugSaucer} /><div className="t">{Math.floor(bTime / 60)} mins</div></div>
          <div className="total"><FontAwesomeIcon icon={faBusinessTime} /><div className="t">{Math.floor(total / 60)} mins</div></div>
        </fieldset>
      </div>
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
        <audio id="audio" controls={false} style={{display:'none'}}>
          <source src="alarm.mp3" type='audio/mpeg'/>
        </audio>
        <h1>{isBreak ? 'Break Time!' : 'Focus Time!'}</h1>
        <h2>{formatTime(timeLeft)}</h2>
        <button className="button" onClick={startTimer}><FontAwesomeIcon icon={faPlay} /></button>
        <button className="button" onClick={stopTimer}><FontAwesomeIcon icon={faPause} /></button>
        <button className="reset" onClick={resetTimer}><FontAwesomeIcon icon={faRotate} /></button>
        <button className="reset" onClick={change}><FontAwesomeIcon icon={faGear} /></button>
      </div>
    </div>
    </div>
  );
};

export default App;