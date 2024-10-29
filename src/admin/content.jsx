import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import Button from 'react-bootstrap/Button';


import { useSelector } from 'react-redux';

import Loading from '../component/loading';
import axios from "axios";

const Content=()=>{

    const url = useSelector(state=>state.url);
    const token = useSelector(state=>state.token);

    const [loading, setLoading] = React.useState(false);
    const [title,setTitle] = React.useState('');
    const [text,setText] = React.useState('');
    const [file,setFile] = React.useState(null);
    const [fileToShow,setFileToShow] = React.useState(null);

    React.useEffect(() => {
        setLoading(true);
        axios.get(url+"showHomeInfo",
          {
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' +token ,
                'Accept':"application/json"
            }
          })
            .then((response) => {
                setFileToShow(response.data.info[0].img_url)
                setTitle(response.data.info[0].title)
                setText(response.data.info[0].text)
                console.log(response.data)
                setLoading(false)

            })
            .catch((error) =>{ 
              console.log(error);
               setLoading(false) });
    }, []);



    const handleChangeFile=(e)=>{
      if (e.target.files) {
        setFile(e.target.files[0]);
        setFileToShow(URL.createObjectURL(e.target.files[0]))
      }
    }

    const handleChangeText=(event)=>{
        setText(event.target.value)
    }
    const handleChangeTitlle=(event)=>{
        setTitle(event.target.value)
    }


    const addData=()=>{
        
            console.log(text)
            var form = new FormData();
            form.append('id', 1);
            if(file!==null)
                form.append('img_url', file);
            form.append('text', text);
            form.append('title', title);
            setLoading(true)
      
            try {
              const response = axios.post(url+'editHome',
              form,
              {
                  headers:{
                      'Content-Type': 'multipart/form-data',
                      'Authorization' : 'Bearer ' +token ,
                      'Accept':"application/json"
                  }
              }
              ).then((response) => {
                  console.log(response.data);
                  //setData(response.data.events);
                  setLoading(false)
              }).catch((error) => {
                  console.log(error)
                  setLoading(false)
              });
            } catch (e) {
                throw e;
            }
    }

    return(
        <Container>
            <Loading loading={loading}/>
            <Row style={{ zIndex:2 }}  className=' justify-content-center'>
                    
                    <Col className='m_t_30 p_t_30' style={{ textAlign:"start" }} lg={6}md={4} xs={12}>
                        <h3 className='main_color'>
                            {title}
                        </h3>
                        <p>
                            {text}
                        </p>
                    </Col>
                    <Col  lg={6} md={8} xs={12}>
                        <img className='home_img' src={fileToShow} />
                    </Col>
                </Row>
            <Row className='fullWidth m_t_50 justify-content-center'>
                <Col style={{ textAlign:"center" }} lg={4} md={6} sm={12}>
                    <div className=" p_t_30 p_10">
                        <label> أضف صورة مناسبة </label><br/>
                        <input onChange={handleChangeFile} className="dn" accept="image/*"  type="file" id="inputFile1" />
                        <label className="btn-primary btn" for="inputFile1" > رفع صورة <FileUploadRoundedIcon/> </label>
                    </div>
                    <div className="p_10">
                        <label> أضف نص كشرح مطول للموقع   </label>
                        <TextField value={title} onChange={handleChangeTitlle} fullWidth id="outlined-basic" label="الاسم" variant="outlined" />
                    </div>
                    <div className="p_10">
                        <label> أضف نص كعنوان توضيحي   </label>
                        <TextField value={text} onChange={handleChangeText} multiline minRows={3} fullWidth id="outlined-basic" label="النص التوضيحي" variant="outlined" />
                    </div>
                    <div className="p_10">
                        <Button onClick={()=>addData()} className="m_t_30"> حفظ البيانات </Button>
                    </div>

                </Col>
            </Row>
        </Container>
    )
}
export default Content