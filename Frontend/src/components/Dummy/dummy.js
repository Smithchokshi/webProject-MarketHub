import React, { useState } from 'react';
<<<<<<< HEAD
import { LikeOutlined, ShareAltOutlined,CommentOutlined  } from '@ant-design/icons';
import { Avatar, Card, Row, Col, Rate } from 'antd';

const cardData = [
  {
    image: 'https://queue-it.com/media/ppcp1twv/product-drop.jpg',
    name: 'HeadPhones',
    description: 'Description.....',
    liked: false,
    rating: 3,
  },
  {
    image: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    name: 'Product Name',
    description: 'Description.....',
    liked: true,
    rating: 4.3,
  },
  {
    image: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    name: 'Product Name',
    description: 'Description.....',
    liked: false,
    rating: 3.3,
  },
  {
    image: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    name: 'Demo',
    description: 'Description.....',
    liked: false,
    rating: 1,
  },
  {
    image: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    name: 'Product Name',
    description: 'Description.....',
    liked: false,
    rating: 4.8,
  },
  {
    image: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    name: 'Product Name',
    description: 'Description.....',
    liked: true,
    rating: 2.5,
  },
  {
    image: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    name: 'Product Name',
    description: 'Description.....',
    liked: true,
    rating: 3.1,
  },
  {
    image: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    name: 'Product Name',
    description: 'Description.....',
    liked: true,
    rating: 3.8,
  },
];

const { Meta } = Card;
const dummy = () => {
  const { Meta } = Card;


  return (
    <Row gutter={16} style={{padding:'20px', marginBottom:'20px'}}>
      {cardData.map((e, index) => (
        
          <Col className="gutter-row" span={6} style={{marginBottom: '20px'}} key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              style={{
                width: 300,
              }}
              cover={<img alt="example" src={e.image} />}
              actions={[
                <LikeOutlined key="like"
                style={{ color: e.liked ? "blue" : "inherit" }}
                />, // Like icon
                <ShareAltOutlined key="share" />, // Share icon
                <CommentOutlined />,
                // <CommentOutlined key="comment" />, // Comment icon
              ]}
            >
              <Meta
                avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
                // a={<LikeOutlined />}
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
export default dummy;

=======
import { Input, Button } from 'antd';
import useSimpleReactValidator from '../../helpers/useReactSimpleValidator';

const Dummy = () => {
    const [fields, setFields] = useState({
        name: '',
    });
    const [errors, setErrors] = useState({});
    const [validator, setValidator] = useSimpleReactValidator();

    const handleValidation = () => {
        console.log(validator);
        if (validator.allValid()) {
            alert('valid');
        } else {
            setErrors(validator.getErrorMessages());
            setValidator(true);
        }
    };

    return (
        <div>
            <h1 style={{ color: 'black', textAlign: 'center' }}>It works!!!</h1>

            <div>
                <Input
                    placeholder="name"
                    value={fields?.name}
                    onChange={e =>
                        setFields(prev => ({
                            ...prev,
                            name: e.target.value,
                        }))
                    }
                />
                {validator.message(`Name`, fields?.name, 'required')}
            </div>

            <Button type="primary" onClick={handleValidation}>
                Click me
            </Button>
        </div>
    );
};

export default Dummy;
>>>>>>> development
