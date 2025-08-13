import { Container, Card, Row, Col, Button, Alert } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import BookingForm from "../components/BookingForm";
import ServiceCard from "../components/ServiceCard";
import AdminPanel from "../components/AdminPanel";
import AdminLogin from "../components/AdminLogin";
import Footer from "../components/Footer";
import { useAdminAuth } from "../contexts/AdminAuthContext";

export default function Home() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingToEdit, setBookingToEdit] = useState(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const formRef = useRef();

  const { isAdminAuthenticated, isLoading: authLoading } = useAdminAuth();

  useEffect(() => {
    // Only fetch bookings if user is admin or for general app functionality
    if (isAdminAuthenticated) {
      fetchBookings();
    } else {
      // For non-admin users, we still need to fetch for form updates
      // but won't display the list
      fetchBookings();
    }
  }, [isAdminAuthenticated]);

  function fetchBookings() {
    fetch("https://booking-system-api-murex.vercel.app/api/bookings")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      })
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }

  function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this booking?")) {
      return;
    }

    fetch(`https://booking-system-api-murex.vercel.app/api/bookings/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete");
        setBookings((prev) => prev.filter((b) => b.id !== id));
        alert("Booking deleted successfully!");
      })
      .catch((err) => {
        console.error("Delete error:", err);
        alert("Failed to delete booking");
      });
  }

  function handleAddBooking(newBooking) {
    setBookings((prev) => [...prev, newBooking]);
    setBookingSubmitted(true);
    // Hide the success message after 5 seconds
    setTimeout(() => setBookingSubmitted(false), 5000);
  }

  function handleUpdateBooking() {
    fetchBookings(); // re-fetch all bookings from server
    setBookingToEdit(null);
  }

  function handleEditBooking(booking) {
    setBookingToEdit(booking);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  // Show loading while checking auth status
  if (authLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="bg-dark text-white py-5 text-center">
        <Container>
          <h1 className="display-4">TP. One Hair Studio</h1>
          <p className="lead">Premium Barbering Experience in Sabah</p>

          {/* Admin Access Button */}
          <div className="mt-3">
            {!isAdminAuthenticated ? (
              <Button
                variant="outline-light"
                size="sm"
                onClick={() => setShowAdminLogin(!showAdminLogin)}
              >
                {showAdminLogin ? "Hide Admin Login" : "Admin Access"}
              </Button>
            ) : (
              <Alert variant="primary" className="d-inline-block mb-0 py-2">
                <small>
                  <i className="bi bi-shield-check me-1"></i>
                  Logged in as Admin
                </small>
              </Alert>
            )}
          </div>
        </Container>
      </header>

      {/* Admin Login Form */}
      {showAdminLogin && !isAdminAuthenticated && (
        <AdminLogin onClose={() => setShowAdminLogin(false)} />
      )}

      <ServiceCard
        onBookNow={() =>
          formRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      />

      <Container>
        <Row className="d-flex align-items-center justify-content-center">
          <Col md={10}>
            <h3 className="mt-5 mx-2">Make Your Reservation!</h3>
            <Card ref={formRef} className="my-3 mb-5 p-5">
              {error && (
                <Alert variant="danger" className="text-center">
                  {error}
                </Alert>
              )}
              <BookingForm
                bookingToEdit={bookingToEdit}
                onAddBooking={handleAddBooking}
                onUpdateBooking={handleUpdateBooking}
              />
            </Card>

            {/* Admin Panel - Only show if authenticated */}
            {isAdminAuthenticated && (
              <AdminPanel
                bookings={bookings}
                loading={loading}
                onDelete={handleDelete}
                onEditBooking={handleEditBooking}
              />
            )}

            {/* Success message - Only show after booking submission */}
            {!isAdminAuthenticated && bookingSubmitted && (
              <div className="text-center mt-4 mb-5">
                <Alert
                  variant="success"
                  className="animate__animated animate__fadeIn"
                >
                  <h5>
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Booking Submitted Successfully!
                  </h5>
                  <p className="mb-0">
                    Thank you for choosing TP. One Hair Studio. We will contact
                    you shortly to confirm your appointment.
                  </p>
                </Alert>
              </div>
            )}
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}
