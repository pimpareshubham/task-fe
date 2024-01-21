import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../src/config';
import { Link, useParams } from 'react-router-dom';

const Details = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/details/${id}`);

                if (!response.data.success) {
                    console.error(response.data.message);
                    return;
                }

                setUser(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [id]);

    if (loading) {
        return <div className="container text-center mt-5">Loading...</div>;
    }

    return (
        <div className='container details-main mt-5'>
            <div className='row'>
                <div className='col-5 mx-auto'>
                    <div className='card mb-2'>
                        <div className='card-body'>
                            {/* <h5 className='card-title'>Name : {user.name}</h5> */}
                            <p className='card-text'>Name: {user.name}</p>
                            <p className='card-text'>Email: {user.email}</p>
                            <p className='card-text'>Phone: {user.phone}</p>
                        </div>
                    </div>
                    <Link to='/dashboard' className='btn btn-primary'>Back</Link>
                </div>
            </div>
        </div>
    );
};

export default Details;
