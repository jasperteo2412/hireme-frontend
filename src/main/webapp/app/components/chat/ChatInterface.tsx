import React, { useState } from 'react';
import { Input, Button, List } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const ChatInterface = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = () => {
    if (message) {
      setMessages([...messages, message]);
      setMessage('');
    }
  };
  return (
    <div className="chat-container" style={{ width: '400px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Chat Interface</h2>
      <div className="chat-messages" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <List dataSource={messages} renderItem={msg => <List.Item style={{ padding: '4px' }}>{msg}</List.Item>} />
      </div>
      <div className="chat-input" style={{ display: 'flex', marginTop: '16px', margin: "5px"}}>
        <Input
          placeholder="Type your message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          style={{ flex: 1, marginRight: '8px' }}
          onPressEnter={handleSendMessage}
        />
        <Button type="primary" icon={<SendOutlined />} onClick={handleSendMessage} style={{ margin: "5px"}}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;
