import { useState, useEffect } from 'react';
import { Button, Form, Input, Layout, theme, Checkbox } from 'antd';
import { FacebookOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useSimpleReactValidator from '../../helpers/useReactSimpleValidator';
import { login } from '../../redux/actions/authActions';
import './login.css';
import GlobalHeader from '../../shared/header';

const { Content } = Layout;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({
    email: null,
    password: null,
  });

  const [validator, setValidator] = useSimpleReactValidator();

  const handleChange = (e, field) => {
    setFields(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (validator.allValid()) {
      await dispatch(login(fields));
      setLoading(false);
      navigate('/products');
    } else {
      setLoading(false);
      validator.getErrorMessages();
      setValidator(true);
    }
  };

  const facebook = () => {
    window.open("http://localhost:5006/api/users/facebook", "_self");
  };

  return (
    <Layout>
  <GlobalHeader title={'Products'} />
  <Content>
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img src="https://cdn.sites.tapfiliate.com/tapfiliate.com/2023/04/5-winning-marketing-strategies-for-e-commerce-this-year-1.jpg" alt="Login" />
        </div>
        <Form className="login-form" name="login-form" initialValues={{ remember: true }} layout="vertical">
          <p className="form-title">Login</p>
          <div style={{ display: 'flex', justifyContent: 'center', fontSize:'15px', fontFamily:'sans-serif', fontWeight:'bold'}}>
            <p>Doesn't have an account yet? <a href="/register">Sign Up</a>
            </p>
          </div>
          <Form.Item className="" label={ <span className="label">
            <span className="required-asterisk">*</span> Email </span> } name="email" > <Input type="text" placeholder="Enter your Email" value={fields.email} onChange={e=> handleChange(e, 'email')} autoComplete="new-password" className="custom-input" /> <div className={validator.errorMessages.email ? 'error-message' : '' }> {validator.message('Email', fields.email, 'required|email')} </div>
          </Form.Item>
          <Form.Item label={ <span className="label">
            <span className="required-asterisk">*</span> Password </span> } name="password" > <Input.Password placeholder="Enter your Password" value={fields.password} onChange={e=> handleChange(e, 'password')} autoComplete="new-password" className="custom-input" /> <div className={validator.errorMessages.password ? 'error-message' : '' }> {validator.message('Password', fields.password, 'required')} </div>
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </div>
              <div>
                <Form.Item>
                  <a href="/forgot-password">Forgot Password?</a>
                </Form.Item>
              </div>
            </div>
          </Form.Item>
          <Form.Item>
            <Button className="login-form-button" type="primary" htmlType="submit" onClick={handleSubmit} loading={loading}> Log In </Button>
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'center', fontSize:'16px', fontFamily:'sans-serif', fontWeight:'bold'}}>
            <p>Or Log In with</p>
          </div>
          <Form.Item>
            <Button className="facebook-form-button" type="primary" onClick={facebook} loading={loading}>
              <FacebookOutlined style={{ fontSize: '20px' }} />Continue with Facebook
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  </Content>
</Layout>
  );
};
export default Login;
