import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import client from '../../client';

const handleLogout = async history => {
   await client.resetStore();

   localStorage.removeItem('token');
   history.push('/login');
};

const Logout = ({ history }) => (
    <Button color='primary' variant='text'
            onClick={() => handleLogout(history)}>
       Logout
    </Button>
);

export default withRouter(Logout);
