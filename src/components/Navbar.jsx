import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import Logo from '../logo.png'
import { HomeOutlined, StarOutlined } from '@ant-design/icons'; 

const Navbar = () => {
  return (
    <Menu mode="horizontal">
      {/* Logo */}
      <Menu.Item key="logo" style={{ marginRight: 'auto' }}>
      <Link to="/" style={{ textDecoration: 'none'}}>
      <img src={Logo} alt="Logo" style={{ height: '30px', marginRight: '10px' }} />
          <span style={{ fontSize:'20px' }}>Buy Product's</span>
       </Link>
       
      </Menu.Item>

      {/* Navigation links */}
      <Menu.Item key="home">
        <Link to="/" style={{ textDecoration: 'none'}}>
          <HomeOutlined /> 
          <span style={{ fontSize:'16px' }}>Home</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="favorites">
        <Link to="/favorites" style={{ textDecoration: 'none'}}>
          <StarOutlined />  
          <span style={{ fontSize:'16px' }}>Favorites</span>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
