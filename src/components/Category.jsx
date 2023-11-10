import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { addAllCategory, deletecategory, getAVideo, getAllCategory, updateCategory } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Col, Row } from 'react-bootstrap';
import Viewcard from './Viewcard';

function Category() {
  const [CategoryName, setCategoryName] = useState("")
  const [category , setCategory]= useState([])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //
  const addCategory = async()=>{
    console.log(CategoryName);

   if(CategoryName){
    let body ={
      CategoryName,
      allVideos:[]
    }
    const response = await addAllCategory(body)
    console.log(response);
    if(response.status>=200 && response.status<300){
      toast.success('category Added Succesfully')
      setCategoryName("")
      handleClose()
      allCategory()
    }else{
      toast.error('someting went wrong')
    }
   }else{
      toast.warning('please enter category name')
   }
  }
  //function to get all categories
  const allCategory = async()=>{
    const {data} = await getAllCategory()
    console.log(data);
    setCategory(data)
  }
  console.log(category);

  //delete a category
  const deleteACategory = async(id)=>{
    await deletecategory(id)
    allCategory()
  }

  const dragOver= (e)=>{
    e.preventDefault()
  }

  const videoDrop = async(e,categoryId)=>{
    console.log(`droped id ${categoryId}`);
    //to get data sent from viewcard
   let videoId = e.dataTransfer.getData('videoId')
   console.log(videoId);
   const {data} = await getAVideo(videoId)
   console.log(data);

   const selectedCategory = category.find(item=>item.id===categoryId)
   selectedCategory.allVideos.push(data)
   console.log(selectedCategory);

   await updateCategory(categoryId,selectedCategory)
   allCategory()
  }
  useEffect(()=>{
    allCategory()
  },[])
  return (
    <>
      <div className='d-grid  me-2'>
          <button onClick={handleShow} className='btn bg-warning rounded'>Add New Category</button>
      </div>
     
     {category?.length>0?
     category?.map((item)=>(
      <div className='mt-3 border border-secondary p-5 rounded'>
        <div className='d-flex justify-content-between align-items-center' droppable onDragOver={(e)=>dragOver(e)} onDrop={(e)=>videoDrop(e,item?.id)}>
          <h5>{item?.CategoryName}</h5>
          <button onClick={()=>deleteACategory(item?.id)} className='btn btn-danger'><i class="fa-solid fa-trash"></i></button>
        </div>
        <Row>
          <Col className='m-5'>
          { item?.allVideos?.length>0?
           item?.allVideos?.map(card=>( <Viewcard displayVideo={card} ispresent={true}/>))
           : <p>Nothing To Display</p>
          }
          </Col>
        </Row>
      </div>
      ))
      : <p className='mt-5'>No Category Added</p>
      }

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><i class="fa-solid fa-film me-2 text-warning"></i>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
         <form className='border border-secondary p-3 rounded'>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> 
            <Form.Label>Category Name</Form.Label>
                <Form.Control type="type" placeholder="Enter Category Name" onChange={(e)=>setCategoryName(e.target.value)} />
            </Form.Group>
            
         </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addCategory}>Add</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position='top-center' theme='colored' autoClose={2000}/>
    </>
  )
}

export default Category