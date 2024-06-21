import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Rating from 'react-rating';
import './UserReview.css'

const UserReview = () => {
    const [reviews, setReview] = useState([]);
    console.log(reviews);
    useEffect(() => {
        fetch('https://dream-rider-server.vercel.app/review')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setReview(data)
            })
    }, [])
    return (
        <div className='py-5' style={{ backgroundColor: '#e9e7f5' }}>
            <Container className='' >
                <div className='mb-4'>
                    <h1 >Review</h1>

                    <Rating
                        initialRating='4.5'
                        emptySymbol="far fa-star icon-color"
                        fullSymbol="fas fa-star icon-color"
                        readonly></Rating><br />
                    <span>Overall Rating</span>
                </div>
                <Row xs={1} md={3} className="g-4">

                    {
                        reviews.map(review =>
                            <Col key={review._id}>

                                <Card className='b-0 shadow' >

                                    <Rating
                                        initialRating={review?.rating}
                                        emptySymbol="far fa-star icon-color"
                                        fullSymbol="fas fa-star icon-color"
                                        readonly></Rating>



                                    <Card.Body>
                                        <Card.Title>{review.reviewerName}</Card.Title>
                                        <Card.Text>
                                            {review.review}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>


                            </Col>





                        )
                    }
                </Row >
            </Container >
        </div>

    );
};

export default UserReview;