import React, { useState, useEffect } from 'react';
import { LikeOutlined, ShareAltOutlined, CommentOutlined } from '@ant-design/icons';
import { Avatar, Card, Row, Col, Rate, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import APIUtils from '../../helpers/APIUtils';
import './product.css';
import { handleSidebarData } from '../../redux/actions/sidebarAction';

const { Meta } = Card;
const api = msg => new APIUtils(msg);

const Product = () => {
  const [cardData, setCardData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const res = await api(false).getALlProducts();

      console.log(res.data.products);

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

      await dispatch(handleSidebarData(true, []));

      await getData();
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
    <Row
      gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}
    >
      {cardData.map((e, index) => (
        <Col
          className="gutter-row"
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
            style={{
              width: '100%',
            }}
            cover={<img alt="example" src={e.image} />}
            actions={[
              <LikeOutlined key="like" />,
              <ShareAltOutlined key="share" />,
              <CommentOutlined key="comment" onClick={() => handleCreateChat(e)} />,
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
  );
};

export default Product;
