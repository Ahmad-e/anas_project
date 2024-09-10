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
import Zakat from './admin/zakat';


import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});


function App() {
  const mode = useSelector((state) => state.mode);
  return (
    <ThemeProvider theme={ mode==="dark" ? darkTheme : lightTheme}>
    <div className={'App '+mode}>
      <BrowserRouter >
        <Header />
          <Routes>
              <Route index element={<Home />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />

              <Route path="admin" element={<AdminApp />} >
                <Route path="zakat" element={<Zakat />}  />
                <Route path="contributions" element={<Contributions />}  />
                <Route path="ads" element={<Ads />}  />
                <Route path="family" element={<Family />}  />
                <Route path="users" element={<Users />}  />
                <Route path="expensess" element={<Expensess />}  />
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
