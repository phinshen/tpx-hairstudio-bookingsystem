import { Table, Spinner, Alert, Button } from "react-bootstrap";

export default function BookingList({
  bookings,
  loading,
  onDelete,
  onEditBooking,
}) {
  if (loading) return <Spinner animation="border" />;
  if (bookings.length === 0)
    return <Alert variant="info">No bookings yet.</Alert>;

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Service</th>
          <th>Customer Name</th>
          <th>Phone Number</th>
          <th>Date</th>
          <th>Time</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking, index) => (
          <tr key={booking.id}>
            <td>{index + 1}</td>
            <td>{booking.title}</td>
            <td>{booking.description}</td>
            <td>{booking.phone_number}</td>
            <td>{booking.date}</td>
            <td>{booking.time}</td>
            <td>
              <Button
                className="mx-1"
                variant="warning"
                size="sm"
                onClick={() => onEditBooking(booking)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(booking.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
