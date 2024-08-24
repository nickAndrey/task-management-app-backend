import DTO from '../types/dto.type';

const loginDto: DTO = {
  username: {
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
};

export default loginDto;
