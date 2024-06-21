import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import useAuth from '../../Hook/useAuth';

const ManageAllOrder = () => {
    const { user } = useAuth()
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch('https://dream-rider-server.vercel.app/users')
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [user.email])


    const deleteOrder = id => {
        const process = window.confirm("Are you sure you want to cancel this order")
        if (process) {

            const url = `https://dream-rider-server.vercel.app/orders/${id}`
            fetch(url, {
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

    const changeStatus = id => {


        const url = `https://dream-rider-server.vercel.app/users/${id}`
        fetch(url, {
            method: 'PUT'



        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('updated successfully')
                    window.location.reload()
                }



            })
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
                                        {order.userEmail} <br></br>
                                        {order.orderStatus}
                                    </Card.Text>
                                    <Button onClick={() => deleteOrder(order._id)} variant="primary">Cancel Order</Button>
                                    <Button className='m-2' onClick={() => changeStatus(order._id)} variant="primary">Confirm Order</Button>
                                </Card.Body>
                            </Card>


                        </Col>





                    )
                }
            </Row >
        </Container>
    );
};

export default ManageAllOrder;