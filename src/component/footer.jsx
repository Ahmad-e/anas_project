import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../images/logo.png'
import { colors } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Footer=()=>{

    const location = useLocation();
  console.log(location.pathname);

  
    const result = location.pathname.substring(0,6);
    console.log(result);
    const mode="light"
    return(
        <div className={('footer p_t_50 '+(result==='/admin' ? ('dn') : ('')) )}>
            <div className="container text-center  ">
                <div class="a">
                    <footer class="row">
                    <div class="col">
                        <img style={{     width: "300px", height: "100px" }} className='logo_img' src={Logo} />
                        <br/><br/>
                        
                        <p className='sec_color'> اليد العليا خير من اليد السفلى  </p>
                        <div class="soc mt-4 mb-3">
                        <a className={'footer_link i_link '+ (mode==="dark" ? 'dark_color':'light_color')}   href="https://www.instagram.com"><InstagramIcon sx={{ fontSize: 30 }} /></a>
                        <a className={'footer_link l_link '+ (mode==="dark" ? 'dark_color':'light_color')} href="https://www.linkedin.com"><LinkedInIcon sx={{ fontSize: 30 }}/></a>
                        <a className={'footer_link f_link '+ (mode==="dark" ? 'dark_color':'light_color')} href="https://www.behance.com"><FacebookIcon sx={{ fontSize: 30 }} /></a>
                        </div>
                    </div>
                    </footer>
                    <div style={{ color:"black" }} class=" legal mt-2">
                        <p> جميع الحقوق محفوظة  &copy; 2024</p>
                    </div>
                    <br/>
                </div>
            </div>
        </div>
    )
}
export default Footer