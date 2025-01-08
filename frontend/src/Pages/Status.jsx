import React, { useContext } from "react";
import LastBookingDetails from "../Components/LastBookingDetails";
import SelectMovie from "../Components/SelectMovie";
import SelectSeats from "../Components/SelectSeats";
import TimeSchedule from "../Components/TimeSchedule";
import Modal from "../Components/ModalComponent";
import BsContext from "../Context/BsContext";

const Status = () => {
  // Context validation
  const context = useContext(BsContext);

  if (!context) {
    console.error("BsContext is not provided. Ensure it wraps the component tree.");
    return (
      <div style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
        Error: Context is missing. Please contact support.
      </div>
    );
  }

  const {
    movie,
    time,
    noOfSeat,
    handlePostBooking,
    setErrorPopup,
    setErrorMessage,
  } = context;

  // Utility functions for seat validation
  const checkNegativeSeatsValidity = (seats) => {
    if (!seats || typeof seats !== "object") return true; // Invalid seats
    for (let seat in seats) {
      if (Number(seats[seat]) < 0) {
        return true;
      }
    }
    return false;
  };

  const checkZeroSeatsValidity = (seats) => {
    if (!seats || typeof seats !== "object") return true; // Invalid seats
    for (let seat in seats) {
      if (Number(seats[seat]) > 0) {
        return false;
      }
    }
    return true;
  };

  // Booking handler
  const handleBookNow = () => {
    if (!movie) {
      setErrorPopup(true);
      setErrorMessage("Please select a movie!");
    } else if (!time) {
      setErrorPopup(true);
      setErrorMessage("Please select a time slot!");
    } else if (
      checkNegativeSeatsValidity(noOfSeat) ||
      checkZeroSeatsValidity(noOfSeat)
    ) {
      setErrorPopup(true);
      setErrorMessage("Invalid Seats! Please choose valid seat numbers.");
    } else {
      try {
        handlePostBooking();
      } catch (error) {
        console.error("Error during booking:", error);
        setErrorPopup(true);
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      {/* Modal Component */}
      <Modal />

      {/* Main Container */}
      <div className="container">
        {/* Selection Section */}
        <div className="selection_container">
          <div className="wrapper">
            {/* Movie Selection */}
            <div className="select_movie_component">
              <SelectMovie />
            </div>

            {/* Last Booking Details */}
            <div className="last_booking_details_container">
              <LastBookingDetails />
            </div>
          </div>

          {/* Time and Seats Section */}
          <div className="time_seats_container">
            {/* Time Schedule */}
            <TimeSchedule />

            {/* Seat Selection */}
            <SelectSeats />

            {/* Book Now Button */}
            <button
              onClick={handleBookNow}
              className="BN-btn">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Status;
