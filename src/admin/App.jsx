import {Outlet } from 'react-router-dom';
import NavBar from './Navbar'


const Home=()=>{

    return(
        <div className='full_container'>
            <div className='admin_nav_color'>
                <NavBar/>
            </div>
            <div className='admin_content'>
                <Outlet />
            </div>
        </div>
        
    )
}
export default Home