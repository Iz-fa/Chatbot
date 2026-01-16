import dayjs from 'dayjs';
import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/profile-1.jpg';
import './ChatMessage.css'

export function ChatMessage({ message, sender, time }) {
  // const message = props.message;
  // const sender = props.sender;           //these 2 lines are same as the next one, also the same as the params
  // const { message, sender } = props;

  /*
  if (sender === 'robot') {
    return (
      <div>
        <img src="robot.png" width="50" />
        {message}
      </div>
    );
  }
  */
 

  return ( 
    <div className={
      sender === 'user'
        ? 'chat-message-user'
        : 'chat-message-robot' 
    }>                                      
      {sender === 'robot' && ( // the &&  is same as using if statment
        <img src= {RobotProfileImage} className="chat-message-profile" />
      )}
      <div className="chat-message-text">
        {message}
        {time && (
          <div className= "chat-message-time">  
            {dayjs(time).format('HH:mm')}   
          </div>
        )}
      </div>
      {sender === 'user' && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )}
    </div>
  );
}