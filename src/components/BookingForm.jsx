import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

export default function BookingForm({
  onAddBooking,
  onUpdateBooking,
  bookingToEdit,
}) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("");

  useEffect(() => {
    if (bookingToEdit) {
      setFullName(bookingToEdit.description || "");
      setPhoneNumber(bookingToEdit.phone_number || "");
      setDate(bookingToEdit.date || "");
      setTime(bookingToEdit.time || "");
      setService(bookingToEdit.title || "");
    } else {
      resetForm();
    }
  }, [bookingToEdit]);

  function resetForm() {
    setFullName("");
    setPhoneNumber("");
    setDate("");
    setTime("");
    setService("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      title: service,
      description: fullName,
      phone_number: phoneNumber,
      date,
      time,
      email: "example@gmail.com",
      user_id: "1",
    };

    if (bookingToEdit) {
      fetch(
        `https://3c417fe6-c577-471a-aa7a-416bfeb95e8f-00-3e81h71zwa9rn.sisko.replit.dev/bookings/${bookingToEdit.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )
        .then((res) => {
          if (!res.ok) throw new Error("Update failed");
          return res.json();
        })
        .then((createdBooking) => {
          onUpdateBooking(createdBooking);
          alert("Booking updated successfully!");
          resetForm();
        })
        .catch((err) => {
          console.error("Update error:", err);
          alert("Failed to update booking.");
        });
    } else {
      fetch(
        "https://3c417fe6-c577-471a-aa7a-416bfeb95e8f-00-3e81h71zwa9rn.sisko.replit.dev/bookings",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )
        .then((res) => {
          if (!res.ok) throw new Error("Create failed");
          return res.json();
        })
        .then(() => {
          onAddBooking();
          alert("Booking created successfully!");
          resetForm();
        })
        .catch((err) => {
          console.error("Create error:", err);
          alert("Failed to submit booking.");
        });
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="fullName">
        <Form.Label>Full Name:</Form.Label>
        <Form.Control
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="phoneNumber">
        <Form.Label>Phone Number:</Form.Label>
        <Form.Control
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="date">
        <Form.Label>Date:</Form.Label>
        <Form.Control
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="time">
        <Form.Label>Time:</Form.Label>
        <Form.Control
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="service">
        <Form.Label>Service:</Form.Label>
        <Form.Select
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
        >
          <option value="">-- Select a Service --</option>
          <option value="Woman's Haircut">Woman's Haircut</option>
          <option value="Men's Haircut">Men's Haircut</option>
          <option value="Hair Colouring">Hair Colouring</option>
          <option value="Hair Treatment">Hair Treatment</option>
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        {bookingToEdit ? "Update Booking" : "Submit"}
      </Button>
    </Form>
  );
}
