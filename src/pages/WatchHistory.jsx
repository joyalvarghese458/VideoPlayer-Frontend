import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteVideoHistory, getAllHistory } from '../services/allAPI';

function WatchHistory() {

  const [history,setHistory] = useState([])

  const allHistory = async()=>{
   const {data} = await getAllHistory()
  //  console.log(data);
   setHistory(data)
  }
   console.log(history);

// 
const removeHistory = async(id)=>{
  await deleteVideoHistory(id)
  allHistory()
}

  useEffect(()=>{
    allHistory()
  },[])
  return (
    <div>
      <>
      <div className="container mt-5 d-flex justify-content-between">
            <h3>Watch History</h3>
           
            <Link to={'/home'}className='d-flex align-items-center' style={{textDecoration:'none', color:'white', fontSize:'20px'}}><i class="fa-solid fa-arrow-left fa-beat me-2"></i> Back to Home</Link>
        </div>
        <table className='table mb-5 mt-5 container'>
          <thead>
            <tr>
              <th>#</th>
              <th>CAPTION</th>

              <th>URL</th>

              <th>TIME STAMB</th>

              <th>Action</th>

            </tr>
          </thead>
          <tbody>
           { history.length>0?
           history.map((item, index)=>(
            
          
           <tr>
              <td>{index+1}</td>
              <td>{item.caption}</td>
              <td><a href={`${item.embedLink}?autoplay=1`}target='_blank'>{item.embedLink}</a></td>
              <td>{item.timestamp}</td>
              <td> <button onClick={()=>removeHistory(item?.id)}  className='btn btn-danger'><i class="fa-solid fa-trash"></i></button></td>
            </tr>)  )
            :
            <p className='mt-5 fw-bolder fs-4 text-danger'>No Watch History</p>
          }
          </tbody>
        </table>
    </>
    </div>
  )
}

export default WatchHistory