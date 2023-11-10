import React, { useState } from 'react'
import Add from '../components/Add'
import { Col, Row } from 'react-bootstrap'
import View from '../components/View'
import Category from '../components/Category'


function Home() {
  const [uploadVideoStatus, setUploadVideoStatus] = useState({})
  return (
    <div>
      <div>
        <Add setUploadVideoStatus={setUploadVideoStatus}/>
      </div>
      <div>
        <Row>
          <Col lg={5}>
            <View uploadVideoStatus={uploadVideoStatus}/>
          </Col>
          <Col lg={4}></Col>
          <Col lg={3}>
            <Category/>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Home