import React, { useState, useEffect } from 'react';
import { LikeOutlined, ShareAltOutlined, CommentOutlined } from '@ant-design/icons';
import { Avatar, Card, Row, Col, Rate } from 'antd';
import APIUtils from '../../helpers/APIUtils';
import './product.css';

const { Meta } = Card;
const api = msg => new APIUtils(msg);

const Product = () => {
  const [cardData, setCardData] = useState([]);

  const getData = async () => {
    try {
      const res = await api(false).getALlProducts();

      console.log(res.data.products);

      setCardData(res.data.products);
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
            style={{
              width: '100%',
            }}
            cover={<img alt="example" src={e.image} />}
            actions={[
              <LikeOutlined
                key="like"
                // style={{ color: e.liked ? 'blue' : 'inherit' }}
                // onClick={() => handleLike(index)}
              />, // Like icon
              <ShareAltOutlined key="share" />, // Share icon
              <CommentOutlined key="comment" />, // Comment icon
            ]}
          >
            <Meta
              avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
              title={e.productName}
              description={e.productDescription}
            />
            {/*<Rate allowHalf value={e.rating} />*/}
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Product;
