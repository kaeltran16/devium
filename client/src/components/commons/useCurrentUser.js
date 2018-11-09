import React, { useEffect, useState } from 'react';
import { client } from '../../index';
import { getCurrentUser } from '../../queries/index';

const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        try {
            const response = client.readQuery({ query: getCurrentUser });
            setCurrentUser(response.currentUser);
        } catch (e) {

        }
    }, [currentUser]);

    return currentUser;
};

export default useCurrentUser;
