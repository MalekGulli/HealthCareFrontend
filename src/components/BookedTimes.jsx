import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

function BookedTimes() {
  const [availabilities, setAvailabilities] = useState([]);
  const {
    authState: { user },
  } = useAuth();

  // Hårdkodat id
  const caregiverId = "67277bf847a7116efddefde0";

  useEffect(() => {
    const fetchAvailabilities = async () => {
      const url = `${
        import.meta.env.VITE_API_URL
      }/appointments/caregiver/${caregiverId}`;
      console.log("Fetching URL: ", url);

      try {
        const response = await axios.get(url, {
          withCredentials: true,
        });
        if (response.status === 200) {
          const data = response.data;
          console.log("DATA: ", JSON.stringify(data));
          setAvailabilities(data);
        } else {
          console.error("Error fetching data: ", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    if (caregiverId) {
      fetchAvailabilities();
    }
  }, []);

  return (
    <AdminContainer>
      <LogoContainer src={Logo} alt="Health Care Logo" />
      <Title>Admin Dashboard</Title>
      <Text>Welcome, {user?.name || "Admin"}!</Text> <Logout />
      <h2>All Booked Times</h2>
      <div>
        {availabilities.length > 0 ? (
          availabilities.map((availability, index) => (
            <div key={index}>
              <p>Date and Time: {availability.dateTime}</p>
              <p>Status: {availability.status}</p>
              <p>Patient {availability.patientId}</p>
            </div>
          ))
        ) : (
          <p>No availabilities booked yet.</p>
        )}
      </div>
    </AdminContainer>
  );
}

export default BookedTimes;
