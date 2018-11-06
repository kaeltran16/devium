import {
   comparePassword,
   generateToken,
   hashPassword,
   getUserId
} from '../utils/authUtils';

const Mutation = {
   async createUser(parent, { data }, { prisma }, info) {
      const password = await hashPassword(data.password);
      const variables = {
         data: {
            ...data,
            password
         }
      };
      const user = await prisma.mutation.createUser(variables);
      
      return {
         user,
         token: generateToken(user.id)
      };
   },
   
   async login(parent, { data }, { prisma }, info) {
      const user = await prisma.query.user({
         where: {
            email: data.email
         }
      });
      
      if (!user) {
         throw new Error('Unable to login');
      }
      
      const isMatch = await comparePassword(data.password, user.password);
      
      if (!isMatch) {
         throw new Error('Unable to login');
      }
      
      return {
         user,
         token: generateToken(user.id)
      };
   },
   
   async deleteUser(parent, args, { prisma, request }, info) {
      const userId = getUserId(request);
      
      return prisma.mutation.deleteUser({
         where: {
            id: userId
         }
      }, info);
   },
   
   async updateUser(parent, args, { prisma, request }, info) {
      const userId = getUserId(request);
      
      if (typeof args.data.password === 'string') {
         args.data.password = await hashPassword(args.data.password);
      }
      
      return prisma.mutation.updateUser({
         where: {
            id: userId
         },
         data: args.data
      }, info);
   }
};

export default Mutation;
