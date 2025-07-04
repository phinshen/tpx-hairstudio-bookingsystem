import { Container, Card, Row, Col } from "react-bootstrap";
import BookingForm from "../components/BookingForm";

export default function Home() {
  return (
    <>
      <header className="bg-dark text-white py-5 text-center">
        <Container>
          <h1 className="display-4">TP. One Hair Studio</h1>
          <p className="lead">Premium Barbering Experience in Sabah</p>
        </Container>
      </header>
      <Row className="d-flex align-items-center justify-content-center">
        <Col md={10}>
          <Card className="m-5 p-5">
            <BookingForm />
          </Card>
        </Col>
      </Row>
    </>
  );
}
