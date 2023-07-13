import { Avatar, Layout, List, Badge } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import {
  handleChatList,
  handleChatChange,
  handleOnlineUser,
} from '../../redux/actions/chatActions';
import GlobalHeader from '../../shared/header';
import './chat.css';

const { Content } = Layout;
const ChatList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { onlineUsers, chatList } = useSelector(state => state.chat);
  const { user } = useSelector(state => state.auth);

  const [socket, setSocket] = useState(null);
  const [allChats, setAllChats] = useState(chatList);
  const getAllUsers = async () => {
    try {
      await dispatch(handleChatList(true, []));
    } catch (e) {}
  };

  const storeOnlineUsers = async () => {
    try {
      console.log('onlineUsers', onlineUsers);
      if (onlineUsers.length > 0) {
        const updatedChatList = chatList.map(item1 => {
          const matchingItems = onlineUsers.find(item2 => item2.userId === item1.id);

          if (matchingItems) {
            return {
              ...item1,
              active: true,
            };
          }

          return item1;
        });

        setAllChats(updatedChatList);

        await dispatch(handleChatList(false, updatedChatList));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleChatRedirect = async item => {
    await dispatch(handleChatChange(item));
    navigate(`/chats/${item.key}`);
  };

  const updateOnlineStatus = async onlineUsers => {
    await dispatch(handleOnlineUser(onlineUsers));
  };

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_API_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    (async () => {
      if (socket === null) return;
      socket.emit('addNewUser', user);
      socket.on('getOnlineUsers', res => {
        updateOnlineStatus(res);
      });

      return () => {
        socket.off('getOnlineUsers');
      };
    })();
  }, [socket]);

  useEffect(() => {
    (async () => {
      await storeOnlineUsers();
    })();
  }, [onlineUsers]);

  useEffect(() => {
    (async () => {
      await getAllUsers();
    })();
  }, []);

  return (
    <Layout style={{ flex: 1, overflow: 'hidden' }}>
      <GlobalHeader title={'Chats'} />
      <Content style={{ padding: '24px', overflow: 'auto' }}>
        <List
          style={{ cursor: 'pointer' }}
          itemLayout="horizontal"
          dataSource={allChats}
          renderItem={(item, index) => (
            <span role="presentation" onClick={() => handleChatRedirect(item)}>
              <List.Item className="chat-list">
                <List.Item.Meta
                  avatar={<Avatar src={item.productDetails.image} />}
                  title={
                    <span>
                      {item.label} {item.active && <Badge status="success" />}
                    </span>
                  }
                  description={item.productDetails.productDescription}
                />
              </List.Item>
            </span>
          )}
        />
      </Content>
    </Layout>
  );
};
export default ChatList;
