import {Outlet } from 'react-router-dom';
import NavBar from './Navbar'
import Err from '../svgs/err404'
import { useSelector } from 'react-redux';


const Home=()=>{
    const acc=useSelector((state) => state.account);
    if(acc!=="1")
        return(
            <>
                <Err />
                
            </>
        )

    return(
        <>
        <div className='full_container'>
            <div className=' '>
                <NavBar/>
            </div>
            <div className='admin_content'>
                <Outlet />
            </div>
            
        </div>

        <div className='space'>

        </div>
        </>
    )
}
export default Home