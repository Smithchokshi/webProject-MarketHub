import React, { useState, useEffect } from 'react';
import { LikeOutlined, ShareAltOutlined, CommentOutlined } from '@ant-design/icons';
import { Avatar, Card, Row, Col, Rate } from 'antd';
import './profile.css';
import axios from 'axios';

const { Meta } = Card;

const Dummy = () => {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    fetchCardData();
    console.log('aam');
  }, []);

  const fetchCardData = async () => {
    try {
      const response = await axios.get('http://localhost:5005/api/cards/getCards'); // Replace with your backend API endpoint for retrieving card data
      setCardData(response.data.cards);

      
    } catch (error) {
      console.error('Error fetching card data:', error);
    }
  };

  const handleLike = async (index) => {
    try {   

        const response = await fetch('/api/cards/dummy', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      const updatedCardData = [...cardData];
      updatedCardData[index].liked = !updatedCardData[index].liked;
      setCardData(updatedCardData);

      await axios.put(`/api/cards/${updatedCardData[index]._id}`, updatedCardData[index]); // Replace with your backend API endpoint for updating card data
    } catch (error) {
      console.error('Error updating card data:', error);
    }
  };

  return (
    <Row gutter={16} style={{ padding: '20px', marginBottom: '20px' }}>
      {cardData.map((e, index) => (
        <Col className="gutter-row" span={6} style={{ marginBottom: '20px' }} key={index} xs={24} sm={12} md={8} lg={6}>
          <Card
            style={{
              width: 300,
            }}
            cover={<img alt="example" src={e.image} />}
            actions={[
              <LikeOutlined
                key="like"
                style={{ color: e.liked ? 'blue' : 'inherit' }}
                onClick={() => handleLike(index)}
              />, // Like icon
              <ShareAltOutlined key="share" />, // Share icon
              <CommentOutlined key="comment" />, // Comment icon
            ]}
          >
            <Meta
              avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
              title={e.name}
              description={e.description}
            />
            <Rate allowHalf value={e.rating} />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Dummy;
