import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          <Col md={6}>
            <h5 className="mb-3">TP. One Hair Studio</h5>
            <p className="mb-2">
              <i className="bi bi-geo-alt-fill me-2"></i>
              Kota Kinabalu, Sabah, Malaysia
            </p>
            <p className="mb-2">
              <i className="bi bi-telephone-fill me-2"></i>
              <a
                href="tel:+60123456789"
                className="text-white text-decoration-none"
              >
                +60 12-345 6789
              </a>
            </p>
            <p className="mb-0">
              <i className="bi bi-envelope-fill me-2"></i>
              <a
                href="mailto:info@tponehair.com"
                className="text-white text-decoration-none"
              >
                info@tponehair.com
              </a>
            </p>
          </Col>

          <Col md={3}>
            <h6 className="mb-3">Opening Hours</h6>
            <p className="mb-1 small">Monday - Friday</p>
            <p className="mb-2 small">9:00 AM - 7:00 PM</p>
            <p className="mb-1 small">Saturday - Sunday</p>
            <p className="mb-0 small">9:00 AM - 6:00 PM</p>
          </Col>

          <Col md={3}>
            <h6 className="mb-3">Services</h6>
            <ul className="list-unstyled small">
              <li className="mb-1">Men's Haircut</li>
              <li className="mb-1">Women's Haircut</li>
              <li className="mb-1">Hair Colouring</li>
              <li className="mb-0">Hair Treatment</li>
            </ul>
          </Col>
        </Row>

        <hr className="my-4 border-secondary" />

        <Row className="align-items-center">
          <Col md={6}>
            <p className="mb-0 small">
              © {currentYear} TP. One Hair Studio. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="mb-0 small">Premium Barbering Experience in Sabah</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
