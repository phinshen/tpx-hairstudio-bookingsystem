import { useState } from "react";
import { Button, Card, Row, Col, Badge } from "react-bootstrap";
import { useAdminAuth } from "../contexts/AdminAuthContext";
import BookingList from "./BookingList";

export default function AdminPanel({
  bookings,
  loading,
  onDelete,
  onEditBooking,
}) {
  const { logout } = useAdminAuth();
  const [showBookings, setShowBookings] = useState(false);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      setShowBookings(false);
    }
  };

  return (
    <div className="mt-5">
      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          <Row className="align-items-center">
            <Col>
              <h4 className="mb-0">
                <i className="bi bi-shield-check me-2"></i>
                Admin Panel
                <Badge bg="light" text="dark" className="ms-2">
                  {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
                </Badge>
              </h4>
            </Col>
            <Col xs="auto">
              <Button variant="outline-light" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body>
          <p className="text-muted mb-3">
            Welcome to the admin dashboard. Here you can manage all bookings.
          </p>

          <div className="d-flex gap-2 mb-3">
            <Button
              variant={showBookings ? "primary" : "outline-primary"}
              onClick={() => setShowBookings(!showBookings)}
            >
              {showBookings ? "Hide Bookings" : "Show All Bookings"}
            </Button>
          </div>

          {showBookings && (
            <div>
              <hr />
              <h5 className="mb-3">All Bookings</h5>
              <BookingList
                bookings={bookings}
                loading={loading}
                onDelete={onDelete}
                onEditBooking={onEditBooking}
                isAdminView={true}
              />
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
