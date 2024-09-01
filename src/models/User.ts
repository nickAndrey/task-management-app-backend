import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import db from '../configs/db.config';
import CustomError from '../utils/custom-error';

export interface IUser {
  id?: string;
  first_name: string;
  last_name: string;
  email_address: string;
  password: string;
  phone_number: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export class UserModel {
  static async getAll(): Promise<IUser[]> {
    try {
      const response = await db.query('SELECT * FROM users');
      return response.rows;
    } catch (error) {
      throw new CustomError({
        error,
        message: 'Error occurred attempting to fetch users',
      });
    }
  }

  static async getById(id: string): Promise<IUser | null> {
    try {
      const response = await db.query('SELECT * FROM users WHERE id = $1', [id]);
      return response.rows[0];
    } catch (error) {
      throw new CustomError({
        error,
        message: 'Error occurred attempting to fetch user',
      });
    }
  }

  static async create(user: Omit<IUser, 'id' | 'created_at' | 'updated_at'>): Promise<IUser> {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      const newUser: IUser = {
        id: uuidv4(),
        first_name: user.first_name,
        last_name: user.last_name,
        email_address: user.email_address,
        password: hashedPassword,
        phone_number: user.phone_number,
        created_at: new Date().toISOString(),
        updated_at: null,
      };

      const query = `
        INSERT INTO users(id, first_name, last_name, email_address, password, phone_number, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `;

      const values = [
        newUser.id,
        newUser.first_name,
        newUser.last_name,
        newUser.email_address,
        newUser.password,
        newUser.phone_number,
        newUser.created_at,
        newUser.updated_at,
      ];

      const response = await db.query(query, values);
      return response.rows[0];
    } catch (error) {
      throw new CustomError({
        error,
        message: 'Error occurred attempting to create a user.',
      });
    }
  }

  static async update(id: string, user: Partial<IUser>): Promise<IUser> {
    try {
      const hashedPassword = user.password ? await bcrypt.hash(user.password, 10) : undefined;

      const newUser = {
        first_name: user.first_name,
        last_name: user.last_name,
        email_address: user.email_address,
        password: hashedPassword,
        phone_number: user.phone_number,
        updated_at: new Date().toISOString(),
      };

      const query = `
        UPDATE users
        SET 
          first_name = COALESCE($1, first_name),
          last_name = COALESCE($2, last_name),
          email_address = COALESCE($3, email_address),
          password = COALESCE($4, password),
          phone_number = COALESCE($5, phone_number),
          updated_at = COALESCE($6, updated_at)
        WHERE id = $7
        RETURNING *
      `;

      const values = [
        newUser.first_name,
        newUser.last_name,
        newUser.email_address,
        newUser.password,
        newUser.phone_number,
        newUser.updated_at,
        id,
      ];

      const response = await db.query(query, values);
      return response.rows[0];
    } catch (error) {
      throw new CustomError({
        error,
        message: 'Error attempting to update user.',
      });
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await db.query('DELETE FROM users WHERE id = $1', [id]);
    } catch (error) {
      throw new CustomError({
        error,
        message: 'Error occurred attempting to delete user.',
      });
    }
  }
}
