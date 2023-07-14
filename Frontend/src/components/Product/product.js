import React, { useState, useEffect } from 'react';
import { LikeOutlined, ShareAltOutlined, CommentOutlined } from '@ant-design/icons';
import { Avatar, Card, Row, Col, Tooltip, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import APIUtils from '../../helpers/APIUtils';
import './product.css';
import { handleSidebarChange } from '../../redux/actions/sidebarAction';
import GlobalHeader from '../../shared/header';
import { handleChatChange } from '../../redux/actions/chatActions';

const { Meta } = Card;
const { Content } = Layout;
const api = msg => new APIUtils(msg);

const Product = () => {
  const [cardData, setCardData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const res = await api(false).getALlProducts();

      setCardData(res.data.products);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreateChat = async productData => {
    try {
      const data = {
        secondId: productData.userId,
        productName: productData.productName,
        productId: productData._id,
      };

      const res = await api(true).createChat(data);

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

  const handleAddLike = async productId => {
    try {
      const data = {
        productId:productId,
        isLiked: true,
      };
      const res = await api(true).setLike(data);
      await getData();
      } catch (e) {
      console.log(e);
    }
  };

  const productDetails = (product_Id) => {
    navigate(`/products/${product_Id}`);
  };

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);
  const handleShare = (product_Id) => {
    const url = `${process.env.REACT_APP_API_URL}/products/${product_Id}`;
    navigator.clipboard.writeText(url).then(() => {
      alert('Product Link copied to clipboard!');
    }).catch((error) => {
      console.log('Error copying to clipboard:', error);
    });
  };

  return (
    <Layout style={{ flex: 1, overflow: 'hidden' }}>
      <GlobalHeader title={'Products'} />
      <Content style={{ padding: '24px', overflow: 'auto' }}>
        <div className="dummy-container">
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {cardData.map((e, index) => (
              <Col
                className="gutter-row dummy-card"
                style={{ marginBottom: '20px' }}
                key={index}
                xs={24}
                sm={12}
                md={8}
                lg={6}
                xl={4}
              >
                <Card
                  hoverable
                  style={{ width: '100%' }}
                  cover={<img className="card-image" alt="example" src={e.image} />}
                  actions={[
                    <Tooltip placement="bottom" title={<span>Like</span>}>
                    <LikeOutlined key="like" onClick={() => handleAddLike(e._id)}
                      style={{ color:  e.isLiked ? "blue" : "inherit" }}
                    />
                    <span className="like-count">({e.isLikedTotal})</span>
                    {/* <span className="like-count">({e.productName})</span>
                    <span className="like-count">({e._id})</span> */}
                  </Tooltip>,
                    <Tooltip placement="bottom" title={<span>Share</span>}>
                      <ShareAltOutlined key="share" onClick={()=>handleShare(e._id)} />
                    </Tooltip>,
                    <Tooltip placement="bottom" title={<span>Chat</span>}>
                      <CommentOutlined key="comment" onClick={() => handleCreateChat(e)} />{' '}
                    </Tooltip>,
                  ]}
                >
                  <Meta
                avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
                title={<a onClick={()=> productDetails(e._id)}>{e.productName}</a>}
                description={e.productDescription}
              />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default Product;
