import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { client } from '../../index';

const handleLogout = async history => {
    localStorage.removeItem('token');
    try {
        await client.resetStore();
    } catch (e) {
        console.log(e);
    }
    history.push('/');
};

const Logout = ({ history }) => (
    <Button color='primary' variant='text'
            onClick={() => handleLogout(history)}>
        Logout
    </Button>
);

export default withRouter(Logout);
