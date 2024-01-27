import logo from './logo.svg';
import './App.css';
import Bootstrap from "./Bootstrap.js";
import Signup from "./signup.js"
import Contact_Us from "./Contact_us"
import Postoverview from "./Postoverview"
import Profile from "./Profile"
import { BrowserRouter,Route,Routes } from 'react-router-dom';
function App() {
  return (
    <>
    <BrowserRouter>
            <Routes>
                <Route path="card" element={<Postoverview/>}/>
                <Route path='login' element={<Bootstrap/>}/> 
                <Route path='signup' element={<Signup/>}/>
                <Route path='contactus' element={<Contact_Us/>}/>
                <Route path='profile' element={<Profile/>}/>
            </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
