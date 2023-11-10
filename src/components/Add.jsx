import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { uploadVideo } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add({setUploadVideoStatus}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [videos , setVideos] = useState({
    id:"",
    caption:"",
    url:"",
    embedLink:""
  })
  console.log(videos);
  const embedVideoLink = (e)=>{
      const {value} = e.target
      console.log(value.slice(-11));
      const link = `https://www.youtube.com/embed/${value.slice(-11)}`
      setVideos({...videos,embedLink:link})
  }

  const handleUpload = async()=>{
    const {id,caption,url,embedLink} =videos
    if(!id || !caption || !url || !embedLink){
      toast.warning('Please fill the form properly')
    }else{
     const response = await uploadVideo(videos)
     console.log(response);
     if(response.status>=200 && response.status<300){
      setUploadVideoStatus(response.data)
      toast.success('upload succesfully')
      handleClose()
     }else{
      console.log(response);
      toast.error('something went wrong! Try again later')
      

     }
    }
  }
  return (
    <>
      <div>
           <Row className='mt-5'>
           <Col lg={1}></Col>
           <Col lg={3}>
             <h5>Upload New Video <button onClick={handleShow} className='btn'><i class="fa-solid fa-cloud-arrow-up ms-2"></i></button> </h5>
           </Col>
           <Col lg={5}></Col>
           <Col lg={2}>
             <Link to={'/watch-history'} style={{textDecoration:'none'}}> <h5>Watch History</h5></Link>
           </Col>
           <Col lg={1}></Col>
         </Row>
      </div>

     

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><i class="fa-solid fa-film me-2 text-warning"></i>Upload Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
         <form className='border border-secondary p-3 rounded'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> 
                <Form.Control type="type" placeholder="Enter Video Id" onChange={(e)=>setVideos({...videos,id:e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> 
                <Form.Control type="type" placeholder="Enter Video Caption" onChange={(e)=>setVideos({...videos,caption:e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> 
                <Form.Control type="type" placeholder="Enter Video Image URL" onChange={(e)=>setVideos({...videos,url:e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> 
                <Form.Control type="type" placeholder="Enter YouTube Video Link" onChange={embedVideoLink} />
            </Form.Group>
         </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpload}>Upload</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={2000}/>
    </>
  )
}

export default Add