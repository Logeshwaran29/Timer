import Navbar from './Components/Navbar';
import Pomo from './pages/pomo';
import Method2 from './pages/method2';
import Rhythm from './pages/rhythm';
import Wish from './pages/wish';
import { Route, Routes } from "react-router-dom";

const App=()=>{
  return(
    <>
    <Navbar/>
    <div>
      <Routes>
        <Route path='/' element={<Pomo/>}/>
        <Route path='/method2' element={<Method2/>}/>
        <Route path='/rhythm' element={<Rhythm/>}/>
        <Route path='/wish' element={<Wish/>}/>
      </Routes>
    </div>
    </>
  );
}
export default App;
