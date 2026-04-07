import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Badge } from 'react-bootstrap';

const CourseCard = ({ course }) => {
  return (
    <Card className="h-100 shadow-sm hover-shadow">
      <div className="position-relative">
        <Card.Img 
          variant="top" 
          src={course.thumbnail || 'https://via.placeholder.com/400x200'} 
          style={{ height: '200px', objectFit: 'cover' }}
        />
        {course.popular && (
          <Badge 
            bg="danger" 
            className="position-absolute top-0 end-0 m-2"
          >
            Popular
          </Badge>
        )}
      </div>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Badge 
            bg={
              course.level === 'Beginner' ? 'success' :
              course.level === 'Intermediate' ? 'warning' : 'danger'
            }
          >
            {course.level}
          </Badge>
          <div className="text-warning">
            ★ {course.rating} <span className="text-muted small">({course.reviews})</span>
          </div>
        </div>
        
        <Card.Title className="h5 mb-2">{course.title}</Card.Title>
        <Card.Text className="text-muted small">
          {course.description.substring(0, 100)}...
        </Card.Text>
        
        <div className="text-muted small mb-3">
          <div>👨‍🏫 {course.instructor}</div>
          <div>⏱️ {course.duration}</div>
        </div>
        
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span className="h4 text-primary mb-0">${course.price}</span>
            {course.originalPrice && (
              <span className="text-muted text-decoration-line-through ms-2 small">
                ${course.originalPrice}
              </span>
            )}
          </div>
          <Button 
            as={Link} 
            to={`/course/${course.id}`}
            variant="primary"
            size="sm"
          >
            View Course
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;