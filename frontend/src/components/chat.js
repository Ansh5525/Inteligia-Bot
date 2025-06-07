import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const chatEndRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/chatlogs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data && Array.isArray(response.data)) {
          setChat(
            response.data.map((log) => ({
              user: log.role === 'user' ? 'You' : 'AI',
              text: log.content,
            }))
          );
        }
      } catch (error) {
        console.error('Failed to load chat history:', error);
      }
    };

    fetchHistory();
  }, []);

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
              Authorization: `Bearer ${token}`,
            },
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

  const styles = {
    container: {
      width: '100%',
      maxWidth: '600px',
      margin: '40px auto',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      backgroundColor: '#fff',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      height: '70vh',
      color: '#000',
    },
    logoutBtn: {
      alignSelf: 'flex-end',
      backgroundColor: '#f44336',
      border: 'none',
      color: 'white',
      padding: '8px 14px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'background-color 0.3s ease',
      marginBottom: '10px',
    },
    chatBox: {
      flexGrow: 1,
      overflowY: 'auto',
      padding: '15px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      backgroundColor: '#1E0000',
      borderRadius: '12px',
      color: '#fff',
    },
    messageUser: {
      alignSelf: 'flex-end',
      backgroundColor: '#e60023',
      color: 'white',
      padding: '12px 18px',
      borderRadius: '20px 20px 0 20px',
      maxWidth: '70%',
      wordBreak: 'break-word',
      fontSize: '1rem',
    },
    messageAI: {
      alignSelf: 'flex-start',
      backgroundColor: '#e5e5ea',
      color: '#333',
      padding: '12px 18px',
      borderRadius: '20px 20px 20px 0',
      maxWidth: '70%',
      wordBreak: 'break-word',
      fontSize: '1rem',
    },
    inputContainer: {
      marginTop: '15px',
      display: 'flex',
      gap: '12px',
    },
    input: {
      flexGrow: 1,
      padding: '14px 20px',
      borderRadius: '25px',
      border: '1px solid #ccc',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.3s ease',
    },
    button: {
      padding: '14px 24px',
      borderRadius: '25px',
      border: 'none',
      color: 'white',
      fontWeight: '700',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'background-color 0.4s ease, box-shadow 0.3s ease',
    },
  };

  return (
    <div style={styles.container}>
      <button
        onClick={handleLogout}
        style={styles.logoutBtn}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d32f2f')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f44336')}
      >
        Logout
      </button>

      <div style={styles.chatBox}>
        {chat.map((msg, index) => (
          <div
            key={index}
            style={msg.user === 'You' ? styles.messageUser : styles.messageAI}
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
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          onFocus={(e) =>
            Object.assign(e.target.style, {
              borderColor: '#e60023',
              boxShadow: '0 0 5px #e60023',
            })
          }
          onBlur={(e) =>
            Object.assign(e.target.style, {
              borderColor: '#ccc',
              boxShadow: 'none',
            })
          }
        />
        <button
          onClick={sendMessage}
          style={{
            ...styles.button,
            backgroundColor: message.length > 0 ? '#b30010' : '#888',
          }}
          onMouseEnter={(e) => {
            if (message.length > 0) {
              e.currentTarget.style.boxShadow = '0 0 8px #b30010';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
