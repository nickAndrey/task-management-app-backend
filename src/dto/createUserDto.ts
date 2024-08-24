import DTO from '../types/dto.type';

const createUserDto: DTO = {
  first_name: {
    required: true,
  },

  last_name: {
    required: true,
  },

  email_address: {
    required: true,
    validate: (value: string) => {
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

  phone_number: {
    required: true,
    validate: (value: string) => {
      const isValid = /^[0-9]{10,15}$/.test(value);

      return {
        valid: isValid,
        msg: !isValid ? 'Phone number is invalid' : undefined,
      };
    },
  },
};

export default createUserDto;
