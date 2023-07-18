import React, { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Button, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { handleCollapse, handleSidebarChange } from '../redux/actions/sidebarAction';
import { logout } from '../redux/actions/authActions';
import './header.css';

const { Header } = Layout;

const GlobalHeader = ({userName}, { title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isCollapsed, activatedSidebarKey, sidebarData } = useSelector(state => state.sidebar);
  const { selectedChat, chatList } = useSelector(state => state.chat);
  const { isAuthenticated } = useSelector(state => state.auth);
  const [label, setLabel] = useState(null);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = async () => {
    const data = {
      key: 'marketplace',
    };
    await dispatch(logout());
    await dispatch(handleSidebarChange(data));
    localStorage.removeItem('token');
    navigate('/login');
  };

  const storeLabel = async () => {
    console.log(activatedSidebarKey.key.split('/').length);
    const [filterData] = sidebarData.filter(cur => cur.key === activatedSidebarKey?.key);
    const tempData = {
      key: activatedSidebarKey?.key,
      label: filterData?.label,
    };
    await dispatch(handleSidebarChange(tempData));
    setLabel(filterData?.label);
  };

  useEffect(() => {
    (async () => {
      if (!activatedSidebarKey?.label) await storeLabel();
      else setLabel(activatedSidebarKey?.label);
    })();
  }, [activatedSidebarKey?.key]);

  useEffect(() => {
    setLabel(`${activatedSidebarKey?.label} / ${selectedChat?.label}`);
  }, [selectedChat?.key]);

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {isAuthenticated && (
          <Button
            type="text"
            icon={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => dispatch(handleCollapse())}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        )}
        <div style={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
          {title === 'Products' ? (
            <>
              <span
                style={{ marginRight: '20px', cursor: 'pointer' }}
                role="presentation"
                onClick={() => navigate('/contact-us')}
              >
                Contact Us
              </span>
              <span
                style={{ marginRight: '20px', cursor: 'pointer' }}
                role="presentation"
                onClick={() => navigate('/faq')}
              >
                FAQ
              </span>
            </>
          ) : (
            <span>{title}</span>
          )}
        </div>
      </div>
      {isAuthenticated ? (
        <>
        <p className='username'>{userName}</p>
        <Button
          type="primary"
          onClick={handleLogout}
          style={{
            height: '32px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '10px',
          }}
        >
          Logout
        </Button>
        </>
      ) : (
        <Button
          type="primary"
          onClick={() => navigate('/login')}
          style={{
            height: '32px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '10px',
          }}
        >
          Login
        </Button>
      )}
    </Header>
  );
};

export default GlobalHeader;
