import ApiUtils from '../../helpers/APIUtils';

const api = msg => new ApiUtils(msg);

export const handleChatChange = key => async dispatch => {
  try {
    dispatch({ type: 'CHANGE_SELECTED_CHAT', payload: key });
  } catch (err) {
    return false;
  }
};

export const handleChatList = (callAPI, data) => async dispatch => {
  try {
    const tempData = data;
    if (callAPI) {
      const res = await api().getAllChats();

      res.data.allChats.map((e, index) => {
        tempData.push({
          key: e.chatId,
          label: `${e.userDetails[0].name} - ${e.productName}`,
          id: e.userDetails[0]._id,
          active: false,
          productDetails: e.productDetails,
        });
      });
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
