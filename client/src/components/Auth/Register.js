import React, { useState } from 'react';
import {
   Button,
   FormControl,
   FormHelperText,
   Grid,
   Typography
} from '@material-ui/core';
import FormInput from './Input';
import { Mutation } from 'react-apollo';
import { getCurrentUser, register } from '../../queries';
import useInputValue from './useInputValue';
import { withRouter } from 'react-router-dom';
import { Container, Form, Spacing } from './styles';
import client from '../../client';

const Register = ({ history }) => {
   const [errors, setErrors] = useState([]);
   const name = useInputValue('');
   const email = useInputValue('');
   const password = useInputValue('');
   const passwordConfirmation = useInputValue('');

   const handleSubmit = (event, register) => {
      event.preventDefault();
      if (isFormValid()) {
         setErrors([]);
         register().then(async ({ data: { register } }) => {
            localStorage.setItem('token', register.token);
            client.cache.writeQuery({
               query: getCurrentUser,
               data: { currentUser: register.user }
            });
            history.push('/');
         });
      }
   };

   const setError = error => {
      console.log(error);
      setErrors(errors.concat(error));
   };

   const isFormValid = () => {
      const error = {};
      if (isFormEmpty()) {
         error.message = 'Fill all the fields.';
         setError(error);
      } else if (!isPasswordValid()) {
         error.message = 'Password is invalid.';
         setError(error);
      }
      return Object.keys(error).length === 0;
   };

   const isFormEmpty = () =>
       !name.value.length
       || !email.value.length || !password.value.length
       || !passwordConfirmation.value.length;

   const isPasswordValid = () => password.value === passwordConfirmation.value;

   const displayErrors = error => {
      let displayedError = null;
      if (errors.length > 0) {
         displayedError = errors[0];
      } else {
         displayedError = error;
      }
      return displayedError && <div>
         <FormControl error>
            <FormHelperText>{displayedError.message}</FormHelperText>
         </FormControl>
      </div>;
   };


   const variables = {
      data: {
         name: name.value,
         email: email.value,
         password: password.value
      }
   };

   return (
       <Mutation mutation={register} variables={variables}>
          {(register, { data, loading, error }) => {
             return (
                 <Container>
                    <Form
                        noValidate
                        onSubmit={event => handleSubmit(event, register)}>
                       <Grid container direction='column'
                             alignItems='center'>
                          <Typography variant='h4'>
                             Register
                          </Typography>
                          <FormInput name='name' text={name}
                                     errors={errors}/>
                          <FormInput name='email' text={email}
                                     errors={errors}/>
                          <FormInput name='password' text={password}
                                     errors={errors}/>
                          <FormInput name='confirm password'
                                     text={passwordConfirmation}
                                     errors={errors}/>
                          {(error || errors.length) > 0 && displayErrors(error)}
                          <Spacing/>
                          <Button disabled={loading} type='submit'
                                  variant='contained'
                                  color='primary' fullWidth>
                             Submit
                          </Button>
                       </Grid>
                    </Form>
                 </Container>
             );
          }}
       </Mutation>

   );
};

export default withRouter(Register);
