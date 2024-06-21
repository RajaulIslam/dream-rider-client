import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';

const MakeAdmin = () => {
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(false)
    console.log(email);
    const handleOnBlur = e => {

        setEmail(e.target.value);
    }
    const handleAdminSubmit = e => {
        const user = { email }
        console.log(user);
        fetch('https://dream-rider-server.vercel.app/uniqueUser/admin', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {

                    setSuccess(true);
                }


            })

        e.preventDefault()
    }
    return (
        <div>
            <h1>Make admin</h1>
            <form onSubmit={handleAdminSubmit}>
                <input
                    onBlur={handleOnBlur}
                    type="email"
                    required
                    className='w-50 my-3 mx-auto'
                    placeholder="name@example.com"
                />
                <input
                    type='submit'
                    value='submit'
                >
                </input>
            </form>
            {
                success && <Alert variant='success' className='w-25 mx-auto ' >
                    Admin added successfully
                </Alert>}

        </div>
    );
};

export default MakeAdmin;