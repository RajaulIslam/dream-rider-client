import React, { useEffect, useRef, useState } from 'react';
import './ProcessOrder.css'
import { useParams } from 'react-router';
import useAuth from '../../Hook/useAuth';

const ProcessOrder = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [product, setProduct] = useState();
    console.log(product)
    useEffect(() => {
        const url = `https://dream-rider-server.vercel.app/bikes/${id}`

        fetch(url)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id])
    const nameRef = useRef();

    const handelSubmit = e => {
        const userName = nameRef.current.value;
        const newUser = { userName: userName, userEmail: user.email, serviceName: product.name, orderStatus: "pending" };
        console.log(newUser);


        fetch('https://dream-rider-server.vercel.app/users', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)

        })
            .then(res => res.json())
            .then(data => {
                console.log(data._id)
                if (data.insertedId) {
                    alert('Order Placed SuccessFully')
                    // const allUsers=
                    e.target.reset();
                }
            })
            .catch(err => {
                // Do something for an error here
                console.log("Error Reading data " + err);
            });


        e.preventDefault()
    }
    return (
        <div className='body my-5'>
            <div className='style shadow-lg container'>
                <h1>Confirm order</h1>
                <form onSubmit={handelSubmit} action=""> <br />
                    <input
                        placeholder='enter your name'
                        ref={nameRef}
                        type="text"
                        name='userName'
                        required
                    /> <br />

                    <input
                        value={product?.name}
                        type="text"
                        readOnly
                        required /> <br />

                    <input type="email"
                        name="userEmail"
                        readOnly
                        value={user.email}
                        required /> <br />
                    <input
                        type="text"
                        name="status"
                        readOnly
                        value={'pending'}
                        required /> <br />
                    <input className='bg-warning rounded' type="submit" value="Confirm Order" />
                </form>
            </div>
        </div>
    );
};

export default ProcessOrder;