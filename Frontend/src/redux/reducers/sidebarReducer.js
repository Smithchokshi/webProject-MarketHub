const initialState = {
  isCollapsed: false,
<<<<<<< HEAD
  activatedSidebarKey: '1',
=======
  activatedSidebarKey: { key: 'marketplace' },
  sidebarData: [],
  onlineUsers: [],
>>>>>>> development
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
<<<<<<< HEAD
=======
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
>>>>>>> development
    default:
      return state;
  }
};

export default SidebarReducer;
