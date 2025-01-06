import React, { useContext, useEffect, useState } from 'react';
import LeftSide from '../../Components/LeftSidebar/LeftSide';
import ChatBox from '../../Components/ChatBox/ChatBox';
import { AppContext } from '../../context/AppContext';

const Chat = () => {
  const { chatData, userData } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (chatData && userData) {
      setLoading(false);
    }
  }, [chatData, userData]);

  return (
    <div className="chat min-h-screen bg-gradient-to-r from-[#596AFF] to-[#383699] grid place-items-center">
      {loading ? (
        <p className="loading text-white text-5xl">LOADING...</p>
      ) : (
        <div className="chat-container w-[95%]  h-100vh max-w-[1000px] bg-aliceblue grid grid-cols-1 sm:grid-cols-2 gap-5">
          <LeftSide />
          <ChatBox />
          {/* <RightSide /> */}
        </div>
      )}
    </div>
  );
};

export default Chat;
