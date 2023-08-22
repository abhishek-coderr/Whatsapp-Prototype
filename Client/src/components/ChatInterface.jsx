import React from 'react';
import { useState, useEffect } from 'react';
import './Chatinterface.css';
import { useNavigate, useParams } from 'react-router-dom';

function ChatInterface() {
  const { userId } = useParams();  
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/')
  };

  const [isFeaturesVisible, setFeaturesVisible] = useState(false);
  const toggleFeatuers = () => {
    setFeaturesVisible(!isFeaturesVisible);
  };
    
  const [isSettingsVisible, setSettingsVisible] = useState(false);
  const toggleSettings = () => {
    setSettingsVisible(!isSettingsVisible);
  };
  const hideSettings = () => {
    setSettingsVisible(false);
  };


  const handleDivClick = () => {
    navigate(`/group_chat/${userId}/marketplace`)
  };

  const [isChecked, setIsChecked] = useState(localStorage.getItem('marketplaceflag') === 'true');
  const handleCheckbox = () => {
    const newFlagValue = !isChecked;
    localStorage.setItem('marketplaceflag', newFlagValue);
    setIsChecked(newFlagValue);
  };

  useEffect(() => {
    localStorage.setItem('marketplaceflag', isChecked);
  }, [isChecked]);

  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello!', sender: 'user' },
    { id: 2, text: 'Hi there!', sender: 'contact' },
  ]);
    
  const sendMessage = (text) => {
    const newMessage = { id: messages.length + 1, text, sender: 'user' };
    setMessages([...messages, newMessage]);
        
    setTimeout(() => {
      const replyMessage = { id: messages.length + 2, text: 'I got your message.', sender: 'contact' };
      setMessages([...messages, replyMessage]);
    }, 1000);
  };
  
  return (
    <div className="chat-app">
      <div className='header'>
        
        <div className='user-icon'>
          <img src='https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_960_720.png' alt='group icon' />
        </div>
        <div onClick={toggleSettings} className='user-nmae'>
          <p>Name of group...</p>
        </div>
        <div className='user-contact'>
          <p><i class="fa-solid fa-video"></i></p>
          <p><i class="fa-solid fa-phone"></i></p>
          <p title='Settings' onClick={toggleSettings}><i class="fa-solid fa-ellipsis-vertical"></i></p>
          <p title='Logout'><i onClick={handleGoBack} class="fa-solid fa-right-from-bracket"></i></p>
        </div>
      </div>
  
        
      {isSettingsVisible && (
          <div className='settings'>
              <div className='setting_A'>
                  <p><i onClick={hideSettings} class="fa-solid fa-arrow-left"></i></p>
                  <p><i class="fa-solid fa-ellipsis-vertical"></i></p>
              </div>
              <div className='group_details'>
                  <img src='https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_960_720.png' alt='group icon' />
              </div>
              <div className='group_details'>
                  <h2>Name of group</h2>
                  <p>number of participants</p>
                  <div>
                      <p><i class="fa-solid fa-phone"></i><br />Group call</p>
                      <p><i class="fa-solid fa-magnifying-glass"></i><br />Search</p>
                  </div>
              </div>
              <hr />
              <div className='group_description'>
                  <h3>Add group description</h3>
                  <p>Created on ...</p>
              </div>
              <hr />
              <div className='justify'>
                  <span>Media, link, and docs</span>
                  <span>0 <i class="fa-solid fa-greater-than"></i></span>
              </div>
              <hr />
              <div>
                  <div className='_settings'><i class="fa-solid fa-bell"></i>Mute notifications</div>
                  <div className='_settings'><i class="fa-solid fa-music"></i>Custom notifications</div>
                  <div className='_settings'><i class="fa-solid fa-image"></i>Media visinility</div>
              </div>
              <hr />
              <div>
                  <div className='_settings'><i class="fa-solid fa-lock"></i>Encyption</div>
                  <div className='_settings'><i class="fa-regular fa-clock"></i>Disappearing message</div>
                  <div className='_settings'><i class="fa-solid fa-comment"></i>Chat lock</div>
                  {userId==='admin' ? (
                    <div className='_settings market' onClick={handleCheckbox}>
                      <i class="fa-solid fa-cart-shopping"></i>Market Place
                      <input className='radio' type='checkbox' checked={isChecked} onChange={handleCheckbox} />
                    </div>                    
                  ) : (
                    <div className='_settings2'><i class="fa-solid fa-cart-shopping"></i><b>Only Admins can turn on marketplace</b></div>
                  )}
              </div>

              <hr />

              <div>
                <div className='justify'>
                  <span>Participants</span>
                  <span><i class="fa-solid fa-magnifying-glass"></i></span>
                </div>
              </div>

              <hr />

              <div>
                <div className='_settings2'><i class="fa-solid fa-right-from-bracket"></i>Exit group</div>
                <div className='_settings2'><i class="fa-solid fa-thumbs-down"></i>Report group</div>
              </div>
          </div>
      )}


      <div className="message-list">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <div className="message-input">
          <i class="fa-regular fa-face-smile"></i>
          <input type="text" placeholder="Message..." />
          <i onClick={toggleFeatuers} class="fa-solid fa-paperclip"></i>
          <i class="fa-solid fa-indian-rupee-sign"></i>
          <i class="fa-solid fa-camera"></i>
        </div>
        <div className='send-button' onClick={() => sendMessage(document.querySelector('input').value)}>
          <i class="fa-solid fa-arrow-right"></i>
        </div>
      </div>
      {isFeaturesVisible && (
        <div style={{ display: 'grid'}} className='features'>
          <p><i class="fa-solid fa-file"></i><br></br>Document</p>
          <p><i class="fa-solid fa-camera"></i><br></br>Camera</p>
          <p><i class="fa-solid fa-image"></i><br></br>Gallery</p>
          <p><i class="fa-solid fa-headphones"></i><br></br>Audio</p>
          <p><i class="fa-solid fa-location-dot"></i><br></br>Loaction</p>
          <p><i class="fa-solid fa-indian-rupee-sign"></i><br></br>Payment</p>
          <p><i class="fa-solid fa-address-book"></i><br></br>Contact</p>
          <p><i class="fa-solid fa-square-poll-vertical"></i><br></br>Poll</p>
          {(localStorage.getItem('marketplaceflag') === 'true') && (
            <p><i  onClick={handleDivClick} class="fa-solid fa-cart-shopping"></i><br></br>MarketPlace</p>
          )}
        </div>
      )}
    </div>      
  );
}

export default ChatInterface;