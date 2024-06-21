import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import Footer from '../../Shared/Footer/Footer';
import Navigation from '../../Shared/Navigation/Navigation';
import Product from '../Home/Home/Product/Product';

const AllServices = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://dream-rider-server.vercel.app/bikes')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    return (
        <div>
            <Navigation></Navigation>
            <h1 className='mt-3'>Our Products</h1>
            <Row xs={1} md={3} className="g-4 mx-4">
                {products.map(product => <Product product={product} key={product._id} ></Product>)}


            </Row>
            <Footer></Footer>
        </div>
    );
};

export default AllServices;