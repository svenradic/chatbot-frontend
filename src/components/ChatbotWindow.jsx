import React from 'react'

export default function ChatbotWindow(props) {

  return (
    <div className='chatbot-window'>
        <div className='header'>
            <h1>Welcome to the Chatbot!</h1>
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
            
            <button className='close-button' onClick={() => props.toggleChat()}>X</button>
        </div>
          
    </div>
  )
}
