import React, { useContext, useEffect, useState } from 'react'
import './ChatBox.css'
import assets from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { toast } from 'react-toastify'
const ChatBox = () => {
    const {userData,messagesId,chatUser,messages,setMessages,chatVisible,setChatVisible } = useContext(AppContext)
    const [input,setInput] = useState("")

    const sendMessage = async () => {
      try {
        if (input && messagesId ) {
          await updateDoc(doc(db,'messages',messagesId),{
            messages: arrayUnion({
              sId:userData.id,
              text:input,
              createdAt: new Date()
            })
          })
          const userIDs = [chatUser.rId,userData.id]

          userIDs.forEach(async (id)=>{
            const userChatsRef = doc(db,'chats',id)
            const userChatsSnapshot = await getDoc(userChatsRef)

            if (userChatsSnapshot.exists()) {
              const userChatData = userChatsSnapshot.data()
              const chatIndex = userChatData.chatData.findIndex((c)=>c.messageId === messagesId)
              userChatData.chatData[chatIndex].lastMessage= input.slice(0,30)
              userChatData.chatData[chatIndex].updatedAt = Date.now()
              if (userChatData.chatData[chatIndex].rId === userData.id) {
                userChatData.chatData[chatIndex].messageSeen = false 
              }
              await updateDoc(userChatsRef,{
                chatData:userChatData.chatData
              })
            }
          })
        }
      } catch (error) {
        toast.error(error.messages)
      }
      setInput("")
    }

    const convertTimestamp = (timestamp)=>{
      let date = timestamp.toDate()
      const hour = date.getHours()
      const minute = date.getMinutes()

      if (hour>12) {
        return hour-12 + ":" + minute + "PM"
      }
      else{
        return hour + ":" + minute + "AM"
      }
    }

    useEffect(() => {
      if (messagesId) {
        const unSub = onSnapshot(doc(db, 'messages', messagesId), (res) => {
          setMessages(res.data().messages.reverse());
        });
        return () => {
          unSub();
        };
      }
    }, [messagesId]); // Ensure messagesId is properly set and stable
    

    return chatUser ? (
      <>
        <div className="chat-box h-[75vh] relative bg-[#f1f5ff]">
          <div className="chat-user p-3 flex items-center gap-3 border-b border-[#c6c6c6]">
            <img className="w-[38px] rounded-full" src={assets.profile_img} alt="" />
            <p className="flex-1 text-xl font-medium text-[#393939]">
              {chatUser.userData.name}
              {Date.now() - chatUser.userData.lastSeen <= 70000 ? (
                <img className="dot w-[15px] h-[15px]" src={assets.green_dot} alt="" />
              ) : null}
            </p>
            <img className="help w-[22px] cursor-pointer" src={assets.help_icon} alt="" />
          </div>
  
          <div className="chat-msg h-[calc(100%-70px)] pb-12 overflow-y-scroll flex flex-col-reverse">
            {messages.map((msg, index) => (
              <div key={index} className={msg.sId === userData.id ? 's-msg flex items-end justify-end gap-2 px-4 py-2' : 'r-msg flex items-end justify-start gap-2 px-4 py-2'}>
                <p className="msg text-white bg-[#077EFF] p-2 max-w-[200px] text-[11px] font-light rounded-[8px_8px_0_8px] mb-7">
                  {msg.text}
                </p>
                <div className="text-center text-[9px]">
                  <img className="w-[27px] h-[27px] rounded-full" src={msg.sId === userData.id ? assets.profile_img : assets.profile_img} alt="" />
                  <p>{convertTimestamp(msg.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
  
          <div className="chat-input flex items-center gap-3 p-3 bg-white absolute bottom-0 left-0 right-0">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter Your Message"
              className="flex-1 border-none outline-none"
            />
            <input type="file" id="image" accept="image/png, image/jpeg" hidden />
            <label htmlFor="image">
              <img className="w-[22px] cursor-pointer" src={assets.gallery_icon} alt="" />
            </label>
            <img onClick={sendMessage} className="w-[30px] cursor-pointer" src={assets.send_button} alt="" />
          </div>
        </div>
      </>
    ) : (
      <div className="chat-welcome w-full flex flex-col items-center justify-center gap-2">
        <img className="w-[60px]" src={assets.logo_icon} alt="" />
        <p className="text-xl font-medium text-[#393939]">Chat anytime..</p>
      </div>
    );
  };

export default ChatBox