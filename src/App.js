import 'bootstrap/dist/css/bootstrap.min.css';
import './svgs/style.css';
import './user/style.css';
import './admin/style.css';
import './component/style.css';
import './App.css';
import Header from './component/header';
import Footer from './component/footer';
import Register from './user/register';
import Home from './user/home'
import Login from './user/login';


import AdminHome from './admin/home';
import AdminApp from './admin/App';
import Ads from './admin/ads';
import Contributions from './admin/contributions';
import Expensess from './admin/expensess';
import Family from './admin/family';
import Users from './admin/users';
import Types from './admin/types';
import Event from './admin/event';
import Zakat from './admin/zakat';
import Err from './svgs/err404'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: ['"Droid Arabic Kufi"', 'serif'].join(',')
    
   }
});
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: ['"Droid Arabic Kufi"', 'serif'].join(',')
   }
});


function App() {
  const mode = useSelector((state) => state.mode);
  return (
    <ThemeProvider theme={ mode==="dark" ? darkTheme : lightTheme}>
    <div dir='rtl' className={'App '+mode}>
      <BrowserRouter >
        <Header />
          <Routes>
              <Route index element={<Home />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<Err />} />

              <Route path="admin" element={<AdminApp />} >
                <Route path="types" element={<Types />}  />
                <Route path="contributions" element={<Contributions />}  />
                <Route path="ads" element={<Ads />}  />
                <Route path="family" element={<Family />}  />
                <Route path="users" element={<Users />}  />
                <Route path="expensess" element={<Expensess />}  />
                <Route path="events" element={<Event />}  />
                <Route path="zakat" element={<Zakat />}  />
                <Route path="home" element={<AdminHome />}  />
              </Route>
          </Routes>
        <Footer />
      </BrowserRouter>
    </div>
    </ThemeProvider>
  );
}

export default App;
