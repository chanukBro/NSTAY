import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./EditForm.css";
import LocationPicker from "./LocationPicker";

function EditForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state && location.state.user;
  const [userData, setUserData] = useState(null);
  const [isAC, setIsAC] = useState(false);
  const [isBoardingStatusAvailable, setIsBoardingStatusAvailable] =
    useState(false);
  const [isBoysBoarding, setIsBoysBoarding] = useState(false);

  const handleLocationChange = (location) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      lat: location.lat,
      lng: location.lng,
    }));
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
        setIsAC(userData.AC);
        setIsBoardingStatusAvailable(userData.BoardingStatus);
        setIsBoysBoarding(userData.BoardingType);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    fetchUserData();
  }, [user, navigate]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/${user.email}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          BoardingName: document.getElementById("name").value,
          BoardingOverview: document.getElementById("overview").value,
          ShortDescription: document.getElementById("shortdescription").value,
          BoardingAddress: document.getElementById("address").value,
          Telephone: document.getElementById("telephone").value,
          Price: document.getElementById("price").value,
          AC: isAC,
          BoardingStatus: isBoardingStatusAvailable,
          BoardingType: isBoysBoarding,
          lat: userData.lat,
          lng: userData.lng,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update data. Status: ${response.status}`);
      }

      // Handle success, maybe redirect to another page
      navigate("/ownerProfile", { state: { user } }); // Pass user variable to /ownerprofile
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  };

  return (
    <div className="edit-form-out">
      <div className="edit-form">
        <Form>
          <div className="boarding-name-edit-form">
            <div className="edit-form-name">
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Boarding Name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={user && user.BoardingName}
                />
              </Form.Group>
            </div>
            <div className="renting-button">
              <div className="boarding-status">Boarding Status</div>{" "}
              <div>
                <Form.Group
                  className="mb-3"
                  controlId="custom-switch-boarding-status"
                >
                  <Form.Check
                    type="switch"
                    label={
                      isBoardingStatusAvailable ? "Renting" : "Not Renting"
                    }
                    id="custom-switch-boarding-status"
                    checked={isBoardingStatusAvailable}
                    onChange={() =>
                      setIsBoardingStatusAvailable(!isBoardingStatusAvailable)
                    }
                    style={{ transform: "scale(1.2)" }}
                  />
                </Form.Group>
              </div>
            </div>
          </div>
          <Form.Group className="mb-3" controlId="overview">
            <Form.Label>Overview (600 Characters only)</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              defaultValue={user && user.BoardingOverview}
              maxLength={600}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="shortdescription">
            <Form.Label>Short Description (100 Characters only)</Form.Label>
            <Form.Control
              type="text"
              defaultValue={user && user.ShortDescription}
              maxLength={100}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Boarding Address</Form.Label>
            <Form.Control
              type="text"
              defaultValue={user && user.BoardingAddress}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Renting Price for a month</Form.Label>
            <Form.Control type="number" defaultValue={user && user.Price} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="telephone">
            <Form.Label>Telephone</Form.Label>
            <Form.Control type="text" defaultValue={user && user.Telephone} />
          </Form.Group>
          <div className="bottom-buttons">
            <div className="select-buttons">
              <div>Select The Boarding Atmosphere</div>
              <div className="select-button">
                <Form.Group className="mb-3" controlId="custom-switch-ac">
                  <Form.Check
                    type="switch"
                    label={isAC ? "AC" : "Non AC"}
                    id="custom-switch-ac"
                    checked={isAC}
                    onChange={() => setIsAC(!isAC)}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="select-buttons girls">
              <div>Select The Hostel Type</div>
              <div className="select-button">
                <Form.Group
                  className="mb-3"
                  controlId="custom-switch-boarding-type"
                >
                  <Form.Check
                    type="switch"
                    label={isBoysBoarding ? "Boys Hostel" : "Girls Hostel"}
                    id="custom-switch-boarding-type"
                    checked={isBoysBoarding}
                    onChange={() => setIsBoysBoarding(!isBoysBoarding)}
                  />
                </Form.Group>
              </div>
            </div>
          </div>
          <div className="location-picker">
            <div>
              <p className="map-p">
                Please use the location marker to mark your Boarding Location on
                the map.
                <br /> Zoom the map ( Ctrl + Mouse wheel ) for Better Accuracy.
              </p>
            </div>
            <div>
              <LocationPicker
                lat={user.lat}
                lng={user.lng}
                onLocationChange={handleLocationChange}
              />
            </div>
          </div>
          <Button
            variant="success"
            type="button"
            onClick={handleSubmit}
            className="mt-5"
          >
            Save My Details
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default EditForm;
