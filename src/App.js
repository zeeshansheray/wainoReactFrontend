import './assets/css/global.scss'

import LayoutContextProvider, { LayoutContext } from './context/layout.context';
import { withToaster } from './context/Toaster.context';

import CustomToasters from './components/CustomToasters';
import OutsetaLoginWidget from './components/Outseawidget';

import {
  BrowserRouter,
  Routes,
  Route,
  withRouter,
} from "react-router-dom";

import MainPage from './pages/home/Mainpage';
import Navbar from './components/Navbar';
import WainoExplorer from './pages/home/WainoExplorer';
import { useContext, useEffect } from 'react';
import About from './pages/home/About';
import Profile from './pages/home/Profile';
import Admin from './pages/admin/Admin';
import DiscountWainoExplorer from './pages/home/DiscountWainoExplorer';


function App(props) {
  const layout = useContext(LayoutContext)

  return (
    <div className="App">
        <BrowserRouter>
            <CustomToasters/>
            <Navbar/>
            {/* <OutsetaLoginWidget /> */}
            <Routes>
              <Route exact path  = "/" element                     = {<WainoExplorer/>}/>
              <Route exact path  = "discount" element                     = {<DiscountWainoExplorer/>}/>
              <Route exact path  = "about" element                     = {<About/>}/>
              <Route exact path  = "profile" element                     = {<Profile/>}/>
              <Route exact path  = "admin" element                     = {<Admin/>}/>
            </Routes>
          {/* <Footer/> */}
        </BrowserRouter>
    </div>
  );
}

export default withToaster(App);
