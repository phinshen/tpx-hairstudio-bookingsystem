import { Card, Col, Row, Container, Image } from "react-bootstrap";
import haircut1 from "../../images/haircut1.jpg";
import haircut2 from "../../images/haircut2.jpg";
import haircolour from "../../images/haircolour.jpg";
import hairtreatment from "../../images/hairtreatment.jpg";

export default function ServiceCard() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col className="mx-5" md={5}>
          <Card className="mb-4">
            <div
              style={{
                width: "100%",
                height: "300px",
                overflow: "hidden",
              }}
            >
              <Image
                src={haircut1}
                alt="Haircut 1"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "bottom",
                }}
              />
            </div>
            <Card.Body>
              <Row className="d-flex justify-content-between align-items-center">
                <h5>Men's Haircut</h5>
                <Col>
                  <Card.Text className="mb-0">
                    Precision haircut tailored to your style, including a
                    refreshing wash, expert cut, and styled finish using premium
                    products.
                  </Card.Text>
                </Col>
                <Row className="mb-3 mt-2">
                  <Col xs="auto">
                    <strong>Duration:</strong> 30 mins
                  </Col>
                  <Col xs="auto">
                    <strong>Price:</strong> RM
                  </Col>
                </Row>
                <Col xs="auto">
                  <button className="btn btn-primary">Book Now</button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col md={5}>
          <Card className="mb-4">
            <div
              style={{
                width: "100%",
                height: "300px",
                overflow: "hidden",
              }}
            >
              <Image
                src={haircut2}
                alt="Haircut 2"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
            <Card.Body>
              <Row className="d-flex justify-content-between align-items-center">
                <h5>Woman's Haircut</h5>
                <Col>
                  <Card.Text className="mb-0">
                    Personalized haircut designed to enhance your features.
                    Includes a relaxing wash, precision cut, and professional
                    blow-dry styling.
                  </Card.Text>
                </Col>
                <Row className="mb-3 mt-2">
                  <Col xs="auto">
                    <strong>Duration:</strong> 30 mins
                  </Col>
                  <Col xs="auto">
                    <strong>Price:</strong> RM 35
                  </Col>
                </Row>
                <Col xs="auto">
                  <button className="btn btn-primary">Book Now</button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center mt-3">
        <Col className="mx-5" md={5}>
          <Card className="mb-4">
            <div
              style={{
                width: "100%",
                height: "300px",
                overflow: "hidden",
              }}
            >
              <Image
                src={haircolour}
                alt="Hair Colouring"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
            <Card.Body>
              <Row className="d-flex justify-content-between align-items-center">
                <h5>Hair Colouring</h5>
                <Col>
                  <Card.Text className="mb-0">
                    Transform your look with expert hair colouring services.
                    Whether you're going for a bold new shade, natural coverage,
                    or stylish highlights, our professionals use high-quality
                    products for vibrant and lasting results.
                  </Card.Text>
                </Col>
                <Row className="mb-3 mt-2">
                  <Col xs="auto">
                    <strong>Duration:</strong> 1.5 - 2 hours
                  </Col>
                  <Col xs="auto">
                    <strong>Price:</strong> RM 150++
                  </Col>
                </Row>
                <Col xs="auto">
                  <button className="btn btn-primary">Book Now</button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col md={5}>
          <Card className="mb-4">
            <div
              style={{
                width: "100%",
                height: "300px",
                overflow: "hidden",
              }}
            >
              <Image
                src={hairtreatment}
                alt="Hair Treatment"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
            <Card.Body>
              <Row className="d-flex justify-content-between align-items-center">
                <h5>Hair Treatment</h5>
                <Col>
                  <Card.Text className="mb-0">
                    Restore your hair’s health and shine with our nourishing
                    treatment services. Ideal for dry, damaged, or chemically
                    treated hair, this session deeply conditions, strengthens,
                    and revitalizes your hair from root to tip.
                  </Card.Text>
                </Col>
                <Row className="mb-3 mt-2">
                  <Col xs="auto">
                    <strong>Duration:</strong> 45 mins - 1 hour
                  </Col>
                  <Col xs="auto">
                    <strong>Price:</strong> RM 80++
                  </Col>
                </Row>
                <Col xs="auto">
                  <button className="btn btn-primary">Book Now</button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
