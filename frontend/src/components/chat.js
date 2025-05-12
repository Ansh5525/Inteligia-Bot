import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    const sendMessage = async () => {
        if (message.trim()) {
            const userMsg = { user: 'You', text: message };
            setChat(prevChat => [...prevChat, userMsg]);
            setMessage('');

            try {
                const response = await axios.post('http://localhost:8080/chat', { message });
                const aiMsg = { user: 'AI', text: response.data.reply };
                setChat(prevChat => [...prevChat, aiMsg]);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <div>
            <div>
                {chat.map((msg, index) => (
                    <p key={index}><strong>{msg.user}:</strong> {msg.text}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
