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
import { getCurrentUser, login } from '../../queries';
import useInputValue from './useInputValue';
import { withRouter } from 'react-router-dom';
import { Container, Form, Spacing } from './styles';
import client from '../../client';


const Login = ({ history }) => {
   const [errors, setErrors] = useState([]);
   const email = useInputValue('');
   const password = useInputValue('');

   const handleSubmit = async (event, login) => {
      event.preventDefault();
      if (isFormValid()) {
         setErrors([]);
         login().then(async ({ data: { login } }) => {
            console.log(login);
            localStorage.setItem('token', login.token);
            client.cache.writeQuery({
               query: getCurrentUser,
               data: { currentUser: login.user }
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
      }
      return Object.keys(error).length === 0;
   };

   const isFormEmpty = () =>
       !email.value.length || !password.value.length;


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


   const variables = {
      data: {
         email: email.value,
         password: password.value
      }
   };

   return (
       <Mutation mutation={login} variables={variables}>
          {(login, { data, loading, error }) => {
             return (
                 <Container>
                    <Form
                        noValidate
                        onSubmit={event => handleSubmit(event, login)}>
                       <Grid container direction='column'
                             alignItems='center'>
                          <Typography variant='h4'>
                             Login
                          </Typography>
                          <FormInput name='email' text={email}
                                     errors={errors}/>
                          <FormInput name='password' text={password}
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

export default withRouter(Login);
