import React, { useContext } from 'react'
import { API } from '../../api/Api.js'

const Delelete = ({showDeleteModal,setShowDeleteModal,setConfirmDelete}) => {
  const handleDelete = async()=>{
    try{
      
    }catch(err){
      console.log(err)
    }

  }
  return (
    <div className={`absolute top-0 left-0 w-full h-screen z-30 ${showDeleteModal?'flex justify-center items-baseline':'hidden'} pt-40`}>
        <div className="modal-delete z-40 bg-[#313131] p-4 rounded-[10px]">
            <h1>Are you sure you want to delete?</h1>
            <div className="modal-delete-buttons flex items-center gap-4">
              <button onClick={()=>{
                setConfirmDelete(true)
          
              }  
                }>Yes</button>
              <button onClick={()=>setShowDeleteModal(!showDeleteModal)}>No</button>
            </div>
        </div>
    </div>
  )
}

export default Delelete
