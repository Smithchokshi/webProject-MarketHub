import { useState, useEffect } from 'react';
import { Button, Form, Input, Layout, theme } from 'antd';
import { FacebookOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useSimpleReactValidator from '../../helpers/useReactSimpleValidator';
import { register } from '../../redux/actions/authActions';
import './register.css';
import GlobalHeader from '../../shared/header';

const { Content } = Layout;

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({
    name: null,
    email: null,
    postalCode: null,
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
      await dispatch(register(fields));
      setLoading(false);
      navigate('/login');
    } else {
      setLoading(false);
      validator.getErrorMessages();
      setValidator(true);
    }
  };

  const getData = async () => {

    try {
      const res = await api(false).loadUser();
      //setUserName(res.data.userData.name);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };


  const facebook = async () => {
    await window.open("http://localhost:5006/api/users/facebook/callback", "_self");
  };

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);

  return (
    <Layout>
      <GlobalHeader title={'Products'} />
      <Content>
       <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img src="https://i0.wp.com/getborderless.com/wp-content/uploads/2021/12/blog-main-pic1.png?fit=560%2C315&ssl=1" alt="Login"/>
        </div>
        <Form
          className="login-form"
          name="login-form"
          initialValues={{ remember: true }}
          layout= "vertical"
        >
          <p className="form-title">Sign Up</p>
          <Form.Item className="" label={
                  <span className="label">
                    <span className="required-asterisk">*</span>
                    Name
                  </span>
                }
                name="name"
              >
              <Input
                type="text"
                placeholder="Enter your Name"
                value={fields.name}
                onChange={e => handleChange(e, 'name')}
                autoComplete="new-password"
                className="custom-input"
              />
              <div className={validator.errorMessages.name ? 'error-message' : ''}>
                {validator.message('Name', fields.name, 'required|name')}
              </div>
			  
            </Form.Item>
			          <Form.Item className="" label={
                  <span className="label">
                    <span className="required-asterisk">*</span>
                    Email
                  </span>
                }
                name="email"
              >
              <Input
                type="text"
                placeholder="Enter your Email"
                value={fields.email}
                onChange={e => handleChange(e, 'email')}
                autoComplete="new-password"
                className="custom-input"
              />
              <div className={validator.errorMessages.email ? 'error-message' : ''}>
                {validator.message('Email', fields.email, 'required|email')}
              </div>
            </Form.Item>
			
			 <Form.Item className="" label={
                  <span className="label">
                    <span className="required-asterisk">*</span>
                    Postal Code
                  </span>
                }
                name="postalCode"
              >
              <Input
                type="text"
                placeholder="Enter your Postal Code"
                value={fields.postalCode}
                onChange={e => handleChange(e, 'postalCode')}
                autoComplete="new-password"
                className="custom-input"
              />
              <div className={validator.errorMessages.postalCode ? 'error-message' : ''}>
                {validator.message('Postal Code', fields.postalCode, 'required|postalCode')}
              </div>
            </Form.Item>

			      <Form.Item label={
                  <span className="label">
                    <span className="required-asterisk">*</span>
                    Password
                  </span>
                }
                name="password"
              >
              <Input.Password
                placeholder="Enter your Password"
                value={fields.password}
                onChange={e => handleChange(e, 'password')}
                autoComplete="new-password"
                className="custom-input"

              />
              <div className={validator.errorMessages.password ? 'error-message' : ''}>
                {validator.message('Password', fields.password, 'required')}
              </div>
            </Form.Item>
            
            <Form.Item label={
                  <span className="label">
                    <span className="required-asterisk">*</span>
                    Confirm Password
                  </span>
                }
                name="password"
                dependencies={['password']}
                rules={[({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The password that you entered do not match!'));
                  },
                }),]}
              >
              <Input.Password
                placeholder="Confirm your Password"
                value={fields.confirmPassword}
                onChange={e => handleChange(e, 'confirmPassword')}
                autoComplete="new-password"
                className="custom-input"

              />
              <div className={validator.errorMessages.confirmPassword ? 'error-message' : ''}>
                {validator.message('Confirm Password', fields.confirmPassword, 'required')}
              </div>
            </Form.Item>

          <Form.Item>
            <Button className="login-form-button" type="primary" htmlType="submit" onClick={handleSubmit} loading={loading}>
                Sign Up
              </Button>
          </Form.Item>
            <p style={{ display: 'flex', justifyContent: 'center', fontSize:'16px', fontfamily: 'Josefin Sans, sans-serif', fontWeight:'bold'}}>Or Sign Up with</p>

          <Form.Item>
            <Button className="facebook-form-button" type="primary" onClick={facebook} loading={loading}>
              <FacebookOutlined style={{ fontSize: '20px' }}/>Continue with Facebook
              </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
      </Content>
    </Layout>
  );
};
export default Register;