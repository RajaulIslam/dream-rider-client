import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import Product from '../Product/Product';






const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('https://dream-rider-server.vercel.app/bikes')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])
  return (

    <div  style={{ backgroundColor: '#e9e7f5' }}>
      <h1>Our Products</h1>
      <Row  xs={1} md={3} className="g-4 mx-4">

        {products.slice(0, 6).map(product => <Product product={product} key={product._id} ></Product>)}


      </Row>
    </div>
  );
};

export default Products;

