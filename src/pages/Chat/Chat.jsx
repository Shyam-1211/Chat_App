import React, { useContext, useEffect, useState } from 'react'
import './Chat.css'
import LeftSide from '../../Components/LeftSidebar/LeftSide'
import ChatBox from '../../Components/ChatBox/ChatBox'
import RightSide from '../../Components/RightSidebar/RightSide'
import { AppContext } from '../../context/AppContext'
const Chat = () => {
  const {chatData,userData} = useContext(AppContext)
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    if (chatData && userData) {
      setLoading(false)
    }
  },[chatData,userData])

  return (
    <>
    <div className="chat">
      {
        loading?<p className='loading'> LOADING... </p>
        :
        <div className="chat-container">
            <LeftSide/>
            <ChatBox/>
            <RightSide/>
        </div>
      }
        
    </div>
    </>
  )
}

export default Chat