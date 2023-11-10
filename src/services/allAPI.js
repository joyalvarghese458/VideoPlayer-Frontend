import { commonAPI } from './commonAPI'
import { serverURL } from './serverURL'


// upload video
export const uploadVideo = async(reqBody)=>{
    //return the value to add.jsx component
   return await commonAPI('POST',`${serverURL}/video`,reqBody)
}

//get all upload videos

export const getAllVideos = async()=>{
   //return the value to view.jsx component
   return await commonAPI('GET',`${serverURL}/video`,"")
}

// to delete a video
export const deleteAVideos = async(id)=>{
   return await commonAPI('DELETE',`${serverURL}/video/${id}`,{})
}
//api to add history
export const addToHistory = async(videoDetails)=>{
   return await commonAPI('POST',`${serverURL}/history`,videoDetails)
}
//api to get history from json server 
export const getAllHistory = async() =>{
      return await commonAPI('GET',`${serverURL}/history`,"")
}
// api call to delete history
export const deleteVideoHistory = async(id) =>{
   return await commonAPI('DELETE',`${serverURL}/history/${id}`,{})
}

// api to add catagory to json server
export const addAllCategory = async(body) =>{
   return await commonAPI('POST',`${serverURL}/category`,body)
}
// api to get all categories

export const getAllCategory = async() =>{
   return await commonAPI('GET',`${serverURL}/category`,"")
}
//api to delete catogories
export const deletecategory = async(id) =>{
   return await commonAPI('DELETE',`${serverURL}/category/${id}`,{})
}
//api to get a 
export const getAVideo = async(id) =>{
   return await commonAPI('GET',`${serverURL}/video/${id}`,"")
}

//api to update the category
export const updateCategory = async(id,body)=>{
  return await commonAPI('PUT',`${serverURL}/category/${id}`,body)
}
