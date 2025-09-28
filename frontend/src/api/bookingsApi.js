const Base_URL = "http://localhost:5000";


export async function createBooking(bookingData) {
    const res = await fetch(`${Base_URL}/api/bookings`,{
        method : "POSt",
        headers :{"Content-Type":"application/json"},
        body:JSON.stringify(bookingData)
    });

     if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Booking failed");
  }
  return res.json();
}



 