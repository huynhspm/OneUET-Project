import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = (props) => {
    const navigate = useNavigate();
    React.useEffect(() => {
        props.setToken('');
        sessionStorage.removeItem("token");
        navigate('/login');
    }, [props]);

    return (
        <div>
        </div>
    );
};

export default Logout;