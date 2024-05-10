import React from 'react'

export default function Message(props) {

  return (
    <div className={props.role == 'user' ? 'message user': 'message chatbot'}>
      <div className='message-text'>
        <span>{props.role == 'user' ? 'You:' : 'Chatbot:'}</span>
        <p>{props.content}</p>
      </div>
        
      </div>
  )
}
