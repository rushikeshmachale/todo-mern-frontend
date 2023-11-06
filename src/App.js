import {BrowserRouter,Route,Routes} from 'react-router-dom'
import './App.css';
import AddTask from './components/AddTask';
import UpdateTask from './components/UpdateTask';

function App() {
  return (
    <BrowserRouter>

    <Routes>
    <Route path='/' element={<AddTask/>}/>
    <Route path='/edit/:id' element={<UpdateTask/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
