import "./OwnerProfile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/Form";
import NstayMap from "./OwnerMap";
import Dev from "./dev.png";
import React, { useEffect, useState} from "react";
import { useLocation, useNavigate,Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';



function OwnerProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state && location.state.user;
  const [userData, setUserData] = useState(null);
  const handleEditClick = () => {
    // Navigate to the edit form with user data
    navigate("/ownerProfile/editDetails", { state: { user: userData } });
  };

  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user) {
          navigate("/");
          return;
        }
        const response = await fetch(`http://localhost:3000/${user.email}`);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch user data. Status: ${response.status}`
          );
        }
        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    fetchUserData();
  }, [user, navigate]);
  return (
    <div className="owner-page-body">
      {user && userData ? (
        <Container className="owner-container">
          <Row>
            <Col sm={3}>
              <div className="review-section">
                <div className="welcome-message">
                  {" "}
                  Welcome{" "}
                  {userData.name.charAt(0).toUpperCase() +
                    userData.name.slice(1)}
                </div>
                <div className="dev-image-area">
                  <img src={Dev} className="dev-image" />
                  <p className="dev-text">
                    Review Section is Under Developing <br /> Sorry for the
                    inconvenience <br />
                    -NSTAY Dev Team-{" "}
                  </p>
                </div>
              </div>
            </Col>
            <Col sm={9}>
              <div className="data-section">
                <div className="tiles">
                  <div className="boarding-name-title">Boarding Name: </div>
                  <div className="boarding-name-description">
                    {userData.BoardingName}
                  </div>
                </div>
                <div className="tiles">
                  <div className="boarding-name-title">Boarding Status: </div>
                  <div
                    className="boarding-name-description"
                    style={{ color: userData.BoardingStatus ? "green" : "red" }}
                  >
                    {userData.BoardingStatus ? "Renting" : "Not Renting"}
                  </div>
                </div>
                <div className="tiles">
                  <div className="overview">Overview : </div>
                  <div className="description">{userData.BoardingOverview}</div>
                </div>
                <div className="tiles">
                  <div className="short-description-title">
                    Short Description:{" "}
                  </div>
                  <div className="short-description">
                    {userData.ShortDescription}
                  </div>
                </div>
                <div className="tiles">
                  <div className="boarding-name-title">Boarding Type: </div>
                  <div className="boarding-name-description">
                    {userData.BoardingType ? "Boys Hostel" : "Girls Hostel"}
                  </div>
                </div>
                <div className="tiles">
                  <div className="boarding-name-title">AC or Non AC: </div>
                  <div className="boarding-name-description">
                    {userData.AC ? "AC" : "Non AC"}
                  </div>
                </div>
                <div className="tiles">
                  <div className="boarding-name-title">Boarding Address: </div>
                  <div className="boarding-name-description">
                    {userData.BoardingAddress}
                  </div>
                </div>
                <div className="tiles">
                  <div className="boarding-name-title">Telephone Number: </div>
                  <div className="boarding-name-description">
                    {userData.Telephone}
                  </div>
                </div>

                <div className="tiles">
                  <div className="boarding-name-title"> Renting Price for a month : </div>
                  <div className="boarding-name-description">
                 <p>Rs.{userData.Price}/=</p> 
                  </div>
                </div>

                <div className="tiles">
                  <div className="boarding-name-title">My Location: </div>
                  <div className="map-section">
                    <NstayMap lat={userData.lat} lng={userData.lng} />
                  </div>
                </div>
                <div className="edit-button">
                <Button variant="dark" onClick={handleEditClick}>
              Edit My Details
            </Button>
                </div>
                
              </div>
            </Col>
          </Row>
        </Container>
      ) : null}
    </div>
  );
}

export default OwnerProfile;
