import React, { useEffect, useState } from 'react';
import { Layout, Menu, Avatar, Badge, Space, Divider, Tooltip } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleSidebarChange } from '../redux/actions/sidebarAction';
import LOGO from '../assets/light-logo.svg';
import './sidebar.css';
import { UserOutlined, WechatOutlined } from '@ant-design/icons';

const { Sider } = Layout;
const { Item } = Menu;

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isCollapsed, activatedSidebarKey, sidebarData } = useSelector(state => state.sidebar);

  const changeSidebar = async e => {
    try {
      await dispatch(handleSidebarChange(e));
      if (e.key === '/products') navigate('/');
      else navigate(`${e.url}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Sider trigger={null} collapsible collapsed={isCollapsed}>
      <div className="demo-logo-vertical" />
      <Menu theme="dark" mode="inline" selectedKeys={[activatedSidebarKey.key]}>
        <Item
          key="/products"
          onClick={e => changeSidebar(e)}
          className="menu-item-wrapper markethub-item"
        >
          {isCollapsed ? (
            <span className="menu-item-text">
              <img src={LOGO} alt="Logo" className="logo-image" />
            </span>
          ) : (
            <div className="menu-item-text">
              <img src={LOGO} alt="Logo" className="logo-image" />
              MarketHub
            </div>
          )}
        </Item>

        <Divider className="sidebar-divider" />
        {sidebarData.map(e => (
          <Item key={e.key} onClick={() => changeSidebar(e)} className="menu-item-wrapper">
            {isCollapsed ? (
              <Tooltip placement="right" title={<span className="menu-item-text">{e.label}</span>}>
                <span className="menu-item-text">{e.icon}</span>
              </Tooltip>
            ) : (
              <span className="menu-item-text">
                {e.icon} {e.label}
              </span>
            )}
          </Item>
        ))}
        {/*{sidebarData.length > 0 &&*/}
        {/*  sidebarData.map(e => (*/}
        {/*    <Item key={e.key} onClick={() => changeSidebar(e)} className="menu-item-wrapper">*/}
        {/*      {isCollapsed ? (*/}
        {/*        <Tooltip*/}
        {/*          placement="right"*/}
        {/*          title={*/}
        {/*            <span className="menu-item-text">*/}
        {/*              {e.label}*/}
        {/*              {e.active && <Badge status="success" />}*/}
        {/*            </span>*/}
        {/*          }*/}
        {/*        >*/}
        {/*          <span className="menu-item-text">*/}
        {/*            <UserOutlined />*/}
        {/*          </span>*/}
        {/*        </Tooltip>*/}
        {/*      ) : (*/}
        {/*        <span className="menu-item-text">*/}
        {/*          {e.label}*/}
        {/*          {e.active && <Badge status="success" />}*/}
        {/*        </span>*/}
        {/*      )}*/}
        {/*    </Item>*/}
        {/*  ))}*/}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
