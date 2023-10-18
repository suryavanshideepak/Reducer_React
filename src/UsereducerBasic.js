import React,{useState} from 'react'
import Modal from './Modal'

const UsereducerBasic = () => {
    const [name,setName]=useState('')
    const [value,setValue]=useState([])
    const [modalContent,setmodalContent]=useState()
    const [isModalOpen,setisModalOpen]=useState(false)
    
    const clickToAdd=(e)=>{
      e.preventDefault()
      if(name){
      const newUser= {id:new Date().getTime().toString(),name}
      setValue([...value,newUser])
      setName('')
      setisModalOpen(true)
      setmodalContent('Item-Added')
    }
    else{
      setmodalContent('please add item')
    }
  }
    
    const removeFn=(ele)=>{
      const newitem= value.filter((id)=>id.id!==ele)
      console.log(newitem)
      setValue(newitem)
      setisModalOpen(true)
      setmodalContent('item-removed')
    }
  
    const closeModal=()=>{
      setisModalOpen(false)
    }
    
  return (
    <div>
       {isModalOpen && <Modal closeModal={closeModal} modalContent={modalContent}/>}
        ENTER YOUR NAME:<input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/><br/><br/>
        <button onClick={clickToAdd}>ADD</button><br/>
        {
          value.map((ele)=>{
            return(<div key={ele.id} >
              {ele.name}
              <button onClick={()=>removeFn(ele.id)}>Remove</button>
              </div>
            )
          })
        }
    </div>
  )
}

export default UsereducerBasic