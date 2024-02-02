import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { IoCallOutline } from "react-icons/io5";
import './SingleBoarding.css';

const SingleBoarding = () => {
  const { _id } = useParams();
  const [boardingData, setBoardingData] = useState(null);

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD_wkpI6bjBWcIW3CJbEf7eEN7y_eKJFDQ",
  });

  useEffect(() => {
    const fetchBoardingDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${_id}`);
        const boardingData = await response.json();

        setBoardingData(boardingData);
      } catch (error) {
        console.error('Error fetching boarding details:', error);
      }
    };

    fetchBoardingDetails();
  }, [_id]);

  

  if (!boardingData) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Spinner animation="border" variant="secondary" />
      </div>
    );
  }

  const { lat, lng } = boardingData;

  return (
    <div style={{ height: "100vh" }}>
      <Container
        style={{
          height: "80%",
          border: "2px solid var(--Gray-5, #E0E0E0)",
          borderRadius: "6px",
          marginTop: "60px",
          background: "rgba(242, 242, 242, 0.46)",
        }}
      >
        <Row style={{ height: "100%" }}>
          <Col sm={6}>
            <div>
              <div className='sb-head'>
                <p className='sb-name'>{boardingData.BoardingName}</p>
                <p className='sb-head-other'>{boardingData.AC ? 'AC' : 'Non AC'} &nbsp;|&nbsp; {boardingData.BoardingType ? 'Boys' : 'Girls'} &nbsp;|&nbsp;&nbsp;Rs.{boardingData.Price}/=</p>
              </div>
              <div className='sb-middle'>
                <div className='sb-description'>
                  {boardingData.BoardingOverview}
                </div>
                <div className='sb-description tp'>
                  For More Details Dial <IoCallOutline /> {boardingData.Telephone}
                </div>
              </div>
            </div>
          </Col>
          <Col sm={6}>
            <Container
              style={{
                height: "500px",
                width: "570px",
                border: "1px solid #2F80ED",
                borderRadius: "6px",
                marginTop: "40px",
                backgroundColor: "#f1f3f4"
              }}
            >
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={15}
                center={{ lat, lng }}
              >
                <MarkerF position={{ lat, lng }} />
              </GoogleMap>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SingleBoarding;
