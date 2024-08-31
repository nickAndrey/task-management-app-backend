import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../models/User';
import CustomError from '../utils/custom-error';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdUser = await UserModel.create(req.body);

    return res.status(201).json({ data: [createdUser], success: true, msg: '' });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserModel.getAll();

    return res.status(200).json({ data: users, success: true, msg: '' });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.getById(userId);

    if (!user) {
      throw new CustomError({ code: 'NF', message: 'User not found' });
    }

    return res.status(200).json({ data: [user], success: true, msg: '' });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.update(userId, req.body);

    if (!user) {
      throw new CustomError({ code: 'NF', message: 'User not found' });
    }

    return res.status(200).json({ data: [user], success: true, msg: '' });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    await UserModel.delete(userId);

    return res.status(204).json({ data: [], success: true, msg: '' });
  } catch (error) {
    next(error);
  }
};
