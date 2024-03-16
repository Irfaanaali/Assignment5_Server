/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const createUser = async (req: Request, res: Response) => {
    try {
      const userBody = req.body;
      const result = await UserService.createUser(userBody);
      res.status(201).json({
        success: true,
        statusCode: 201,
        message: 'User created successfully',
        data: result,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };
  
  const logIn = async (req: Request, res: Response) => {
    try {
      const userBody = req.body;
      const result = await UserService.logIn(userBody);
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'User Login successfully',
        data: result,
      });
    } catch (error: any) {
        throw new Error(error);
    }
  };

  export const userController = {
    createUser,
    logIn
  
  };