import casual from 'casual';
import 'cross-fetch/polyfill';
import prisma from '../src/prisma';
import getClient from './utils/client';
import seedDatabase, { userOne } from './utils/seed';
import { getProfile, getUsers, register } from './utils/operations';

const client = getClient();

beforeEach(seedDatabase);

it('Should create a new user', async () => {
    const variables = {
        data: {
            name: casual.name,
            email: casual.email,
            password: casual.password
        }
    };
    const response = await client.mutate({
        mutation: register,
        variables
    });

    const exists = await prisma.exists.User(
        { id: response.data.register.user.id }
    );

    expect(exists)
        .toBe(true);
});

test('Should expose public author profiles', async () => {
   const response = await client.query({ query: getUsers });
   
   expect(response.data.users.length)
   .toBe(2);
   expect(response.data.users[0].email)
   .toBe(null);
   expect(response.data.users[0].name)
   .toBe('Jen');
});

test('Should not login with bad credentials', async () => {
   const variables = {
      data: {
         email: 'jen@example.com',
         password: 'red098!@#$'
      }
   };
   
   await expect(
      client.mutate({
         mutation: login,
         variables
      })
   )
   .rejects
   .toThrow();
});

test('Should not signup user with invalid password', async () => {
   const variables = {
      data: {
         name: 'Andrew',
         email: 'andrew@example.com',
         password: 'pass'
      }
   };
   
   await expect(
      client.mutate({
         mutation: register,
         variables
      })
   )
   .rejects
   .toThrow();
});

test('Should fetch user profile', async () => {
   const client = getClient(userOne.jwt);
   const { data } = await client.query({ query: getProfile });
   
   expect(data.currentUser.id)
   .toBe(userOne.user.id);
   expect(data.currentUser.name)
   .toBe(userOne.user.name);
   expect(data.currentUser.email)
   .toBe(userOne.user.email);
});
