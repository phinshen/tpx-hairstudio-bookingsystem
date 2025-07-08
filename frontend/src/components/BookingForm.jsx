import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function BookingForm({ onAddBooking }) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      title: service,
      description: fullName,
      date: date,
      time: time,
      phone_number: phoneNumber,
      email: "example@gmail.com",
      user_id: "1",
    };

    fetch("http://localhost:3000/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((newBooking) => {
        onAddBooking(newBooking);
        setFullName("");
        setPhoneNumber("");
        setDate("");
        setTime("");
        setService("");
      })
      .catch((err) => console.error("Submit error:", err));
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="fullName">
        <Form.Label>Full Name:</Form.Label>
        <Form.Control
          type="text"
          value={fullName}
          placeholder="Enter your full name"
          onChange={(event) => setFullName(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="phoneNumber">
        <Form.Label>Phone Number:</Form.Label>
        <Form.Control
          type="text"
          value={phoneNumber}
          placeholder="Enter your phone number"
          onChange={(event) => setPhoneNumber(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="date">
        <Form.Label>Date:</Form.Label>
        <Form.Control
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="time">
        <Form.Label>Time:</Form.Label>
        <Form.Control
          type="time"
          value={time}
          onChange={(event) => setTime(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="service">
        <Form.Label>Service:</Form.Label>
        <Form.Select
          value={service}
          onChange={(event) => setService(event.target.value)}
          required
        >
          <option value="">-- Select a Service --</option>
          <option value="Woman's Haircut">Woman's Haircut</option>
          <option value="Men's Haircut">Men's Haircut</option>
          <option value="Hair Wash">Hair Wash</option>
          <option value="Hair Styling">Hair Styling</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
