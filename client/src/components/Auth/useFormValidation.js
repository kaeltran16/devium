import React, { useState } from 'react';
import { FormControl, FormHelperText } from '@material-ui/core';

const useFormValidation = (props) => {
    const [errors, setErrors] = useState([]);
    const [validating, setValidating] = useState(false);

    const setError = error => {
        setErrors(errors.concat(error));
    };

    const resetError = () => setErrors([]);

    const isFormValid = () => {
        const error = {};
        if (isFormEmpty()) {
            error.message = 'Fill all the fields.';
            setError(error);
        }
        return Object.keys(error).length === 0;
    };

    const isFormEmpty = () => {
        Object.values(props).forEach(value => {
            if (value.length === 0) {
                return false;
            }
        });
        return true;
    };

    const displayErrors = error => {
        let displayedError = null;
        if (errors.length > 0) {
            displayedError = errors[0];
        } else {
            displayedError = error;
        }
        return displayedError &&
            <div>
                <FormControl error>
                    <FormHelperText>{displayedError.message}</FormHelperText>
                </FormControl>
            </div>;
    };

    return {
        errors,
        setError,
        resetError,
        isFormValid,
        displayErrors
    };
};

export default useFormValidation;
