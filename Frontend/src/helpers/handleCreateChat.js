import React from 'react';
import ApiUtils from './APIUtils';
import { handleSidebarChange } from '../redux/actions/sidebarAction';
import { handleChatChange } from '../redux/actions/chatActions';

const api = msg => new ApiUtils(msg);

const handleCreateChat = async (product, navigate, dispatch) => {
  try {
    const data = {
      secondId: product.userId,
      productName: product.productName,
      productId: product._id,
    };

    const res = await api(false).createChat(data);

    await dispatch(
      handleSidebarChange({
        key: '/chats',
      })
    );

    await dispatch(handleChatChange({}));

    if (res) navigate(`/chats/${res.data.chat._id}`);
  } catch (e) {
    console.log(e);
  }
};

export default handleCreateChat;
