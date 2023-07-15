import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Divider, Card, Space, Button, Layout, Rate } from 'antd';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import APIUtils from '../../helpers/APIUtils';
import GlobalHeader from '../../shared/header';
import { handleSidebarChange } from '../../redux/actions/sidebarAction';
import { handleChatChange } from '../../redux/actions/chatActions';

const { Content } = Layout;

const api = msg => new APIUtils(msg);
function ProductDetails() {
  const { chatList } = useSelector(state => state.chat);
  const dispatch = useDispatch();

  const { Meta } = Card;
  const [product, SetProduct] = useState([]);
  const [rateData, SetRateData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [lightboxVisible, setLightboxVisible] = useState(false);

  const getData = async () => {
    try {
      const res = await api(false).getOneProduct({ productId: id });
      SetProduct(res.data[0]);

      const rData = await api(false).getRatings({ productId: id });
      const ratings = {
        averageRatings: rData.data.rate.averageRatings,
        userRatings: rData.data.rate.userRatings,
      };
      SetRateData(ratings);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);

  const handleRatingChange = async rating => {
    const data = {
      productId: id,
      rateNumber: rating,
    };
    const res = await api(true).setRating(data);
    await getData();
  };

  const navigateToComment = () => {
    navigate(`/comment/${id}?name=${product?.productName}`);
  };
  const navigateToproducts = () => {
    navigate(`/products`);
  };

  const handleCreateChat = async () => {
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
  return (
    <Layout style={{ flex: 1, overflow: 'hidden' }}>
      <GlobalHeader title={'Products'} />
      <Content style={{ padding: '24px', overflow: 'auto' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Card style={{ backgroundColor: '#f5f5f5' }}>
            <Meta
              // avatar={<Avatar size={128} src={product?.image} />}
              avatar={
                <Avatar
                  size={128}
                  src={product?.image}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setLightboxVisible(true)}
                />
              }
              title={
                <div>
                  <h2 style={{ fontSize: '32px', float: 'left' }}>{product?.productName}</h2>
                  <Button type="primary" style={{ float: 'right' }} onClick={navigateToproducts}>
                    Back
                  </Button>
                </div>
              }
              description={`Product Price: ${product?.price}`}
            />
            {lightboxVisible && (
              <Lightbox
                mainSrc={product?.image}
                onCloseRequest={() => setLightboxVisible(false)}
                imageTitle={product?.productName}
                imageCaption={`Product Price: ${product?.price}`}
              />
            )}
            <Rate allowHalf value={rateData?.userRatings} onChange={handleRatingChange} />
            <br />
            Total Ratings: {parseFloat(rateData?.averageRatings).toFixed(2)}
            <Divider />
            <div>
              <Space size="middle" wrap>
                <Button type="primary" onClick={navigateToComment}>
                  Comment
                </Button>
                <Button type="primary" onClick={handleCreateChat}>
                  Chat
                </Button>
                <Button type="primary">Payment</Button>
              </Space>
            </div>
            <Divider />
            <h2>Address</h2>
            {/* <p>{product.productDescription}</p> */}
            <p>133-137 Scudamore Rd, Leicester LE3 1UQ, United Kingdom</p>
            <Divider />
            <h2>Product description</h2>
            <p>{product?.productDescription}</p>
            <Divider />
            <h2>Market Place Verified User</h2>
          </Card>
        </div>
      </Content>
    </Layout>
  );
}

export default ProductDetails;