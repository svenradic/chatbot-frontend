import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function ChatbotWindow(props) {


  function getShadowElement(){
    const element = document.getElementById('root');
    const shadowElement = element.shadowRoot.querySelector('.chatbot-window');
    return shadowElement;
  }
  function minimize(){
    let shadowElement = getShadowElement();
    shadowElement.classList.add('mid-size');   
  }
  function maximize(){
    let shadowElement = getShadowElement();
    shadowElement.classList.remove('mid-size');   
  }

  function toggleMinimization(){
    if(props.isMinimized){
      maximize();
      props.setIsMinimized(false);
    } else{
      minimize();
      props.setIsMinimized(true);
    }
    console.log(props.isMinimized);
  }

  return (
    <div className='chatbot-window'>
        <div className='header'>
            <h1>Welcome to the Chatbot!</h1>
            
            
            {props.user ? 
            <button className='new-button' onClick={() => props.createThread()}><i className="bi bi-plus-square"></i> New Chat</button> 
            : null}
            {props.user ? props.displayThreads() : null}
        </div>
        <div className='container'>
            <div className='chatbot-messages'>
                {props.displayMessages()}
            </div>

            <div className="input-area">
                <input
                type="text"
                placeholder="Type your message..."
                value={props.inputText}
                onChange={event => props.handleInputChange(event)}
                onKeyDown={event => props.handleKeyDown(event)}
                />
                <button className="send-button" onClick={() => props.handleSendMessage()}>Send</button>
            </div>
            <div className='buttons'>
               <button className='minimize-button' onClick={() => toggleMinimization()}><i className="bi bi-fullscreen-exit"></i></button>
                <button className='close-button' onClick={() => props.toggleChat()}><i className="bi bi-x-lg"></i></button>
            </div>
           
        </div>
          
    </div>
  )
}
