import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from "@react-google-maps/api";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import mapStyles from "./MapStyle";
import "./NstayMap.css";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";

import { FaLocationDot } from "react-icons/fa6";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
};

const center = { lat: 6.8212612, lng: 80.0414355 };

function NstayMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD_wkpI6bjBWcIW3CJbEf7eEN7y_eKJFDQ", // Replace with your API key
  });

  const [selectedMarker, setSelectedMarker] = useState(null);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterOptions, setFilterOptions] = useState({
    acChecked: false, // Set both AC and NON AC to true initially
    nonAcChecked: false, // Set both AC and NON AC to true initially
    maxPrice: "",
    gender: "",
  });

  // Maintain a separate state for filtered data
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        const data = await response.json();
        const filteredData = data.filter(user => user.BoardingStatus === true);
        setUsers(filteredData);
        setFilteredUsers(filteredData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  if (loadError) return "Error loading maps";

  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const applyFilters = () => {
    let updatedFilteredData = [...users];

    if (filterOptions.acChecked || filterOptions.nonAcChecked) {
      updatedFilteredData = updatedFilteredData.filter((user) => {
        return (
          (filterOptions.acChecked && !user.AC) ||
          (filterOptions.nonAcChecked && user.AC)
        );
      });
    }

    if (filterOptions.maxPrice) {
      updatedFilteredData = updatedFilteredData.filter(
        (user) => user.Price <= parseInt(filterOptions.maxPrice)
      );
    }

    if (filterOptions.gender !== "") {
      updatedFilteredData = updatedFilteredData.filter(
        (user) => user.BoardingType === (filterOptions.gender === "female")
      );
    }

    setFilteredUsers(updatedFilteredData);
  };

  const handleFilter = () => {
    applyFilters();
  };

  return (
    <div className="nstay-map-container">
      {(!isLoaded || loading) && (
        <div
          style={{
            position: "fixed",
            top: 60,
            left: 150,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.7)", // Adjust the background color and opacity
          }}
        >
           <Spinner animation="border" variant="secondary" />
        </div>
      )}
      <Container
        style={{
          height: "595px",
          border: "2px solid var(--Gray-5, #E0E0E0)",
          borderRadius: "6px",
          marginTop: "60px",
        }}
      >
        <Row>
          <Col sm={3}>
            <Container
              style={{
                height: "450px",
                border: "2px solid var(--Gray-5, #E0E0E0)",
                borderRadius: "6px",
                marginTop: "20px",
                background: "rgba(242, 242, 242, 0.46)",
              }}
            >




              <div className="filter-section">
                <Form>
                  <p className="filter-p">Filter By Choice</p>
                  <div className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="AC"
                      id="nonAcCheckbox"
                      name="nonAcChecked"
                      checked={filterOptions.nonAcChecked}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Non-AC"
                      id="acCheckbox"
                      name="acChecked"
                      checked={filterOptions.acChecked}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="mb-3">
                    <Form.Label>Max Price:</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter max price"
                      name="maxPrice"
                      value={filterOptions.maxPrice}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="mb-3">
                    <Form.Check
                      type="radio"
                      label="Female"
                      name="gender"
                      id="maleRadio"
                      value="male"
                      checked={filterOptions.gender === 'male'}
                      onChange={handleFilterChange}
                    />
                    <Form.Check
                      type="radio"
                      label="Male"
                      name="gender"
                      id="femaleRadio"
                      value="female"
                      checked={filterOptions.gender === 'female'}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="mb-3">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleFilter}
                    >
                      Apply Filters
                    </button>
                  </div>
                </Form>
              </div>


            </Container>
            <Container
              style={{
                height: "81px",
                border: "2px solid var(--Gray-5, #E0E0E0)",
                borderRadius: "6px",
                marginTop: "20px",
                background: "rgba(242, 242, 242, 0.46)",
              }}
            >


<div style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                color:"#2F80ED",
                fontSize: "0.8rem",
                fontWeight:"400"
                
                
              }} >
<p >Please click on the boarding location ( <span style={{
                
                color:"red",
                
                
                
              }} > <FaLocationDot /></span> ) <br/> to see additional details.</p>  
</div>


            

              
            </Container>
          </Col>
          <Col sm={9}>
            <Container
              style={{
                height: "550px",
                border: "0.5px solid #2F80ED",
                borderRadius: "6px",
                marginTop: "20px",
                position: "relative",
              }}
            >
              {isLoaded && (
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  zoom={14}
                  center={center}
                  options={options}
                >
                  {filteredUsers.map((user) => (
                    <MarkerF
                      key={user._id}
                      position={{ lat: user.lat, lng: user.lng }}
                      onClick={() => setSelectedMarker(user)}
                    />
                  ))}
  {selectedMarker && (
                    <InfoWindowF
                      position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                      onCloseClick={() => setSelectedMarker(null)}
                    >
                      <div> <p style={{fontWeight: 'bold' , fontWeight:'bold' ,fontSize:'1rem' }}>{selectedMarker.BoardingName}</p>
                     
                      <a href={`${selectedMarker._id}`}>
      click here to get more info
    </a>
                        </div>
                      </InfoWindowF>
                  )}
                </GoogleMap>
              )}
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NstayMap;
