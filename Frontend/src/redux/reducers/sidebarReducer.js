const initialState = {
  isCollapsed: false,
  activatedSidebarKey: {
    key:
      window.location.pathname.split('/chats/').length > 1
        ? window.location.pathname.split('/chats/')[1]
        : 'marketplace',
  },
  sidebarData: [],
  onlineUsers: [],
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
    case 'STORE_DATA':
      return {
        ...state,
        sidebarData: payload,
      };
    case 'STORE_ONLINE_USERS':
      return {
        ...state,
        onlineUsers: payload,
      };
    default:
      return state;
  }
};

export default SidebarReducer;
