import DTO from '../types/dto.type';

const updateUserDto: DTO = {
  id: {
    required: true,
  },

  first_name: {
    required: false,
  },

  last_name: {
    required: false,
  },

  phone_number: {
    required: false,
    validate: (value) => {
      if (typeof value !== 'string') {
        return {
          valid: false,
          msg: 'Value must be a string.',
        };
      }

      const isValid = /^[0-9]{10,15}$/.test(value);

      return {
        valid: isValid,
        msg: !isValid ? 'Phone number is invalid' : undefined,
      };
    },
  },

  email_address: {
    required: false,
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
    required: false,
  },
};

export default updateUserDto;
