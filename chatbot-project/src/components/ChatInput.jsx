import {useState} from 'react'
import { Chatbot } from 'supersimpledev'
import dayjs from 'dayjs';
import './ChatInput.css';
import LoadingGif from '../assets/loading-spinner.gif'


export function ChatInput({ chatMessages, setChatMessages }) {
        const [inputText, setInputText] = useState('');
        const [isLoading, setIsLoading] = useState(false);

        function saveInputText(event) {
          setInputText(event.target.value);
        }

        function handleKeyDown(event) {
          if (event.key === 'Enter') {
            sendMessage();
          } else if (event.key === 'Escape') {
            setInputText('');
          }
        }

        function clearMessages(){         
          // useEffect in the App component will run, and it will
          // automatically update messages in localStorage to be [].
          setChatMessages([]);
        }

        async function sendMessage() {
          if (isLoading || inputText === '') {
            return;
          }

          // Set isLoading to true at the start, and set it to
          // false after everything is done.
          setIsLoading(true);

          setInputText('');

          const newChatMessages = [
            ...chatMessages,           // ... makes a copy of that array. In react its better to not use the same data but a copy
            {
              message: inputText,
              sender: 'user',
              time: dayjs().valueOf(),
              id: crypto.randomUUID()
            }
          ];

          setChatMessages([
            ...newChatMessages,
            {
              message: <img className='loading-icon' src = {LoadingGif}/>,
              sender: 'robot',             
              id: crypto.randomUUID()
            }
          ]);

          const response = await Chatbot.getResponseAsync(inputText);
          setChatMessages([
            ...newChatMessages,
            {
              message: response,
              sender: 'robot',
              time: dayjs().valueOf(),
              id: crypto.randomUUID()
            }
          ]);
          
          setIsLoading(false);
        }

        
        
        return (
          <div className="chat-input-container">
            <input
              placeholder="Send a message to Chatbot"
              size="30"
              onChange={saveInputText}
              onKeyDown = {handleKeyDown}
              value={inputText}
              className="chat-input"
            />
            <button
              onClick={sendMessage} //the sendMessage eventhandler is not written like this sendMessage() cuz this runs the functions and it will return undefined
              className="send-button"
            >Send</button>
            <button
              onClick = {clearMessages}
              className = "clear-button"
            >Clear</button>
          </div>
        );
      }