import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import "../styles/Booking.css";

function BookedTimes() {
  const [availabilities, setAvailabilities] = useState([]);

  const [loading, setLoading] = useState(false);
  const { authState } = useAuth();

  const caregiverId = authState.userId;

  //fetch data
  const myBookedTime = async () => {
    if (!caregiverId) {
      console.error("No caregiver ID found.");
      return;
    }

    const url = `${
      import.meta.env.VITE_API_URL
    }/appointments/caregiver/${caregiverId}`;
    console.log("Fetching URL: ", url);

    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appointment-page">
      <h2>Bookings</h2>
      <button onClick={myBookedTime} disabled={loading}>
        {loading ? "Loading..." : "Load Bookings"}
      </button>
      {availabilities.length > 0 ? (
        <ul className="booking-list">
          {availabilities.map((booking) => (
            <li key={booking.id} className="booking-item">
              <p>
                <strong>Patient:</strong> {booking.patientId.firstName}{" "}
                {booking.patientId.lastName}
              </p>
              <p>
                <strong>Appointment Date:</strong>{" "}
                {new Date(booking.dateTime).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong> {booking.status}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings available.</p>
      )}
    </div>
  );
}

export default BookedTimes;
