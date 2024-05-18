import React from 'react'
import Message from './components/Message';
import ChatbotWindow from './components/ChatbotWindow';

function App() {
  const [user, setUser] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [chatMessages, setChatMessages] = React.useState([{role: 'assistant', content:'Welcome to the chatbot!'}]);
  const [inputText, setInputText] = React.useState('');

  console.log(user)
  
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
        if(data){
          setUser(data);
          setChatMessages(data.messages)
        }
        console.log(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
    
  }, [])
   
  function toggleChat(){
    setIsOpen(oldIsOpen => !oldIsOpen);
  }

  function displayMessages(){
    return chatMessages.map((message, index) => {
      return (<Message
        key={index}
        content={message.content}
        role={message.role}
        user={user}
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
    userId: user? user.id: null
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
     
    }));
    setChatMessages(extractedMessages);
  

} catch (error) {
    console.error('Error processing messages:', error.message);
}
}

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
