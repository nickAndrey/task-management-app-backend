import { DatabaseError } from 'pg';

interface ICustomError {
  message: string;
  code?: string;
  error?: unknown;
}

class CustomError extends Error {
  code?: string;
  error?: DatabaseError;

  constructor({ message, code, error }: ICustomError) {
    super(message);

    this.name = 'CustomError';
    this.code = code;

    if (error instanceof DatabaseError) {
      this.error = error;
    }
  }

  get statusCode() {
    const code = this.code || this.error?.code;

    const statusToError: { [key: string]: number } = {
      ['23505']: 409,
      ['23503']: 409,
      ['23502']: 400,
      ['23514']: 400,
      ['22P02']: 400,
      ['NF']: 404,
    };

    if (code && code in statusToError) {
      return statusToError[code];
    }

    return 500;
  }

  get errorDetails() {
    return this.error || 'No details provided';
  }
}

export default CustomError;
