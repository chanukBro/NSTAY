import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Hi.css';

function Hi() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state && location.state.user;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user) {
          navigate('/');
          return;
        }

        const response = await fetch(`http://localhost:3000/${user.email}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch user data. Status: ${response.status}`);
        }

        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        // Handle error state if needed
      }
    };

    fetchUserData();
  }, [user, navigate]);

  return (
    <div className="hi-container">
      {user && userData ? (
        <div className="user-info">
          <h1>Hello, {userData.name}!</h1>
          <p>Email: {user.email}</p>
          <p>Name: {userData.name}</p>
          <p>User ID: {userData._id}</p>
        </div>
      ) : null}
    </div>
  );
}

export default Hi;
