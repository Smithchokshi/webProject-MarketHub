import { DollarOutlined, WechatOutlined } from '@ant-design/icons';

const initialState = {
  isCollapsed: false,
  activatedSidebarKey: {
    key: window.location.pathname,
  },
  sidebarData: [
    {
      key: '/chats',
      label: 'Chats',
      icon: <WechatOutlined />,
      url: '/chats',
    },
    {
      key: '/transactions',
      label: 'Transactions',
      icon: <DollarOutlined />,
      url: '/transactions',
    },
  ],
};

const SidebarReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'COLLAPSE':
      return {
        ...state,
        isCollapsed: !state.isCollapsed,
      };
    case 'CHANGE_SIDEBAR':
      return {
        ...state,
        activatedSidebarKey: payload,
      };
    default:
      return state;
  }
};

export default SidebarReducer;
