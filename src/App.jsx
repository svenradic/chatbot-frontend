import React from 'react'
import Message from './components/Message';
import ChatbotWindow from './components/ChatbotWindow';

function App() {
  const [user, setUser] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [chatMessages, setChatMessages] = React.useState([{role: 'assistant', content:'Welcome to the chatbot!'}]);
  const [inputText, setInputText] = React.useState('');

  React.useEffect(() => {
    const fetchUserData = async () => { // Define async function
      try {
        const response = await fetch('https://localhost:7030/api/message/current-user', {
          method: 'GET',
          credentials: 'include' // Include cookies in the request
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
    
  }, [isOpen])
   
  function toggleChat(){
    setIsOpen(oldIsOpen => !oldIsOpen);
  }

  function displayMessages(){
    return chatMessages.map((message, index) => {
      return (<Message
        key={index}
        content={message.content}
        role={message.role}
      />)
    });
  }

  function handleInputChange(event){
    setInputText(event.target.value);
  }

 function createMessage(){
  return {
    role: 'user',
    content: inputText,
    userId: user.Id
  }
 }
  function handleSendMessage(){
   if(inputText !== ''){
      const newMessage = createMessage();
      const newMessages = [...chatMessages, newMessage];
      setChatMessages(newMessages);
      setTimeout(async () => {
        await processMessagesToChatGPT(newMessages);
      }, 500);
    }
    setInputText('');
  }
  function handleKeyDown(event){
    if(event.key === 'Enter'){
      handleSendMessage();
    }
  }

async function processMessagesToChatGPT(newMessages){
  try {
   
    const response = await fetch("https://localhost:7030/api/message/process-messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMessages)
    });
    
    if (!response.ok) {
        throw new Error('Failed to process messages');
    }
    
    const data = await response.json();
    // Handle the response data as needed
  
    const extractedMessages = data.map(message => ({
      role: message.Role,
      content: message.Content,
      userId: message.UserId
    }));
    setChatMessages(extractedMessages);
  

} catch (error) {
    console.error('Error processing messages:', error.message);
}
}

/*
  async function processMessagesToChatGPT(newMessages){
    const apiMesssages = newMessages.map(message => {
      return message.isUser ?
      {
        role: 'user',
        content: message.text
      }:
      {
        role: 'assistant',
        content: message.text
      };
    });

    const systemMessage = {
      role: 'system',
      content: 'Speak like a cool 20 year old student'
    };

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMesssages
      ]
    };
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then(data => {return data.json()})
      .then(data => {
        setChatMessages([...newMessages, {
          isUser: false,
          text: data.choices[0].message.content
        }]);
      })

  }
  */

  return (
    <main >
      <button onClick={toggleChat} className='toggle-button'>{isOpen ? 'Close chat': 'Open chat'}</button>

      {isOpen && (
        <ChatbotWindow 
          displayMessages={displayMessages}
          inputText={inputText}
          handleInputChange={handleInputChange}
          handleKeyDown={handleKeyDown}
          handleSendMessage={handleSendMessage}
          toggleChat={toggleChat}
        />
      )}
    </main>
  )
}

export default App
