import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import "../styles/Booking.css";

const BookingPage = () => {
  const { authState } = useAuth();  
  const [availabilities, setAvailabilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAvailability, setSelectedAvailability] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null);

  useEffect(() => {
    const fetchAvailabilities = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get("http://localhost:8080/availability/all", {
          withCredentials: true,
        });

        const availableSlots = response.data.flatMap((availability) => {
          const caregiverName = `${availability.caregiverId.firstName} ${availability.caregiverId.lastName}`;
          return availability.availableSlots.map((slot) => ({
            id: availability.id,
            time: slot,
            caregiverId: availability.caregiverId.id,
            caregiverName: caregiverName,
          }));
        });

        setAvailabilities(availableSlots);
      } catch (err) {
        console.error("Error fetching data", err);
        setError("Error fetching available times.");
      } finally {
        setLoading(false);
      }
    };

    fetchAvailabilities();
  }, []);

  const handleSelectAvailability = (availability) => {
    setSelectedAvailability(availability);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    //dubbel kollar id inte är null
    const patientId = authState?.userId;


    const appointmentData = {

      //hämta id is from uAth
      patientId: patientId,
      //hömta frpm feched data
      caregiverId: selectedAvailability.caregiverId,  
      dateTime: selectedAvailability.time,      
      //hårcodar     
      status: "SCHEDULED",                       
    };

   // console.log("Appointment Data to send:", appointmentData);

    try {
      const response = await axios.post(
        "http://localhost:8080/appointments",
        appointmentData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setBookingStatus("Appointment successfully booked!");

        setSelectedAvailability(null);  

        

      

      } else {
        setBookingStatus("Failed to book appointment.");
      }
      
    } catch (error) {
      console.error("Error booking appointment", error);
      setBookingStatus("An error occurred while booking the appointment.");
    }
  };

  return (
    <div className="booking-page">
      <h1>Available Time Slots</h1>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {bookingStatus && <div>{bookingStatus}</div>} 

      <div className="availabilities-container">
        {availabilities.length === 0 && !loading ? (
          <p>No available time slots</p>
        ) : (
          availabilities.map((availability) => (
            <div
              key={`${availability.id}-${new Date(
                availability.time
              ).toISOString()}`}
              className="availability-item"
              onClick={() => handleSelectAvailability(availability)}  
            >
              <p><strong>Caregiver:</strong> {availability.caregiverName}</p>
              <p><strong>Available Time:</strong> {new Date(availability.time).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>

      {selectedAvailability && (
        <form className="booking-form" onSubmit={handleBookingSubmit}>
          <h2>Confirm Your Appointment</h2>
          <p><strong>Caregiver:</strong> {selectedAvailability.caregiverName}</p>
          <p><strong>Selected Time:</strong> {new Date(selectedAvailability.time).toLocaleString()}</p>
          <button type="submit">Book Appointment</button>
        </form>
      )}
    </div>
  );
};

export default BookingPage;
