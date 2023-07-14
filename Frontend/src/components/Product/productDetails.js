import React, { useEffect, useState, history} from  'react';
import { useParams } from 'react-router-dom';

import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { Avatar, List, Divider,Card, Radio, Space,Button,Layout} from 'antd';
import APIUtils from '../../helpers/APIUtils';
import axios from 'axios';
import { Rate } from 'antd';
import GlobalHeader from '../../shared/header';


const {Content}=Layout;





const api = msg => new APIUtils(msg);
function ProductDetails(){
  const {Meta}=Card;
  const [product, SetProduct] = useState([]);
  const [rateData, SetRateData] = useState([]);
  const { id } = useParams();
  const navigate=useNavigate();

  const getData = async () => {

    try {
      console.log(id+"p_id");
      const res = await api(false).getOneProduct({ productId: id });
      SetProduct(res.data[0]);

      const rData = await api(false).getRatings({ productId: id });   
      const ratings ={
        averageRatings:rData.data.rate.averageRatings,
        userRatings:rData.data.rate.userRatings,
      }
      console.log("rData"+rData.data.rate.userRatings);  
      SetRateData(ratings);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  },[]);

  const handleRatingChange = async rating => {
    // Here you can handle the logic to record the rating
    console.log('Selected rating:', rating);
    const data={
      productId: id,
      rateNumber: rating,
    }
    const res = await api(true).setRating(data);
    console.log(res+"resss")
    getData();
    // You can send an API request to save the rating or perform any other actions
  };

   const navigateToComment=()=>{
    navigate(`/comment/${id}`); 
   }
   const navigateToproducts=()=>{
    navigate(`/products`); 
   }
    return (
      <Layout style={{ flex: 1, overflow: 'hidden' }}>
      <GlobalHeader title={'Products'} />
       <Content style={{ padding: '24px', overflow: 'auto' }}>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Card style={{backgroundColor: '#f5f5f5'}}>
          <Meta
            avatar={<Avatar size={128} src={product?.image} />}
            title={
            <div>   
            <h2 style={{ fontSize: '32px' , float:'left'}}>{product?.productName}</h2>
            <Button type="primary" style={{float:'right'}} onClick={navigateToproducts}>Back</Button>
            </div>
            }
            description={`Product Price: ${product?.price}`}
          />    
          <Rate allowHalf value={rateData?.userRatings} onChange={handleRatingChange}/><br/>
          Total Ratings: {parseFloat(rateData?.averageRatings).toFixed(2)}
          <Divider/>
        <div>
        <Space size="middle" wrap>
  <Button type="primary" onClick={navigateToComment}>
    Comment
  </Button>
  <Button type="primary" >
    Chat
  </Button>
  <Button type="primary">
    Payment
  </Button>
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




