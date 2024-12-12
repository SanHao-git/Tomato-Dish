import React from 'react';
import './Footer.css'
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>76/25 Duong so 19, phuong Linh Chieu, thanh pho Thu Duc, thanh pho Ho Chi Minh 76/25 Duong so 19, phuong Linh Chieu, thanh pho Thu Duc, thanh pho Ho Chi Minh 76/25 Duong so 19, phuong Linh Chieu, thanh pho Thu Duc, thanh pho Ho Chi Minh 76/25 Duong so 19, phuong Linh Chieu, thanh pho Thu Duc, thanh pho Ho Chi Minh</p>
                <div className="footer-icon-social">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>Phone number: 0399161043</li>
                    <li>Contact: sanhao2502@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>Copy right 2024 @ Tomato - All rigth reserverd</p>
    </div>
  );
}

export default Footer;
