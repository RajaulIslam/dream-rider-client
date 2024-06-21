import React, { useRef } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import useAuth from '../../Hook/useAuth';

const AddProduct = () => {
    const { user } = useAuth()
    const nameRef = useRef()
    const descriptionRef = useRef()
    const priceRef = useRef()
    const imgRef = useRef()
    const handleAddProduct = e => {

        const name = nameRef.current.value;
        const description = descriptionRef.current.value;
        const img = imgRef.current.value;
        const price = priceRef.current.value;

        const newProduct = { userName: user.displayName, userEmail: user.email, name, img, price, description };

        fetch('https://dream-rider-server.vercel.app/bikes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Product Added SuccessFully')

                    e.target.reset();
                }
            })

        console.log(newProduct);

        e.preventDefault();
    }
    return (

        <Container>
            <h1>Add a product</h1>
            <Form onSubmit={handleAddProduct} className='w-50 mx-auto'>
                <Form.Control type="text"

                    value={user.displayName} readOnly
                    placeholder="User name" />
                <br />
                <Form.Control type="email" readOnly
                    value={user.email} placeholder="User email" />
                <br />
                <Form.Control type="text" ref={nameRef} placeholder="Product Name" />
                <br />
                <Form.Control size="lg" ref={descriptionRef} type='text' as="textarea" placeholder="Description" />
                <br />
                <Form.Control type="text" ref={priceRef} placeholder="Price" />
                <br />


                <Form.Control size="sm" ref={imgRef} type="text" placeholder="Photo Url" /><br />
                <Button className='mt-2' type='submit'>Add Product</Button>

            </Form>
        </Container>
    );
};

export default AddProduct;