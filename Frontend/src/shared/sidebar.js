import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Avatar, Badge, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { handleSidebarChange, handleSidebarData } from '../redux/actions/sidebarAction';
import './sidebar.css';

const { Sider } = Layout;
const { Item } = Menu;

const Sidebar = () => {
  const dispatch = useDispatch();
  const { isCollapsed, activatedSidebarKey, sidebarData, onlineUsers } = useSelector(
    state => state.sidebar
  );

  const getAllUsers = async () => {
    try {
      await dispatch(handleSidebarData(true, []));
    } catch (e) {}
  };

  const storeOnlineUsers = async () => {
    try {
      if (onlineUsers.length > 0) {
        const updatedSidebarData = sidebarData.map(item1 => {
          const matchingItems = onlineUsers.find(item2 => item2.userId === item1.id);

          if (matchingItems) {
            return {
              ...item1,
              active: true,
            };
          }

          return item1;
        });

        await dispatch(handleSidebarData(false, updatedSidebarData));
      }
    } catch (e) {
      console.log(e);
    }
  };

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
    <Sider trigger={null} collapsible collapsed={isCollapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[activatedSidebarKey]}
        onClick={e => dispatch(handleSidebarChange(e.key))}
      >
        {sidebarData.length > 0 &&
          sidebarData.map(e => (
            <Item key={e.key}>
              <span className="menu-item-text">
                {e.label}
                {e.active && <Badge status="success" />}
              </span>
            </Item>
          ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
