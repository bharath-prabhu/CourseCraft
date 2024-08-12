import React from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Gridpages/Footer';


const EmbeddedWebsite = () => {
  const iframeStyle = {
    width: '100%',
    height: '100%',
    border: 'none',
  };

  const containerStyle = {
    width: '100%',
    height: 'calc(100vh - 100px)', // Adjust height to fit between header and footer
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Optional: Background color around the iframe
  };

  const boxStyle = {
    width: '90%',
    height: '100%',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', // Optional: Box shadow for the iframe box
  };

  return (
    <div>
      <NavBar/><br></br><br></br><br></br>
      <div style={containerStyle}>
        <div style={boxStyle}>
          <iframe
            src="https://www.programiz.com/c-programming/online-compiler/"
            title="Embedded Website"
            style={iframeStyle}
          />
        </div>
      </div>
      <br></br><br></br><br></br>
     <Footer/>
    </div>
  );
};

export default EmbeddedWebsite;
