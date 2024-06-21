import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Product.css'
const Product = ({ product }) => {

    return (
        <div>
            <Col className='shadow'>
                <Card className=''>
                    <div className='img-hover'>
                        <Card.Img className='' variant="top" src={product.img} />
                    </div>
                    <Card.Body className='bg-color'>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>
                            {product.description.slice(0, 150)}
                        </Card.Text>
                        <Link to={`/processorder/${product._id}`}> <Button
                            variant="outline-warning"
                            className='btn-color' >Process to Buy</Button></Link>
                    </Card.Body>
                </Card>
            </Col>
        </div>
    );
};

export default Product;