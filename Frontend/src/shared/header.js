import React, { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Button, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import APIUtils from '../helpers/APIUtils';
import { handleCollapse, handleSidebarChange } from '../redux/actions/sidebarAction';
import { logout } from '../redux/actions/authActions';
import './header.css';
import { Input, AutoComplete, Spin } from 'antd';

const { Header } = Layout;
const api = new APIUtils();

const GlobalHeader = ( {title, handleSearchResults }) => {
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isCollapsed, activatedSidebarKey, sidebarData } = useSelector(state => state.sidebar);
  const { selectedChat, chatList } = useSelector(state => state.chat);
  const { isAuthenticated } = useSelector(state => state.auth);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [label, setLabel] = useState(null);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { Search } = Input;

  const handleLogout = async () => {
    const data = {
      key: 'marketplace',
    };
    await dispatch(logout());
    await dispatch(handleSidebarChange(data));
    localStorage.removeItem('token');
    navigate('/login');
  };

    // Function to handle the search logic
    const handleSearch = async (value) => {
      try {
        setLoading(true);
        const searchData = await api.getALlProducts({ searchTerm: value });
        console.log('Search Results:', searchData.data.products);
        handleSearchResults(searchData.data.products);
      } catch (error) {
        console.error('Error in searchProducts API:', error);
      }
      setLoading(false);
    };

    const handleSearchProduct = async (value) => {
      try {
        setLoading(true);
        const selectedProduct = suggestions.find((item) => item.name === value);
        navigate(`/products/${selectedProduct.id}`);
      } catch (error) {
        console.error('Error in searchSuggestedProducts API:', error);
      }
      setLoading(false);
    };

    // Function to handle the search suggestion logic
    const handleSearchSuggestions = async (value) => {
      try {
        setSearchTerm(value);
        // Call the getSearchSuggestions API function
        const suggestions = await api.suggestion({ searchTerm: value });
        setSuggestions(suggestions.data);
        console.log('Search Suggestions:', suggestions.data);
      } catch (error) {
        console.error('Error in getSearchSuggestions API:', error);
      }
    };

  const storeLabel = async () => {
    console.log(activatedSidebarKey.key.split('/').length);
    const [filterData] = sidebarData.filter(cur => cur.key === activatedSidebarKey?.key);
    const tempData = {
      key: activatedSidebarKey?.key,
      label: filterData?.label,
    };
    await dispatch(handleSidebarChange(tempData));
    setLabel(filterData?.label);
  };

  useEffect(() => {
    (async () => {
      if (!activatedSidebarKey?.label) await storeLabel();
      else setLabel(activatedSidebarKey?.label);
    })();
  }, [activatedSidebarKey?.key]);

  useEffect(() => {
    setLabel(`${activatedSidebarKey?.label} / ${selectedChat?.label}`);
  }, [selectedChat?.key]);

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {isAuthenticated && (
          <Button
            type="text"
            icon={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => dispatch(handleCollapse())}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        )}
        <div style={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
          {title === 'Products' ? (
            <>

            </>
          ) : (
            <span>{title}</span>
          )}
        </div>
      </div>
      <div className="search-bar">
        {isAuthenticated && (
          <div style={{ display: 'flex', alignItems: 'center', marginRight: '120px', marginLeft: '30px' }}>
            <AutoComplete
              value={searchTerm}
              onChange={handleSearchSuggestions}
              onSelect={handleSearchProduct}
              placeholder="Search products..."
              style={{ width: 600 }}
              options={suggestions.map((item) => ({ value: item.name, id: item.id}))}
            >
            <Search enterButton loading={loading} onSearch={handleSearch} />
            </AutoComplete>

          </div>
        )}
      </div>
      {isAuthenticated ? (
        <>

        <span className="logout">
        <Button
          type="primary"
          onClick={handleLogout}
          style={{
            height: '32px',
            display: 'flex',
            fontSize: '16px',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '10px',
            backgroundColor: '#ed0000',
          }}
        >
          Logout
        </Button>
        </span>
        </>
      ) : (
        <Button
          type="primary"
          onClick={() => navigate('/login')}
          style={{
            height: '32px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '10px',
          }}
        >
          Login
        </Button>
      )}
    </Header>
  );
};

export default GlobalHeader;
