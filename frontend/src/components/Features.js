import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Features = () => {
  const features = [
    {
      icon: "🎓",
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of experience"
    },
    {
      icon: "📚",
      title: "Comprehensive Curriculum",
      description: "Well-structured courses covering everything from basics to advanced"
    },
    {
      icon: "💻",
      title: "Hands-on Projects",
      description: "Build real-world projects to strengthen your portfolio"
    },
    {
      icon: "🎥",
      title: "Video Lectures",
      description: "High-quality video content accessible anytime, anywhere"
    },
    {
      icon: "🏆",
      title: "Certificate of Completion",
      description: "Earn certificates to showcase your achievements"
    },
    {
      icon: "💬",
      title: "Community Support",
      description: "Connect with fellow learners and get your questions answered"
    }
  ];

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold mb-3">Why Choose Us?</h2>
        <p className="lead text-muted">
          We provide the best learning experience with top-notch features
        </p>
      </div>
      
      <Row xs={1} md={2} lg={3} className="g-4">
        {features.map((feature, index) => (
          <Col key={index}>
            <Card className="h-100 text-center shadow-sm hover-shadow">
              <Card.Body>
                <div className="display-1 mb-3">{feature.icon}</div>
                <Card.Title className="h4 mb-3">{feature.title}</Card.Title>
                <Card.Text className="text-muted">
                  {feature.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Features;