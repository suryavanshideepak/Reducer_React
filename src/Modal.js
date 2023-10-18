import React,{useEffect} from 'react';
import './App.css'

const Modal=({modalContent,closeModal})=>{
     useEffect(()=>{
          setTimeout(()=>{
             closeModal();
          },3000);
     });
     return (
     <div className='omodal'>
        <div className='modal'>
          {modalContent}
        </div>
    </div>
    )
}

export default Modal;