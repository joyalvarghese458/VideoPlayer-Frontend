import React, { useEffect, useState } from 'react'
import Viewcard from './Viewcard'
import { Col, Row } from 'react-bootstrap'
import { getAllVideos } from '../services/allAPI'

function View({uploadVideoStatus}) {
  const [allVideo, setAllVideo] = useState([])
  const [deleteVideoStatus,setDeleteVideoStatus] = useState(false)
  const getAllUploadVideo = async()=>{
    const response = await getAllVideos()
    // console.log(response);
    const {data} = response
    // console.log(data);
    setAllVideo(data)
  }
  console.log(allVideo);

  useEffect(()=>{
    getAllUploadVideo()
    setDeleteVideoStatus(false)

  },[uploadVideoStatus,deleteVideoStatus])
  return (
 <>
     <h3 className='ms-3 mb-4 mt-4'>All Video</h3>
      <Row>
        { allVideo.length>0?
        allVideo.map((video)=>( <Col className='mb-4' sm={12} md={6} lg={4} xl={4}>
          <Viewcard displayVideo = {video} setDeleteVideoStatus={setDeleteVideoStatus}/>
          </Col> ))
          :
        <p>Nothing to Display</p>
        }
      </Row>
 </>
  )
}

export default View