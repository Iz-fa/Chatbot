import { useState, useEffect } from 'react'
import { ChatInput } from './components/ChatInput';
import  { ChatMessages } from './components/ChatMessages';
import {Chatbot} from 'supersimpledev';
import './App.css'

function App() {    
        const localMessages = JSON.parse(localStorage.getItem('messages'));
               //current data, updater function (updates the data)       
        const [chatMessages, setChatMessages] = useState(localMessages || []);     //using this the html gets updated directly
          
        // const [chatMessages, setChatMessages] = array;
        // const chatMessages = array[0];
        // const setChatMessages = array[1];

        useEffect(()=>{

          Chatbot.addResponses({
            "Bye": 'Goodbye!',
            'can you give me an id': ()=> {
              return `Ofcourse, there you go:  ${crypto.randomUUID()}`;
            }
          });

        },[]);

        useEffect(()=>{
          localStorage.setItem('messages', JSON.stringify(chatMessages));

        },[chatMessages]);

        return (
          <div className="app-container">
            {chatMessages.length === 0 && (
              <p className="welcome-message">
                Welcome to the chatbot project! Send a message using the textbox below.
              </p>
            )}
            <ChatMessages
              chatMessages={chatMessages}
            />
            <ChatInput
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
            />
          </div>
        );
      }

export default App
