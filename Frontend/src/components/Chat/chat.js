import React, { useState } from 'react';
import { Layout, Button, theme, List, Input } from 'antd';
import GlobalHeader from '../../shared/header';
import useSimpleReactValidator from '../../helpers/useReactSimpleValidator';
import './chat.css';

const { Content } = Layout;

const demoMessages = [
  {
    content: 'Hello',
    type: 'send',
  },
  {
    content: 'How are you?',
    type: 'send',
  },
  {
    content: 'Hey, I am good Thank you',
    type: 'received',
  },
  {
    content: 'What about you?',
    type: 'received',
  },
  {
    content: `How's your study going?`,
    type: 'received',
  },
  {
    content: `It's going good`,
    type: 'send',
  },
  {
    content: 'Nice',
    type: 'received',
  },
];

const Chat = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [validator, setValidator] = useSimpleReactValidator();
  const [message, setMessage] = useState(null);
  const [allMessages, setAllMessages] = useState(demoMessages);

  const handleSubmit = () => {
    if (validator.allValid()) {
      setAllMessages([...allMessages, { content: message, type: 'send' }]);
      setMessage('');
    } else {
      validator.getErrorMessages();
      setValidator(true);
    }
  };

  return (
    <Layout>
      <GlobalHeader />
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
          position: 'relative',
          paddingBottom: '80px',
        }}
      >
        <div style={{ marginBottom: '60px' }}>
          <List
            dataSource={allMessages}
            renderItem={item => (
              <List.Item className={item.type === 'send' ? 'textRight' : ''}>
                {item.content}
              </List.Item>
            )}
          />
        </div>
        <div className="chat-input">
          <Input
            placeholder="Type a message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onPressEnter={handleSubmit}
            style={{ marginRight: '10px' }}
          />
          {validator.message('message', message, 'required')}
          <Button type="primary" onClick={handleSubmit}>
            Send
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default Chat;
