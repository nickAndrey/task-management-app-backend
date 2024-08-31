interface ICustomError {
  code?: string;
  message: string;
}

class CustomError extends Error {
  code?: string;

  constructor({ message, code }: ICustomError) {
    super(message);

    this.name = 'CustomError';
    this.code = code;
  }

  get statusCode() {
    const code = this.code;

    const statusToError: { [key: string]: number } = {
      ['23505']: 409,
      ['23503']: 409,
      ['23502']: 400,
      ['23514']: 400,
      ['NF']: 404,
    };

    if (code && code in statusToError) {
      return statusToError[code];
    }

    return 500;
  }
}

export default CustomError;
