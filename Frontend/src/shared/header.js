import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Button, theme } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { handleCollapse } from '../redux/actions/sidebarAction';

const { Header } = Layout;

const GlobalHeader = () => {
  const dispatch = useDispatch();
  const { isCollapsed } = useSelector(state => state.sidebar);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <Button
        type="text"
        icon={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => dispatch(handleCollapse())}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      >
        {' '}
        Chat History
      </Button>
    </Header>
  );
};

export default GlobalHeader;
