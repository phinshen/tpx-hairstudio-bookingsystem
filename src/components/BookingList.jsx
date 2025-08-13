import { Table, Spinner, Alert, Button, Badge } from "react-bootstrap";

export default function BookingList({
  bookings,
  loading,
  onDelete,
  onEditBooking,
  isAdminView = false,
}) {
  if (loading) {
    return (
      <div className="text-center py-4">
        <Spinner animation="border" />
        <p className="mt-2">Loading bookings...</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <Alert variant="info" className="text-center">
        <h5>No bookings yet</h5>
        <p className="mb-0">New bookings will appear here.</p>
      </Alert>
    );
  }

  // Format date for better display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-MY", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format time for better display
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString("en-MY", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Get status badge based on booking date
  const getStatusBadge = (dateString) => {
    const bookingDate = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    bookingDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);

    if (bookingDate < today) {
      return <Badge bg="secondary">Past</Badge>;
    } else if (bookingDate.getTime() === today.getTime()) {
      return <Badge bg="warning">Today</Badge>;
    } else if (bookingDate.getTime() === tomorrow.getTime()) {
      return <Badge bg="info">Tomorrow</Badge>;
    } else {
      return <Badge bg="success">Upcoming</Badge>;
    }
  };

  return (
    <div>
      {isAdminView && (
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <small className="text-muted">
            Total: {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
          </small>
        </div>
      )}

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Service</th>
            <th>Customer Name</th>
            <th>Phone Number</th>
            <th>Date</th>
            <th>Time</th>
            {isAdminView && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={booking.id}>
              <td>{index + 1}</td>
              <td>{getStatusBadge(booking.date)}</td>
              <td>
                <strong>{booking.title}</strong>
              </td>
              <td>{booking.description}</td>
              <td>
                <a
                  href={`tel:${booking.phone_number}`}
                  className="text-decoration-none"
                >
                  {booking.phone_number}
                </a>
              </td>
              <td>{formatDate(booking.date)}</td>
              <td>{formatTime(booking.time)}</td>
              {isAdminView && (
                <td>
                  <div className="d-flex gap-1">
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => onEditBooking(booking)}
                      title="Edit booking"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onDelete(booking.id)}
                      title="Delete booking"
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
