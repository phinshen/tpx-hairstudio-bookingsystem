import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function BookingForm() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const bookingData = {
      fullName: fullName,
      phoneNumber: phoneNumber,
      date: date,
      time: time,
      service: service,
    };
    setFullName("");
    setPhoneNumber("");
    setDate("");
    setTime("");
    setService("");
    console.log(bookingData);
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
          <option value="womanHaircut">Woman's Haircut</option>
          <option value="menHaircut">Men's Haircut</option>
          <option value="hairBlow">Hair Blow</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
