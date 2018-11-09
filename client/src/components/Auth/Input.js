import React from 'react';
import { FormControl, Input, InputLabel } from '@material-ui/core';
import PropTypes from 'prop-types';

const FormInput = ({ name, text, errors }) => {
    const isContainError = (errors, inputName) => {
        if (errors.length === 0) {
            return null;
        }
        return errors.some(err => err.message.toLowerCase()
            .includes(inputName));
    };

    const beautifyName = name => name.toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    const isPassword = target => target.includes('password');


    return (
        <FormControl margin='normal' variant='filled' fullWidth
                     error={isContainError(errors, name)} required>
            <InputLabel htmlFor={name}>
                {beautifyName(name)}
            </InputLabel>
            <Input type={isPassword(name) ? 'password' : 'text'}
                   id={name} name={name} {...text}/>
        </FormControl>
    );
};

FormInput.propTypes = {
    name: PropTypes.string.isRequired
};

export default FormInput;
