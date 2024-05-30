import React from 'react'

export default function Message(props) {

  return (
    <div className={props.role == 'user' ? 'message user': 'message chatbot'}>
      <div className='message-text'>
        <span className={props.role == 'user' ? 'span-user': 'span-chatbot'}>{props.role == 'user' ? (props.user ? props.user.firstName + ":" : 'You:' ): 'Chatbot:'}</span>
        <p>{props.content}</p>
      </div>
        
    </div>
  )
}
