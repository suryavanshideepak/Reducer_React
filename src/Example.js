import React from 'react'
import { useReducer } from 'react';
import { useState } from 'react';
import Modal from './Modal'; 



const reducer=(state,action)=>{
     if(action.type==='add_value'){
        const user=[...state.people,action.payload]
        return{
            ...state,
            people:user,
            isModalOpen:true,
            modalContent:'item Added'
        }
    }
    else if(action.type==='delete')
        {
        const newlist=state.people.map((user)=>user.id!==action.payload)
        return{
             ...state,
             people:newlist,
             isModalOpen:true,
            modalContent:'item removed'
        }
    }
    else if(action.type==='close'){
        return{
            ...state,
            isModalOpen:false
        }
    }
    else{
        return{
            ...state,
            isModalOpen:true,
            modalContent:'please enter value'
        }
    }
}

const defaultValue={
    people:[],
    isModalOpen:false,
    modalContent:''
}


const Example = () => {
    const [name,setName]=useState('')
    const[state,dispatch]=useReducer(reducer,defaultValue)

    const clickToAdd=(e)=>{
        e.preventDefault()
            if(name){
            const newUser= {id:new Date().getTime().toString(),name}
            dispatch({type:'add_value',payload:newUser})
            setName('')
        }
        else{
            dispatch({type:'no_value'})
        }
    }

    const closeModal=()=>{
        dispatch({type:'close'})
    }


  return (
    <div>
        {state.isModalOpen && <Modal closeModal={closeModal} modalContent={state.modalContent}/>}
        <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/>
        <button onClick={clickToAdd}>ADD</button>
        {
            state.people.map((ele)=>{
            return(
                <div key={ele.id}><h3>{ele.name}</h3>
                     
                     <a href='javascript:void(0)' onClick={()=>{dispatch({type:'delete',payload:ele.id})}}>remove</a>
                </div>
                )
            })
        }
    </div>
  )
}

export default Example;