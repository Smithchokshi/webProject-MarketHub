import { useState } from 'react';
import { Button, Form, Input, Layout, theme } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useSimpleReactValidator from '../../helpers/useReactSimpleValidator';
import { login } from '../../redux/actions/authActions';
import './login.css';

const { Content } = Layout;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
    if (validator.allValid()) {
      await dispatch(login(fields));
      navigate('/');
    } else {
      validator.getErrorMessages();
      setValidator(true);
    }
  };

  return (
    <Layout>
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="container">
          <h1>Login Form</h1>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            autoComplete="off"
          >
            <Form.Item label="email" name="email">
              <Input
                type="text"
                placeholder="email"
                value={fields.email}
                onChange={e => handleChange(e, 'email')}
                autoComplete="new-password"
              />
              {validator.message('Email', fields.email, 'required|email')}
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input.Password
                placeholder="password"
                value={fields.password}
                onChange={e => handleChange(e, 'password')}
                autoComplete="new-password"
              />
              {validator.message('Password', fields.password, 'required')}
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form.Item>
          </Form>
          <p onClick={() => navigate('/register')}>Sign Up</p>
        </div>
      </Content>
    </Layout>
  );
};
export default Login;
