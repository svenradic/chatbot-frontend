import React from 'react'
import Message from './components/Message';
import ChatbotWindow from './components/ChatbotWindow';
import 'bootstrap-icons/font/bootstrap-icons.css';


function App() {
  const [currentThread, setCurrentThread] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [chatMessages, setChatMessages] = React.useState([{role: 'assistant', content:'Welcome to the chatbot!', threadId: user? user.threadId: null}]);
  const [inputText, setInputText] = React.useState('');
  const [isMinimized, setIsMinimized] = React.useState(false);
  
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
        if(data.threads.length == 0){
          createThread();
        }
        else{
          setCurrentThread(data.threads[0]);
        }
        
      }
      console.log(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  React.useEffect(() => {
    fetchUserData();
  }, [])

  React.useEffect(() => {
    if(currentThread){
      setChatMessages(currentThread.messages);
    }
  }, [currentThread])

  function makeCurrentThread(id){
    user ? 
    user.threads.forEach(thread => {
      if(thread.id == id){
        setCurrentThread(thread);
        
      }
    }): null;
  }
   
  function toggleChat(){
    setIsOpen(oldIsOpen => !oldIsOpen);
  }

  function displayThreads(){
    return user.threads.map((thread, index) => {
      return (<div 
          className='thread'
          onClick={() => makeCurrentThread(thread.id)}
          key={index}
          >
        {thread.name}
      </div>)
    });
  }

  function displayMessages(){
    if(currentThread){
      if(chatMessages.length == 2 && currentThread.name == "New chat"){
      fetchUserData();
    } 
    }
    
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
    threadId: currentThread? currentThread.id: null
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

  async function createThread(){
    const response = await fetch("https://localhost:7030/api/message/create-thread", {
        method: "POST"
    });
    
    if (!response.ok) {
        throw new Error('Failed to process messages');
    }
    
    const data = await response.json();
    // Handle the response data as needed
    console.log(data);
    setCurrentThread(data);
    fetchUserData();

  }

async function processMessagesToChatGPT(newMessages){
  try {
   
    const response = await fetch(`https://localhost:7030/api/message/process-messages/${currentThread? currentThread.id: -1}`, {
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
    console.log(data)
    // Handle the response data as needed
  
    const extractedMessages = data.map(message => ({
      role: message.role,
      content: message.content,
      threadId: message.threadId? message.threadId: null
     
    }));
    setChatMessages(extractedMessages);
  

} catch (error) {
    console.error('Error processing messages:', error.message);
}
}

  return (
    <main >
      <button onClick={toggleChat} className='toggle-button'>{isOpen ? 'Close chat': 'Open chat'}</button>
      <div className='overlay' style={{visibility: isOpen ? 'inherit' : 'hidden'}}>
        {isOpen && (
          <ChatbotWindow 
            user={user}
            displayMessages={displayMessages}
            inputText={inputText}
            handleInputChange={handleInputChange}
            handleKeyDown={handleKeyDown}
            handleSendMessage={handleSendMessage}
            toggleChat={toggleChat}
            displayThreads={displayThreads}
            createThread={createThread}
            isMinimized={isMinimized}
            setIsMinimized={setIsMinimized}
          />
        )}
      </div>
    </main>
  )
}

export default App
