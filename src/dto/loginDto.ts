import DTO from '../types/dto.type';

const loginDto: DTO = {
  username: {
    required: true,
    validate: (value) => {
      if (typeof value !== 'string') {
        return {
          valid: false,
          msg: 'Value must be a string.',
        };
      }

      const isValid = /^\S+@\S+\.\S+$/.test(value);

      return {
        valid: isValid,
        msg: !isValid ? 'Email is invalid' : undefined,
      };
    },
  },

  password: {
    required: true,
  },

  tokenNoExpired: {
    required: false,
    validate: (value) => {
      const isValid = typeof value === 'boolean';

      return {
        valid: isValid,
        msg: !isValid ? 'Value must be a boolean.' : undefined,
      };
    },
  },
};

export default loginDto;
