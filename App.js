import './App.css';
import gptlogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgicon from './assets/message.svg';
import home from './assets/home.svg';
import rocket from './assets/rocket.svg';
import save from './assets/bookmark.svg';
import sendBtn from './assets/send.svg';
import usericon from './assets/user-icon.png';
import chatgptlogo from './assets/chatgptLogo.svg';
import { sendMsgToOpenAi } from './openai';
import { useEffect, useState } from 'react';
import React, { useRef } from 'react';



function App() {
  const MsgEnd = useRef(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      text: "hi fr4njrrrrrrrrrrrrrrrrrrrrrr2ugb25ijrgboi4ubgbghbo5",
      isBot: true,
    },
  ]);

  useEffect(() => {
    MsgEnd.current.scrollIntoView();
  }, [messages]);

  const handlesend = async () => {
    const text = input;
    setInput('');
    
    // Display user's message
    setMessages((prevMessages) => [
      ...prevMessages,
      { text, isBot: false },
    ]);

    // Send message to OpenAI and display response
    try {
      const res = await sendMsgToOpenAi(input);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: res, isBot: true },
      ]);
    } catch (error) {
      console.error("Error sending message to OpenAI:", error.message);
    }
  };
  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSidetop"><img src={gptlogo} alt="Logo" className="logo"/><span className="brand">chatgpt</span></div>
          <button className="midBtn"><img src={addBtn} alt="new chat" className="addBtn"/>New chat</button>
          <div className="upperSideBottom">
            <button className="query"><img src={msgicon} alt="Query" />What is Programming ?</button> 
            <button className="query"><img src={msgicon} alt="Query" />How to use an API ?</button>
          </div>
           
        </div>
        <div className="lowerside">
          <div className="listitems"><img src={home} alt="Home" className="listitemsImg"/>Home</div>
          <div className="listitems"><img src={save} alt="Saved" className="listitemsImg"/>Saved</div>
          <div className="listitems"><img src={rocket} alt="Upgrade" className="listitemsImg"/>Upgrade to pro</div>

        </div>
      </div>
      <div className="main">
  <div className="chats">
    {messages.map((message, i) => 
    <div  key={i} className={message.isBot? "chat bot":"chat"}>
      <img className="chatImg" src={message.isBot?chatgptlogo:usericon} alt="" /><p className="txt">{message.text}</p>
    </div> 
    )}
    <div ref ={MsgEnd}/>
  </div>
  <div className="chatFooter">
    <div className="inp">
      <input type="text" placeholder='send a message...' value={input} onChange={(e)=>{setInput(e.target.value)}}/> <button className="send" onClick={handlesend}><img src={sendBtn} alt="send" /></button>
    </div>
    <p>chatgpt may produce incorrect results</p>
  </div>
</div>

    </div>
  );
}
export default App;
