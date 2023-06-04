import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { handleSidebarChange } from '../redux/actions/sidebarAction';
import APIUtils from '../helpers/APIUtils';

const api = msg => new APIUtils(msg);

const { Sider } = Layout;

const Sidebar = () => {
  const dispatch = useDispatch();
  const [sidebar, setSidebar] = useState([]);

  const getAllUsers = async () => {
    try {
      const res = await api(false).getAllChats();
      const tempData = [];
      res.data.allChats.map((e, index) => {
        tempData.push({
          key: index + 1,
          icon: <UserOutlined />,
          label: e.userDetails.name,
          id: e.userDetails._id,
        });
      });
      setSidebar(tempData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      await getAllUsers();
    })();
  }, []);

  const { isCollapsed, activatedSidebarKey } = useSelector(state => state.sidebar);

  return (
    <Sider trigger={null} collapsible collapsed={isCollapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[activatedSidebarKey]}
        onClick={e => dispatch(handleSidebarChange(e.key))}
        items={sidebar}
      />
    </Sider>
  );
};

export default Sidebar;
