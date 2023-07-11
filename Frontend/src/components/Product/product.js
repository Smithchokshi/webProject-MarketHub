import React, { useState, useEffect } from 'react';
import { LikeOutlined, ShareAltOutlined, CommentOutlined } from '@ant-design/icons';
import { Avatar, Card, Row, Col, Tooltip, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import APIUtils from '../../helpers/APIUtils';
import './product.css';
import { handleSidebarChange } from '../../redux/actions/sidebarAction';
import GlobalHeader from '../../shared/header';

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

      await api(true).createChat(data);

      await dispatch(
        handleSidebarChange({
          key: '/chats',
        })
      );

      navigate('/chats');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);

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
                      <LikeOutlined key="like" />
                    </Tooltip>,
                    <Tooltip placement="bottom" title={<span>Share</span>}>
                      <ShareAltOutlined key="share" />
                    </Tooltip>,
                    <Tooltip placement="bottom" title={<span>Chat</span>}>
                      <CommentOutlined key="comment" onClick={() => handleCreateChat(e)} />{' '}
                    </Tooltip>,
                  ]}
                >
                  <Meta
                    avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
                    title={e.productName}
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
