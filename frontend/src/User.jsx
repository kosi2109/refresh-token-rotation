import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserState } from './context/store';
import useAxiosPrivate from './hooks/useAxioPrivate';

function User() {
    const [users, setUsers] = useState([]);
    const privateAxios = useAxiosPrivate();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUser = async ()=> {
            try {
                const response = await privateAxios.get('/users', {
                    signal : controller.signal
                })
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (error) {
                if (error?.response?.status === 401) {
                    navigate(-1)
                }
            }
        }

        getUser();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

  return (
    <div>
        Users Page
        <Link to="/login" >Login</Link>
    </div>
  )
}

export default User