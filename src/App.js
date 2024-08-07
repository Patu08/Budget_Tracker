import './App.css';
import './assets/css/style.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import Sidebar from './component/Sidebar';
import Dashboard from './component/Dahsboard';
import Total from './component/Total';
import AddFinance from './component/AddFinance';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>  
         <Route path='/' element={<Login />} />
          <Route Index element={<Sidebar />} >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/total" element={<Total />} />
            <Route path="/addfinance" element={<AddFinance/>} />
            <Route path="/addfinance/:id" element={<AddFinance />} />

        </Route>
      </Routes>
    </BrowserRouter >
</>

   
  );
}

export default App;
