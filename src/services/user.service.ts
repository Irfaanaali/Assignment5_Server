/* eslint-disable @typescript-eslint/no-explicit-any */

import bcrypt from 'bcrypt';
import { User } from '../model/user.model';
import jwt, { JwtPayload } from 'jsonwebtoken'

interface ILogin  {
    username : string,
    password : string
}

const createUser = async (userData: any): Promise<any> => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const userInstance = new User({
    ...userData,
    password: hashedPassword,
  });

  const result = await User.create(userInstance);
  return result;
};

const logIn = async (payload : ILogin | any) =>{

    const user1 = await User.findOne({username: payload.username});

    if(!user1){
        throw new Error ("Invalid credentials")
    }

    const user = {
        _id :user1._id,
        username: user1?.username,
        email : user1?.email
    
      }

      const plainTextPassword = payload.password;
      const hashedPassword = user1.password;
      const isCorrectPassword = await bcrypt.compare(
        plainTextPassword,
        hashedPassword,
      );
      if (!isCorrectPassword) {
        throw new Error('Invalid credentials');
      }
    
      const jwtPayload: JwtPayload = {
        _id: user1._id,
        username: user1.username,
        email: user1.email,

      };
    
      const token = jwt.sign(jwtPayload, 'irfanali', {
        expiresIn: '1d',
      });
    
    
      return {
        user,
        token,
      };
}

export const UserService = {
  createUser,
  logIn
};
