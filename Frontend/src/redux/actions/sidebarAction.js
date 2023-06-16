import ApiUtils from '../../helpers/APIUtils';
import { UserOutlined } from '@ant-design/icons';

const api = msg => new ApiUtils(msg);

export const handleCollapse = () => async dispatch => {
  try {
    dispatch({ type: 'COLLAPSE' });
    return true;
  } catch (err) {
    return false;
  }
};

export const handleSidebarChange = key => async dispatch => {
  try {
    dispatch({ type: 'CHANGE_SIDEBAR', payload: key });
  } catch (err) {
    return false;
  }
};

export const handleSidebarData = (callAPI, data) => async dispatch => {
  try {
    const tempData = data;
    if (callAPI) {
      const res = await api().getAllChats();

      res.data.allChats.map((e, index) => {
        tempData.push({
          key: e.chatId,
          label: e.userDetails[0].name,
          id: e.userDetails[0]._id,
          active: false,
        });
      });
      await dispatch({ type: 'CHANGE_SIDEBAR', payload: tempData[0].key });
    }
    await dispatch({ type: 'STORE_DATA', payload: tempData });

    return true;
  } catch (err) {
    return false;
  }
};

export const handleOnlineUser = data => async dispatch => {
  try {
    dispatch({ type: 'STORE_ONLINE_USERS', payload: data });
    return true;
  } catch (err) {
    return false;
  }
};
