import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Img1 from '../images/1.jpg';
import Img2 from '../images/2.jpg';
import Img3 from '../images/3.png';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import {useState,useEffect} from 'react'
import SvgHome from '../svgs/home'
const Home=()=>{
    const mode=useSelector((state) => state.mode);

        const [index, setIndex] = useState(0);
      
        const handleSelect = (selectedIndex) => {
          setIndex(selectedIndex);
        };
    const Card=(props)=>{
        return(
            <section class="container">
                <div class="card">
                    <div class="card-image">
                    <img src={props.image} alt="card image" />
                    </div>
                    <div>
                        <br/>
                        <h3 className='main_color'>{props.name}</h3>
                        <p> {props.email} </p>
                    </div>
                </div>

                
            </section>
        );
    }

    return(
        <>
            <Carousel style={{ zIndex:2 }} >
                <Carousel.Item interval={4000}>
                    <img className='carsl_img' src={Img1} text="First slide" />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item  interval={4000}>
                    <img  className='carsl_img' src={Img2} text="Second slide" />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item  interval={4000}>
                        <img  className='carsl_img' src={Img3} text="Third slide" />
                        <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                
            <Container >
                
                <Row style={{ zIndex:2 }}  className='m_t_50 justify-content-center'>
                    <Col  lg={6} md={8} xs={12}>
                        <SvgHome />
                    </Col>
                    <Col style={{ textAlign:"start" }} lg={6}md={4} xs={12}>
                        <h3 className='main_color home_text'>
                        سواعد متكاتفة 
                        </h3>
                        <p>
                        موقع مخصص للأسرة يهتم بدراسة وتحليل التبرعات والمصروفات الخاصة والداخلية وحساب الزكاة المفروضة
                        </p>
                    </Col>
                </Row>
                <Row style={{ zIndex:2 }}  className='m_t_50 p_t_30 fullWidth justify-content-center'>
                    <hr/>    
                </Row>
                <Row style={{ zIndex:2 }} className='m_t_50 justify-content-center'>
                    <Col lg={12} sm={12}>
                        <h3 className='main_color'>
                            الأعضاء الأكثر  مساهمة 
                        </h3>
                    </Col>
                    <Col className='m_t_50' lg={4} sm={6} xs={12}>
                        <Card  image={"https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"} name={"Ahmad"} email={"homseahmad07@gmail.com"} />
                    </Col>
                    <Col className='m_t_50' lg={4} sm={6} xs={12}>
                        <Card image={"https://preview.keenthemes.com/metronic-v4/theme_rtl/assets/pages/media/profile/profile_user.jpg"} name={"Anas"} email={"Anas@gmail.com"} />
                    </Col>
                    <Col className='m_t_50' lg={4} sm={6} xs={12}>
                        <Card image={"https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"} name={"Ali"} email={"Ali@gmail.com"} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default Home