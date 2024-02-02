import React, { useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import "./AllBoardings.css";
import room from "./room.jpeg";
import { TbMoodSad } from "react-icons/tb";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


const AllBoardings = () => {
  const [boardingData, setBoardingData] = useState([]);
  const [filteredBoardings, setFilteredBoardings] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    acChecked: false, // Set both AC and NON AC to true initially
    nonAcChecked: false, // Set both AC and NON AC to true initially
    maxPrice: '',
    gender: '',
  });

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => {
        const dataWithTimestamp = data.map((user) => ({
          ...user,
          createdAt: user.createdAt || new Date().toISOString(),
        }));
        dataWithTimestamp.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Initial sorting

        // Filter only BoardingStatus true values initially
        const initialFilteredData = dataWithTimestamp.filter((user) => user.BoardingStatus === true);

        setBoardingData(dataWithTimestamp);
        setFilteredBoardings(initialFilteredData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const applyFilters = () => {
    let updatedFilteredData = [...boardingData];

    if (
      filterOptions.acChecked ||
      filterOptions.nonAcChecked ||
      filterOptions.maxPrice ||
      filterOptions.gender !== ''
    ) {
      // Apply filters only if at least one filter option is selected
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

      if (filterOptions.gender !== '') {
        updatedFilteredData = updatedFilteredData.filter(
          (user) => user.BoardingType === (filterOptions.gender === 'female')
        );
      }
    } else {
      // If no filters are applied, show all AC and NON AC boardings
      updatedFilteredData = updatedFilteredData.filter(() => true);
    }

    // Update sorting logic based on createdAt or another property
    updatedFilteredData.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date(); // Handle undefined createdAt
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date();

      return dateB - dateA; // Sort in descending order
    });

    setFilteredBoardings(updatedFilteredData);
  };
  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFilter = () => {
    applyFilters();
  };

  // Call applyFilters initially to show only BoardingStatus true values
  useEffect(() => {
    applyFilters();
  }, []);
  return (
    <div className="all-boarding-container">
      <Container
        style={{
          height: "100%",
          border: "2px solid var(--Gray-5, #E0E0E0)",
          borderRadius: "6px",
          marginTop: "60px",
          background: "rgba(242, 242, 242, 0.46)",
          paddingBottom: "60px",
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
          </Col>
          <Col sm={9}>
            <Container
              style={{
                height: "100%",
                border: "2px solid var(--Gray-5, #E0E0E0)",
                borderRadius: "6px",
                marginTop: "20px",
                background: "rgba(242, 242, 242, 0.46)",
              }}
            >
              {filteredBoardings.length === 0 ? (
                <div className="no-data-message">
                  Sorry <TbMoodSad /><br/>No results found with the current filters. Please try different filter settings.
                </div>
              ) : (
                filteredBoardings.map((user) => (
                  
                  <Row key={user.id} className="all-boarding-cards">
                    <Col sm={3}>
                      <div className="card-image-div">
                        <img src={room} alt="room-image" className="room-image" />
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="all-boarding-cards-middle">
                        <div>
                          <p className="boarding-card-name">{user.BoardingName}</p>
                        </div>
                        <div>
                          <p className="boarding-card-description">{user.ShortDescription}</p>
                        </div>
                        <div>
                          <p className="boarding-card-additional">{user.AC ? "AC" : "Non AC"} | {user.BoardingType ? "For Boys " : "For Girls "}| Telephone - {user.Telephone}</p>
                        </div>
                      </div>
                    </Col>
                    <Col sm={3}>
                      <div className="price-section">

                      <div className="v-p-b">
                      <Link to={`/student/${user._id}`}key={user.id}>
                      <button className="view-profile"> view profile</button>
                       </Link>
                      </div>
                        <div>
                          <p className="price-tag">Rs:{user.Price}/=</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                 
                ))
              )}
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AllBoardings;