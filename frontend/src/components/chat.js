import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const handleLogout = () => {
  localStorage.removeItem('token');
  window.location.reload(); // quick way to go back to Auth screen
};

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
  if (message.trim()) {
    const userMsg = { user: 'You', text: message };
    setChat((prevChat) => [...prevChat, userMsg]);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8080/api/chat',
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const aiMsg = { user: 'AI', text: response.data.reply };
      setChat((prevChat) => [...prevChat, aiMsg]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
};



  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  return (
    <div style={styles.container}>
      <button onClick={handleLogout} style={{ marginBottom: '10px' }}>
      Logout
      </button>
      <h2>AI Chat</h2>
      <div style={styles.chatBox}>
        {chat.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.user === 'You' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.user === 'You' ? '#DCF8C6' : '#EEE',
            }}
          >
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>Send</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    fontFamily: 'Arial, sans-serif'
  },
  chatBox: {
    height: '400px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '10px'
  },
  message: {
    maxWidth: '70%',
    padding: '10px',
    borderRadius: '8px',
    lineHeight: '1.4',
  },
  inputContainer: {
    display: 'flex',
    gap: '10px'
  },
  input: {
    flexGrow: 1,
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px 20px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: 'white',
    cursor: 'pointer'
  }
};

export default Chat;
