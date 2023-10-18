import React from 'react'
import Modal from './Modal'
import { useReducer } from 'react'
import { useState } from 'react'

const reducer=(state,action)=>{
    console.log(action)
    if(action.type === 'ADD_VALUE'){
        const users=[...state.people , action.payload]

        return {
            ...state,
            people:users,
            isModalOpen:true,
            modalContent:'Item-Added' 
        }
    }
    else if(action.type==='VALUE_DEL'){
        const user= state.people.filter((ele)=>ele.id!==action.payload)
        return{
            ...state,
            people:user,
            isModalOpen:true,
            modalContent:'Item-Removed'
        }
    }
    else if(action.type==='CLOSE'){
   
        return {
         ...state, 
         isModalOpen:false
       }
     
     }
    else{
        return{
        ...state, 
        isModalOpen:true,
        modalContent: 'Please Enter Some Value'
     }
    }
    
}

const defaultState={
    people:[],
    isModalOpen:false,
    modalContent:''
}



const Usereducer = () => {
     const [name,setName]=useState('');
     const [state,dispatch]=useReducer(reducer,defaultState);


     const clickToSubmit=(e)=>{
        e.preventDefault()
        if(name){
            const newUser={id: new Date().getTime().toString(),name}
            dispatch({type:'ADD_VALUE',payload:newUser})
            setName('')
        }
        else{
            dispatch({type:'NO_VALUE'});
        }
    }
    const closeModal=()=>{
        dispatch({type:'CLOSE'})
    }


        


  return (
         
    <>
        
        <form className='form' >
            <div className='iform'>
            { state.isModalOpen && <Modal closeModal={closeModal} modalContent={state.modalContent}/> }
                <div className='heading'>
                    <h1>Usereducer Example</h1>
                </div>
                <input type="text" value={name} placeholder="Enter you name" onChange={(e)=>setName(e.target.value)}/><br></br><br/>
                <button  onClick={clickToSubmit}>ADD</button>
                {
                    state.people.map((ele)=>{
                        return(
                            <div key={ele.id} className="input">
                            <h4>{ele.name}</h4> 
                            <a href='javascript:void(0)' onClick={()=>{dispatch({type:'VALUE_DEL',payload:ele.id})}}>Remove</a>
                            </div>
                        )
                    })
                }
            </div>
        </form>
     
        </>
   
  )
}

export default Usereducer