
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditImage from './pages/EditImage';

function App() {

  return (
    <div className="w-[100vw] h-[100vh]">
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/editImage/:id' element={<EditImage/>}/>
      </Routes>
    </div>
  );
}

export default App;
