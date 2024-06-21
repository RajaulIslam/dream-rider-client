import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import useAuth from '../../Hook/useAuth';

const MyOrder = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useAuth()
    useEffect(() => {
        const url = `https://dream-rider-server.vercel.app/orders?email=${user.email}`
        fetch(url)
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [user.email])

    const deleteOrder = id => {
        const process = window.confirm("Are you sure you want to cancel this order")
        if (process) {

            const uri = `https://dream-rider-server.vercel.app/orders/${id}`
            fetch(uri, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        alert('deleted successFully');
                        const remainingUsers = orders.filter(user => user._id !== id);
                        console.log(remainingUsers)
                        setOrders(remainingUsers);
                    }
                })
        }

    }
    return (
        <Container>
            <Row xs={1} md={3} className="g-4">

                {
                    orders.map(order =>
                        <Col key={order._id}>

                            <Card>
                                <Card.Header>{order.userName}</Card.Header>
                                <Card.Body>
                                    <Card.Title>{order.serviceName}</Card.Title>
                                    <Card.Text>
                                        {order.userEmail}
                                        <br></br>
                                        {order.orderStatus}
                                    </Card.Text>
                                    <Button onClick={() => deleteOrder(order._id)} variant="primary">Cancel Order</Button>
                                </Card.Body>
                            </Card>


                        </Col>





                    )
                }
            </Row >
        </Container>
    );
};

export default MyOrder;