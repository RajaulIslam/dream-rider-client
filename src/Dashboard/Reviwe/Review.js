import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import useAuth from '../../Hook/useAuth';

const Review = () => {
    const { user } = useAuth();

    const reviewRef = useRef()
    const ratingRef = useRef();


    const handleReviewSubmit = e => {
        const review = reviewRef.current.value;
        const rating = ratingRef.current.value;
        // console.log(review);
        const userReview = { reviewerName: user.displayName, reviewerEmail: user.email, review, rating }
        console.log(userReview)

        fetch('https://dream-rider-server.vercel.app/review', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userReview)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Review Added SuccessFully')
                    // const allUsers=
                    e.target.reset();
                }

            })

        e.preventDefault()
    }

    return (
        <Form onSubmit={handleReviewSubmit} className='w-50 mx-auto'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>User Name</Form.Label>
                <Form.Control type="text" readOnly value={user.displayName} placeholder="Your Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email"
                    value={user.email} readOnly

                    placeholder="name@example.com" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Stars</Form.Label>
                <Form.Control type="text"

                    ref={ratingRef}
                    required
                    placeholder="Rating in 5" />
            </Form.Group>

            <Form.Group
                className="mb-3"

                type='text'
            >
                <Form.Label>Review</Form.Label>
                <Form.Control ref={reviewRef} as="textarea" required rows={3} />
            </Form.Group>

            <Button type="submit" value=''>Submit</Button>
        </Form>
    );
};

export default Review;