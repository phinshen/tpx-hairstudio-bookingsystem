import { Container, Card, Row, Col } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import BookingForm from "../components/BookingForm";
import BookingList from "../components/BookingList";
import ServiceCard from "../components/ServiceCard";

export default function Home() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingToEdit, setBookingToEdit] = useState(null);
  const formRef = useRef();

  useEffect(() => {
    fetchBookings();
  }, []);

  function fetchBookings() {
    fetch("http://localhost:3000/bookings")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      })
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Submit error:", err);
        setError(err.message);
      });
  }

  function handleDelete(id) {
    fetch(`http://localhost:3000/bookings/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete");
        setBookings((prev) => prev.filter((b) => b.id !== id));
      })
      .catch((err) => {
        console.error("Delete error:", err);
        alert("Failed to delete booking");
      });
  }

  function handleUpdateBooking() {
    fetchBookings(); // re-fetch all bookings from server
    setBookingToEdit(null);
  }

  function handleEditBooking(booking) {
    setBookingToEdit(booking);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <header className="bg-dark text-white py-5 text-center">
        <Container>
          <h1 className="display-4">TP. One Hair Studio</h1>
          <p className="lead">Premium Barbering Experience in Sabah</p>
        </Container>
      </header>
      <ServiceCard />

      <Row className="d-flex align-items-center justify-content-center">
        <Col md={10}>
          <h3 className="mt-5 mx-2">Make Your Reservation!</h3>
          <Card ref={formRef} className="my-3 mb-5 p-5">
            {error && <p className="text-danger text-center">{error}</p>}
            <BookingForm
              bookingToEdit={bookingToEdit}
              onAddBooking={(newBooking) =>
                setBookings((prev) => [...prev, newBooking])
              }
              onUpdateBooking={handleUpdateBooking}
            />
          </Card>
          <hr />
          <h3 className="mb-3">Current Bookings</h3>
          <BookingList
            bookings={bookings}
            loading={loading}
            onDelete={handleDelete}
            onEditBooking={handleEditBooking}
          />
        </Col>
      </Row>
    </>
  );
}
