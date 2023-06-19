import { Input, Button, Row, Col, Form } from 'antd';
import Img2 from '../../assets/contact.png';
import './contactUs.css';

const { TextArea } = Input;

const Contact = () => {
  return (
    <div className="bg-dark">
      <div className="contact-us">
        <h4 className="h4">Contact Us</h4>
      </div>
      <Row justify="center" align="middle" className="contact-container">
        <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <div className="image-container">
            <img className="c-image" src={Img2} alt="" />
          </div>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12} className="form-details">
          <Form
            labelCol={{
              xs: { span: 24 },
              sm: { span: 8 },
            }}
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 16 },
            }}
            layout="vertical"
            initialValues={{
              disabled: false,
            }}
            onFinish={values => {
              console.log(values);
            }}
            className="form-container"
          >
            <Form.Item label="First Name" name="fname">
              <Input />
            </Form.Item>
            <Form.Item label="Last Name" name="lname">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="TextArea" name="textArea">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Contact;
