import React from 'react';
import wheel from "./wheel.png";
import "./News.css";

const ContactUs = () => {
  const containerStyle = {
    textAlign: 'center',
    marginTop: '50px',
    height: '100vh',
  };

  

  const rotateStyle = {
    width: '180px',
    height: '180px',
    transform: 'rotate(360deg)',
    animation: 'rotate 30s linear infinite',
    opacity: 0.1,
  };

  return (
    <div style={containerStyle}>
      <h2>Contact Us</h2>
      <h3>Sorry for the inconvenience, this section is currently under development.</h3>
      <img src={wheel} style={rotateStyle} className='wheel' />
    </div>
  );
};

export default ContactUs;
